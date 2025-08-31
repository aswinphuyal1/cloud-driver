import { Models } from "node-appwrite";
import React from "react";
import Thumbnail from "./Thumbnail";
import Formatteddatetime from "./Formatteddatetime";
import { convertFileSize, formatDateTime } from "@/lib/utils";

const Imagethumbnails = ({ file }: { file: Models.Document }) => (
  <div className="file-details-thumbnail">
    <Thumbnail
      name={file.name}
      type={file.type}
      extension={file.extension}
      url={file.url}
    />
    <div className="flex flex-col">
      <p className="subttitle-2 mb-1">{file.name}</p>
      <Formatteddatetime className="caption" date={file.$createdAt} />
    </div>
  </div>
);

const Detailsrow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex ">
    <p className="file-details-label text-left">{label}</p>
    <p className="file-details-value text-left">{value}</p>
  </div>
);

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <Imagethumbnails file={file} />

      <div className="space-y-4 px-2 pt-2">
        <Detailsrow label="format:" value={file.extension} />
        <Detailsrow label="size:" value={convertFileSize(file.size)} />
        <Detailsrow label="owner:" value={file.owner.fullName} />
        <Detailsrow
          label="last edit:"
          value={formatDateTime(file.$updatedAt)}
        />
      </div>
    </>
  );
};
