"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { getfiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import Formatteddatetime from "./Formatteddatetime";
import { Module } from "module";

const Search = () => {
  const [query, setquery] = useState("");
  const searchParams = useSearchParams();
  const searchquery = searchParams.get("query") || "";

  const [result, setresult] = useState<Models.Document[]>([]);
  const [open, setopen] = useState(false);
const router=useRouter();
  useEffect(() => {
    const fetchfiles = async () => {
     const files = await getfiles({ types: [], searchText: query});
      setresult(files.documents);
      setopen(true);
    };
    fetchfiles();
  }, [query]);
  useEffect(() => {
    if (!searchquery) {
      setquery("");
    }
  }, [searchquery]);


  const handelclickitems =
  (file:Models.Document)=>
  {
    setopen(false)
    setresult([])

    router.push(`/${file.type==='video'?'media':file.type+'s'}?query=${query}`)
  }
  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
        />
        <Input
          value={query}
          placeholder="Search"
          className="search-input"
          onChange={(e) => setquery(e.target.value)}
        />

        {open && (
          <ul className="search-result">
            {result.length > 0 ? (
              result.map((file) => (
                <li
                  className="flex items-center justify-between"
                  key={file.$id}
                  onClick={()=>handelclickitems(file)}
                >
                  <div className="flex cursor-pointer items-center gap-4 min-w-0">
                    <Thumbnail
                      name={file.name}
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className="subtitle-2 line-clamp-1 text-light-100">
                      {file.name || "Unnamed File"}
                    </p>
                  </div>
                  <Formatteddatetime
                    date={file.$createdAt}
                    className="caption line-clamp-1 text-light-200"
                  />
                </li>
              ))
            ) : (
              <li className="empty-result">No result</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
