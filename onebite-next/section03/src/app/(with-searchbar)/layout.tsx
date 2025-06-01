import React, { ReactNode } from "react";
import SearchBar from "./searchbar";
import Home from "./page";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>임시 서치바</div>
      <Home />
      <SearchBar />
    </div>
  );
}
