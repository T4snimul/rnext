"use client";
import { useDebounce } from "@/hooks/useDebouncs";
import Image from "next/image";
import React, { useState } from "react";
import SearchResult from "./SearchResult";
import { useRouter } from "next/navigation";

function Search({ docs }) {
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  function handleChange(e) {
    const value = e.target.value;
    setSearchTerm(value);
    doSearch(value);
  }

  const doSearch = useDebounce((term) => {
    const found = docs.filter((doc) =>
      doc.title.toLowerCase().includes(term.toLowerCase()),
    );

    setSearchResult(found);

    console.log(searchResult);
  }, 500);

  function closeSearchResults(event) {
    event.preventDefault();
    router.push(event.target.href);
    setSearchTerm("");
  }

  return (
    <>
      <div className="relative hidden lg:block lg:max-w-md lg:flex-auto">
        <button
          type="button"
          className="focus:[&amp;:not(:focus-visible)]:outline-none hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex"
        >
          <Image
            width={90}
            height={90}
            src="/search.svg"
            alt="Search"
            className="h-5 w-5"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search..."
            className="flex-1 focus:border-none focus:outline-none"
          />
          <kbd className="ml-auto w-auto text-2xs text-zinc-400 dark:text-zinc-500">
            <kbd className="font-sans">Ctrl </kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        </button>
      </div>
      {searchTerm && searchTerm.trim().length > 0 && (
        <SearchResult
          results={searchResult}
          term={searchTerm}
          closeSearchResults={closeSearchResults}
        />
      )}
    </>
  );
}

export default Search;
