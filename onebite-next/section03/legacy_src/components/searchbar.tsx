"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const router = useRouter();
  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <input value={search} onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
