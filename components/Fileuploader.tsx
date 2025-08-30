"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import Image from "next/image";
import { cn, convertFileToUrl } from "@/lib/utils";
import { useState } from "react";
import { getFileType } from "@/lib/utils";
import Thumbnail from "./Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadfile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";

interface Props {
  ownerid: string;
  accountid: string;
  className?: string;
  url: string;
}
const Fileuploader = ({ ownerid, accountid, className }: Props) => {
  //initially files like arrya banako
  const path = usePathname();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Filter out files that are too large and show toast for them
      const filesToUpload = acceptedFiles.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          toast({
            title: "File too large",
            description: (
              <p className="body-2 text-white">
                <span className="font-semibold">{file.name} is too large </span>
              </p>
            ),
            variant: "destructive",
          });
          return false;
        }
        return true;
      });

      setFiles(filesToUpload);

      // Upload all valid files
      Promise.all(
        filesToUpload.map((file) =>
          uploadfile({
            file,
            ownerId: ownerid,
            accountid: accountid,
            path: path,
          }).then((uploadfileResult) => {
            if (uploadfileResult) {
              setFiles((prevfiles) =>
                prevfiles.filter((f) => f.name !== file.name)
              );
            }
          })
        )
      );
    },
    [toast, ownerid, accountid, path]
  );
  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    filename: string
  ) => {
    e.stopPropagation();
    setFiles((prevfiles) => prevfiles.filter((file) => file.name !== filename));
  };

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
      {files.length > 0 && (
        <>
          <h4 className="h4 text-light-100">Uploading</h4>
          <ul className="uploader-preview-list">
            {files.map((file, index) => {
              //destructure
              const { type, extension } = getFileType(file.name);
              return (
                <li
                  key={`${file.name}-${index}`}
                  className="uploader-preview-item"
                >
                  <div className="flex items-center gap-3">
                    <Thumbnail
                      type={type}
                      extension={extension}
                      url={convertFileToUrl(file)}
                      name={file.name}
                    />
                    <div className="preview-item-name">
                      {file.name}
                      <Image
                        src="/assets/icons/file-loader.gif"
                        width={80}
                        height={26}
                        alt="loader"
                      />
                    </div>
                  </div>
                  <Image
                    src="/assets/icons/remove.svg"
                    width={24}
                    height={24}
                    alt="remove"
                    onClick={(e) => handleRemoveFile(e, file.name)}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
      {isDragActive ? (
        <p>Upload</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default Fileuploader;
