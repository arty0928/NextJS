import { SearchParams } from "next/dist/server/request/search-params";

export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;
  return <div>search page{q}</div>;
}
