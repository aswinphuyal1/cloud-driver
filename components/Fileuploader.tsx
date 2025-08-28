"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { getFileType } from "@/lib/utils";
interface Props {
  ownerid: string;
  accountid: string;
  className: string;
}
const Fileuploader = ({ ownerid, accountid, className }: Props) => {
  //initially files like arrya banako
  const [files, setfiles] = useState<File[]>([])
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn("uploader-button", className)}>
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />
      </Button>
      {files.length>0}&&{
        <ul className="uploader-preview-list">
<h4 className="h4 text-light-100 ">
Uploading
{files.map((file,index)=>
{//destructure
  const {type,extension}=getFileType(file.name);
})}
</h4>
        </ul>
      }
      {isDragActive ? (
        <p>Upload</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default Fileuploader;
