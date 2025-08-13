"use server";

import { Account, ID, Query } from "node-appwrite";
import { createadminclient } from "../appwrite";
import { appwriteconfig } from "../appwrite/config";

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

const sendemailopt = async ({ email }: { email: string }) => {
  try {
    const { account } = await createadminclient();
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send OTP/magic link.");
  }
};

 export const createaccount = async ({
  fullname,
  email,
}: {
  fullname: string;
  email: string;
}) => {
  try {
    const existinguser = await getUserByEmail(email);

    const accountId = await sendemailopt({ email });

    if (!accountId) throw new Error("Failed to send an OTP and create user.");

    if (!existinguser) {
      const { databases } = await createadminclient();
      await databases.createDocument(
        appwriteconfig.databaseid,
        appwriteconfig.usercollectionid,
        ID.unique(),
        {
          fullname,
          email,
          avatar:
            "https://png.pngtree.com/png-vector/20230304/ourmid/pngtree-male-avator-icon-vector-png-image_6631112.png",
          accountId: accountId,
        }
      );
    }

    return parseStringify({ value: accountId });
  } catch (error) {
    handleError(error, "Failed to create account.");
  }
};
