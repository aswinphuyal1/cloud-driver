import { Models } from "node-appwrite";
import React from "react";
import Thumbnail from "./Thumbnail";
import Formatteddatetime from "./Formatteddatetime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
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

interface props {
  file: Models.Document;
  oninputchange: React.Dispatch<React.SetStateAction<string[]>>;
  onremove: (email: string) => void;
}
export const Shareinput = ({ file, oninputchange, onremove }: props) => {
  return (
    <>
      <Imagethumbnails file={file} />

      <div className="share-wrapper">
        <p className="subititle-2 pl-1 text-light-100">
          share file with others
        </p>

        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => oninputchange(e.target.value.trim().split(","))}
          className="share-input-field"
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2 text-light-100">Share with</p>
            <p className="subtitle-2 text-light-200">
              {file.users.length} users
            </p>
          </div>
          <ul className="pt-2 ">
            {file.users.map((email: string) => {
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="subtitle-2">{email}</p>
                <Button onClick={() => onremove(email)}>
                  <Image
                    src="/assets/icons/remove.svg"
                    alt="remove"
                    width={24}
                    height={24}
                    className="remove-icon"
                  />
                </Button>
              </li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
