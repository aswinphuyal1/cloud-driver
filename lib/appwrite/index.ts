"use server"
import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";
import { appwriteconfig } from "./config";
import { cookies } from "next/headers";
import { error } from "console";
export const createsessionclient = async () => {
  const client = new Client()
    .setEndpoint(appwriteconfig.endpointurl)
    .setProject(appwriteconfig.projectid);

  const session = (await cookies()).get("appwrite-session");
  //Asynchronously retrieves the cookies from the request and
  //  gets the value of the cookie named "appwrite-session".

  if (!session || !session.value) {
    throw new Error("no session");
  } else {
    client.setSession(session.value);
  }

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

export const createadminclient = async () => {
  const client = new Client()
    .setEndpoint(appwriteconfig.endpointurl)
    .setProject(appwriteconfig.projectid)
    .setKey(appwriteconfig.secretkey);

  return {
    get account() {
      return new Account(client);      
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
};
