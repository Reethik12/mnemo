"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

// ─── Component ───────────────────────────────────────

export function Navbar() {
  const { isScrolled } = useScroll(50);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 right-0 left-0 z-[var(--z-navbar)]",
          "transition-all duration-[var(--duration-slow)]",
          isScrolled
            ? "bg-bg-primary/80 border-border border-b shadow-lg shadow-black/10 backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight"
            aria-label={`${SITE.name} home`}
          >
            <span className="text-gradient">{SITE.name}</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-1 md:flex" role="menubar">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium",
                  "text-text-secondary hover:text-text-primary",
                  "transition-colors duration-[var(--duration-fast)]",
                  "hover:bg-white/5",
                )}
                role="menuitem"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className={cn(
              "relative flex h-10 w-10 items-center justify-center md:hidden",
              "rounded-lg transition-colors hover:bg-white/5",
            )}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative flex h-4 w-5 flex-col justify-between">
              <motion.span
                animate={{
                  rotate: isMobileOpen ? 45 : 0,
                  y: isMobileOpen ? 7 : 0,
                }}
                className="bg-text-primary block h-0.5 w-full origin-center rounded-full"
              />
              <motion.span
                animate={{ opacity: isMobileOpen ? 0 : 1 }}
                className="bg-text-primary block h-0.5 w-full rounded-full"
              />
              <motion.span
                animate={{
                  rotate: isMobileOpen ? -45 : 0,
                  y: isMobileOpen ? -7 : 0,
                }}
                className="bg-text-primary block h-0.5 w-full origin-center rounded-full"
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}
