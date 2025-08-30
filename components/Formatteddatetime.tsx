import React from "react";
import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/utils";
const Formatteddatetime = ({
  date,
  className,
}: {
  date: string;
  className?: string;
}) => {
  return (
    <p className={cn("body-1 text-light-200")}>{formatDateTime(date)}</p>
    
  );
};

export default Formatteddatetime;
