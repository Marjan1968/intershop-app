"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initial = searchParams.get("q") ?? "";
  const [value, setValue] = useState(initial);

  const [loading, setLoading] = useState(false);

  
 useEffect(() => {
  // ne proži, če value ostane enak začetnemu
  if (value === initial) {
    return;
  }

  setLoading(true);

  const timer = setTimeout(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    params.delete("page");

    router.replace(`/pesmi?${params.toString()}`);
    setLoading(false);
  }, 300);

  return () => clearTimeout(timer);
}, [value]);



  return (
    <div className="relative">
  <input
    type="search"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Išči pesem..."
    className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm pr-10"
  />

  {loading && (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-transparent"></div>
  )}
</div>
  );
}