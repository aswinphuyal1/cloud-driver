import React from "react";
import Image from "next/image";
import { getFileIcon } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ThumbnailProps {
  type: string;
  extension: string;
  url: string;
  name: string;
  imageClassName?: string;
  className?: string;
}

const Thumbnail = ({
  type,
  extension,
  url = "",
  name,
  imageClassName,
  className,
}: ThumbnailProps) => {
  //image check
  //svg is harder to show
  const isImage = type === "image" && extension !== "svg";
  return (
    //html5 components use for thumbnailks
    <figure className={cn("thumbnail", className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        width={100}
        height={100}
        className={cn(
          "object-contain",
          imageClassName,
          isImage && "thumbnail-image"
        )}
        alt={name}
      />
    </figure>
  );
};

export default Thumbnail;

