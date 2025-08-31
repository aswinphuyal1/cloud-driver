"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Image from "next/image";
import { Models } from "node-appwrite";
import { actionsDropdownItems } from "@/constants";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Label } from "recharts";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { renamefile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import { FileDetails, Shareinput } from "./actionsmodelcontent";
import { any, string } from "zod";
import { updatefileusers } from "@/lib/actions/file.actions";
type ActionType = {
  value: string;
  label: string;
};

const Actiondropdown = ({ file }: { file: Models.Document }) => {
  const [ismodelopen, setismodelopen] = useState(false);
  const [isdropdownopen, setisdropdownopen] = useState(false);
  const [action, setaction] = useState<ActionType | null>(null);
  const [name, setname] = useState(file.name);
  const [isloading, setisloading] = useState(false);
  const [email, setemail] = useState<string[]>([]);
  const path = usePathname();
  const closeallmodels = () => {
    setismodelopen(false);
    setisdropdownopen(false);
    setaction(null);
    setname(file.name);
    //setemail([])
  };

  const handelaction = async () => {
    if (!action) return;
    setisloading(true);
    let success = false;
    const actions = {
      rename: () =>
        renamefile({ fileId: file.$id, name, extension: file.extension, path }),
      share: () =>
        updatefileusers({
          fileId: file.$id,
          emails: email,

          path,
        }),
      delete: () => {},
    };
    //This line dynamically calls a function from the actions object
    // based on the key in action.value and waits for the result, then assigns that result to success.
    success = await actions[action.value as keyof typeof actions]();
    if (success) closeallmodels();
    setisloading(false);
  };

const handelremoveuser = async (removeEmail: string) => {
  // filter out the email we want to remove
  const updatedEmails = email.filter((e) => e !== removeEmail);

  // update backend
  const success = await updatefileusers({
    fileId: file.$id,
    emails: updatedEmails,
    path,
  });

  if (success) {
    setemail(updatedEmails); // update local state
    closeallmodels(); // close modal
  }
};
  ;
  const renderdialogcontent = () => {
    if (!action) return null;
    const { value, label } = action;
    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          )}

          {value === "share" && (
            <Shareinput
              file={file}
              oninputchange={setemail}
              onremove={handelremoveuser}
            />
          )}

          {value === "details" && <FileDetails file={file} />}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3">
            <Button onClick={closeallmodels} className="modal-cancel-button">
              Cancle
            </Button>
            <Button onClick={handelaction} className="modal-submit-button">
              <p className="capitalize">{value}</p>
              {isloading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };
  return (
    <Dialog open={ismodelopen} onOpenChange={setismodelopen}>
      <DropdownMenu open={isdropdownopen} onOpenChange={setisdropdownopen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <Image
            src="/assets/icons/dots.svg"
            alt="dots"
            width={34}
            height={34}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((item) => (
            <DropdownMenuItem
              className="shad-dropdown-item"
              key={item.value}
              onClick={() => {
                setaction(item);
                if (
                  ["rename", "share", "details", "delete"].includes(item.value)
                ) {
                  setismodelopen(true);
                }
              }}
            >
              {item.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketfileid)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={30}
                    height={30}
                  />
                  {item.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={30}
                    height={30}
                  />
                  {item.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderdialogcontent()}
    </Dialog>
  );
};

export default Actiondropdown;
