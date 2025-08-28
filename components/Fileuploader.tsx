"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface Props {
  ownerid: string;
  accountid: string;
  className: string;
}
const Fileuploader = ({ ownerid, accountid, className }: Props) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
    
      {isDragActive ? (
        <p>Upload</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default Fileuploader;
