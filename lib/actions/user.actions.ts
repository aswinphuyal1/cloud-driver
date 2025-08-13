"use server";

import { Account, ID, Query } from "node-appwrite";
import { createadminclient, createsessionclient } from "../appwrite";
import { appwriteconfig } from "../appwrite/config";
import { cookies } from "next/headers";
import { avatarPlaceholderUrl } from "@/constants";

const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

const getUserByEmail = async (email: string) => {
  const { databases } = await createadminclient();

  const result = await databases.listDocuments(
    appwriteconfig.databaseid,
    appwriteconfig.usercollectionid,
    [Query.equal("email", [email])]
    //    queries:[Query.equal(attribute:"email",value:[email])]
  );
  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.error(message, error);
  throw new Error(message);
};

export const sendemailotp = async ({ email }: { email: string }) => {
  try {
    const { account } = await createadminclient();
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send OTP/magic link.");
  }
};

export const createaccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  try {
    const existinguser = await getUserByEmail(email);

    const accountid = await sendemailotp({ email });

    if (!accountid) throw new Error("Failed to send an OTP and create user.");

    if (!existinguser) {
      const { databases } = await createadminclient();
      await databases.createDocument(
        appwriteconfig.databaseid,
        appwriteconfig.usercollectionid,
        ID.unique(),
        {
          fullName,
          email,
          avatar: avatarPlaceholderUrl,
          accountid: accountid,
        }
      );
    }

    return parseStringify({ accountid: accountid });
  } catch (error) {
    handleError(error, "Failed to create account.");
  }
};

export const verifysecret = async ({
  accountid,
  password,
}: {
  accountid: string;
  password: string;
}) => {
  try {
    const { account } = await createadminclient();
    const session = await account.createSession(accountid, password);
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,

      // Cookie Setting:

      // Sets an HTTP-only cookie with the session secret

      // Cookie attributes:

      //     path=/: Available across entire site

      //     httpOnly: Inaccessible to JavaScript (XSS protection)

      //     sameSite=strict: CSRF protection

      //     secure=true: Only sent over HTTPS
    });
    return parseStringify({ sessionId: session.$id });
  } catch (error: any) {
    console.log(error);
  }
};

export const getcurrentuser = async () => {
  const { databases, account } = await createsessionclient();
  const result = await account.get();
  const user = await databases.listDocuments(
    appwriteconfig.databaseid,
    appwriteconfig.usercollectionid,
    [Query.equal("accountid", [result.$id])]
  );
  if(user.total<=0) return null;
  return parseStringify(user.documents[0])
};
