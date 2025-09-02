"use server";
import { InputFile } from "node-appwrite/file";
import { createadminclient } from "../appwrite";
import { appwriteconfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getcurrentuser } from "./user.actions";
import { Separator } from "@radix-ui/react-select";
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

const createqueries = (
  currentusser: Models.Document,
  types: string[],
  searchText: string,
  sort: string,
  limit?: number
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentusser.$id]),
      Query.contains("users", [currentusser.email]),
    ]),
  ];
  if (types.length > 0) queries.push(Query.equal("type", types));
  if (searchText) queries.push(Query.contains("name", searchText));
  if (limit) queries.push(Query.limit(limit));
  const [sortBy, orderBy] = sort.split("-");
  queries.push(
    orderBy == "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy)
  );
  return queries;
};
export const getfiles = async ({
  types = [],
  searchText = "",
  sort = "$createdAt-desc",
  limit,
}: GetFilesProps) => {
  const { databases } = await createadminclient();
  try {
    //we only nedd to show the currne user files
    const currentusser = await getcurrentuser();
    if (!currentusser) throw new Error("user not found");
    const queries = createqueries(currentusser, types, searchText, sort, limit);
    //  console.log({currentusser,queries})
    const files = await databases.listDocuments(
      appwriteconfig.databaseid,
      appwriteconfig.filescollectionid,
      queries
    );
    return parseStringify(files);
  } catch (error) {
    handleError(error, "filed to get files");
  }
};

export const renamefile = async ({
  fileId,
  name,
  extension,
  path,
}: RenameFileProps) => {
  const { databases } = await createadminclient();
  try {
    const newname = `${name}.${extension}`;
    const updatefile = await databases.updateDocument(
      appwriteconfig.databaseid,
      appwriteconfig.filescollectionid,
      fileId,
      {
        name: newname,
      }
    );
    // Optionally revalidate path if needed
    revalidatePath(path);
    return parseStringify(updatefile);
  } catch (error) {
    handleError(error, "failed to update file users");
  }
};

export const updatefileusers = async ({
  fileId,
  emails,
  path,
}: UpdateFileUsersProps) => {
  const { databases } = await createadminclient();
  try {
    const updatefile = await databases.updateDocument(
      appwriteconfig.databaseid,
      appwriteconfig.filescollectionid,
      fileId,
      {
        users: emails,
      }
    );
    // Optionally revalidate path if needed
    revalidatePath(path);
    return parseStringify(updatefile);
  } catch (error) {
    handleError(error, "failed to rename");
  }
};

export const deletefile = async ({
  fileId,
  bucketFileId,
  path,
}: DeleteFileProps) => {
  const { databases, storage } = await createadminclient();
  try {
    const deletedfile = await databases.deleteDocument(
      appwriteconfig.databaseid,
      appwriteconfig.filescollectionid,
      fileId
    );
    if (deletedfile)
      await storage.deleteFile(appwriteconfig.bucketid, bucketFileId);
    // Optionally revalidate path if needed
    revalidatePath(path);
    return parseStringify("success");
  } catch (error) {
    handleError(error, "failed to delete file");
  }
};
