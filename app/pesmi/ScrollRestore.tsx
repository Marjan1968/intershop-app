"use client";

import { useEffect } from "react";

export default function ScrollRestore() {
  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");

    if (scrollY) {
      window.scrollTo(0, Number(scrollY));
      sessionStorage.removeItem("scrollY");
    }
  }, []);

  return null;
}
