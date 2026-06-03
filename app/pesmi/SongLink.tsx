"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

function CenterLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-8 py-6 shadow-xl dark:bg-zinc-900">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-300 border-t-black dark:border-zinc-700 dark:border-t-white"></div>
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Nalagam pesem ...
        </div>
      </div>
    </div>
  );
}

export default function SongLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {isPending && <CenterLoader />}

      <button
        onClick={() => {
          startTransition(() => {
            router.push(href);
          });
        }}
        className={className} 
      >
        {children}
      </button>
    </>
  );
}