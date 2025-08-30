"use server";
import { InputFile } from "node-appwrite/file";
import { createadminclient } from "../appwrite";
import { appwriteconfig } from "../appwrite/config";
import { ID } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { use } from "react";
import { revalidatePath } from "next/cache";
const handleError = (error: unknown, message: string) => {
  console.error(message, error);
  throw new Error(message);
};
export const uploadfile = async ({
  file,
  ownerId,
  accountid,
  path,
}: UploadFileProps) => {
  const { storage, databases } = await createadminclient();
  try {
    const inputfile = InputFile.fromBuffer(file, file.name);

    const bucketfile = await storage.createFile(
      //where we going to store
      appwriteconfig.bucketid,
      //input garne ko id
      ID.unique(),
      //kuninput garne
      inputfile // File content
    );

    // File metadata document
    const filedocument = {
      type: getFileType(bucketfile.name).type, // File type (image, document, etc.)
      name: bucketfile.name, // Original filename
      url: constructFileUrl(bucketfile.$id), // Access URL
      extension: getFileType(bucketfile.name).extension, // File extension
      size: bucketfile.sizeOriginal, // File size in bytes
      owner: ownerId, // User who uploaded
      accountid, // Associated account
      users: [], // Empty array for shared users
      bucketfileid: bucketfile.$id, // Reference to storage file
    };
    const newfile = await databases
      .createDocument(
        appwriteconfig.databaseid,
        appwriteconfig.filescollectionid,
        ID.unique(),
        filedocument
      )
      .catch(async (error: unknown) => {
        await storage.deleteFile(appwriteconfig.bucketid, bucketfile.$id);
        handleError(error, "failed to create file document");
      });
    //Invalidates Next.js cache for the specified path
    revalidatePath(path);
    return parseStringify(newfile);
  } catch (error) {
    console.log(error);
    handleError(error, "file upload fail!!!!!!");
  }
};
