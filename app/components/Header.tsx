"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#software", label: "Software" },
  { href: "#services", label: "Services" },
  { href: "#solutions", label: "Solutions" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-white/10 bg-black/80 backdrop-blur-md"
          : "border-b border-white/5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10 lg:py-5">
        <Link href="/" className="shrink-0" aria-label="Bespoke Everything home">
          <Image
            src="/logo/BE-logo-compact-dark.png"
            alt=""
            width={410}
            height={297}
            priority
            className="h-10 w-auto sm:h-11 lg:h-12"
          />
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] tracking-wide text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 inline-flex items-center justify-center border border-gold/60 bg-gold/10 px-5 py-2 text-[13px] tracking-wide text-gold transition-colors hover:border-gold hover:bg-gold/20"
          >
            Start a Conversation
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-white/10 bg-black/95 px-6 py-8 backdrop-blur-md lg:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-lg tracking-wide text-white/80 transition-colors hover:text-gold"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center border border-gold/60 bg-gold/10 px-5 py-3 text-sm tracking-wide text-gold transition-colors hover:border-gold hover:bg-gold/20"
                onClick={() => setMenuOpen(false)}
              >
                Start a Conversation
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
