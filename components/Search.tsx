"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { getfiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
const Search = () => {
  const [query, setquery] = useState("");
  const searchParams = useSearchParams();
  const searchquery = searchParams.get("query") || "";

  const [result, setresult] = useState<Models.Document[]>([]);
  const [open, setopen] = useState(false);

  useEffect(() => {
    const fetchfiles = async () => {
      const files = await getfiles({ types,searchText:query,sort,limit});
      setresult(files.documents);
      setopen(true);
    };
    fetchfiles();
  }, []);
  useEffect(() => {
    if (!searchquery) {
      setquery("");
    }
  }, [searchquery]);
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
                <li key={file.$id}>{file.name || "Unnamed File"}</li>
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
