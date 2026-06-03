"use client";

import dynamic from "next/dynamic";

const ProgressBar = dynamic(() => import("./ProgressBar"), {
  ssr: false,
});

export default function ProgressBarWrapper() {
  return <ProgressBar />;
}
