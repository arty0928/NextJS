import React, { ReactNode } from "react";
import Home from "./page";
import SearchBar from "@/components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Home />
      <SearchBar />
    </div>
  );
}
