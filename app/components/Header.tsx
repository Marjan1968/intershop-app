"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/", label: "Dobrodošli" },
  { href: "/pesmi", label: "Seznam pesmi" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Zakleni scroll strani, ko je mobilni meni odprt
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Zapiranje ob ESC + klik izven panela
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (!mobileOpen) return;

      if (
        panelRef.current &&
        event.target instanceof Node &&
        !panelRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-black/90">
        <div className="mx-auto flex w-full max-w-8xl items-center justify-between px-4 py-4 sm:px-6">
          {/* Logo / naslov */}
          
            <Link href="/" onClick={() => setMobileOpen(false)}>
            <img
                src="/snp-dobra-volja.png"
                alt="Slovenske narodne pesmi"
                className="h-25 w-auto"
            />
            </Link>


          {/* Desktop meni */}
          <nav className="hidden md:flex items-center gap-6 uppercase tracking-wide">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative transition-colors duration-200 ${
                    active
                      ? "text-red-400 font-regular dark:text-red-400"
                      : "text-zinc-600 hover:text-gray-400 dark:text-zinc-200 dark:hover:text-gray-400"
                  }`}
                >
                  {item.label}

                  {/* underline */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[1px] bg-gray-400 transition-all duration-300 dark:bg-gray-400 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Zapri meni" : "Odpri meni"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white md:hidden"
          >
            {/* Hamburger */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`absolute h-6 w-6 transition-all duration-300 ${
                mobileOpen
                  ? "rotate-90 scale-75 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            {/* X */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`absolute h-6 w-6 transition-all duration-300 ${
                mobileOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-75 opacity-0"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile slide-in panel */}
      <div
        ref={panelRef}
        className={`fixed right-0 top-0 z-50 h-screen w-72 border-l border-zinc-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:border-zinc-800 dark:bg-zinc-950 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-4 dark:border-zinc-800">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Meni
          </span>

          <button
            type="button"
            aria-label="Zapri meni"
            onClick={() => setMobileOpen(false)}
            className="rounded-md p-2 text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-4 uppercase tracking-wide">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-3 text-sm transition-colors duration-200 ${
                  active
                    ? "bg-red-50 text-red-400 font-regular dark:bg-gray-950/40 dark:text-red-400"
                    : "text-zinc-700 hover:bg-zinc-50 hover:text-blue-400 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-red-400"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
