"use server";
import { InputFile } from "node-appwrite/file";
import { createadminclient } from "../appwrite";
import { appwriteconfig } from "../appwrite/config";
import { ID } from "node-appwrite";
import { constructFileUrl, getFileType } from "../utils";
import { use } from "react";
const handleError = (error: unknown, message: string) => {
  console.error(message, error);
  throw new Error(message);
};
export const uploadfilr = async ({
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
      inputfile
    );

    const filedocument=
    {
        type:getFileType(bucketfile.name).type,
        name:bucketfile.name,
        url:constructFileUrl(bucketfile.$id),
        extension:getFileType(bucketfile.name).extension,
        size:bucketfile.sizeOriginal,
        owner:ownerId,
        accountid,
        users:[],
        bucketfileID:bucketfile.$id
    }

  } catch (error) {
    handleError(error, "file upload fail!!!!!!");
  }
};
