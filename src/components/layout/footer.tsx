"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { SITE, FOOTER_COLUMNS } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// ─── Component ───────────────────────────────────────

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-border bg-bg-secondary relative border-t"
      role="contentinfo"
    >
      {/* Gradient border line */}
      <div
        className="via-accent-purple/50 absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5"
        >
          {/* Brand Column */}
          <motion.div
            variants={fadeInUp}
            className="col-span-2 md:col-span-4 lg:col-span-1"
          >
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-gradient">{SITE.name}</span>
            </Link>
            <p className="text-text-tertiary mt-3 max-w-xs text-sm leading-relaxed">
              {SITE.tagline}
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex gap-3">
              {["X", "GH", "LI"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    "text-text-tertiary font-mono text-xs",
                    "border-border hover:border-border-hover border",
                    "hover:text-text-primary hover:bg-white/5",
                    "transition-all duration-[var(--duration-fast)]",
                  )}
                  aria-label={`${label} social link`}
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {FOOTER_COLUMNS.map((column) => (
            <motion.div key={column.title} variants={fadeInUp}>
              <h3 className="text-text-primary mb-4 text-sm font-semibold">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        "text-text-tertiary text-sm",
                        "hover:text-text-secondary transition-colors duration-[var(--duration-fast)]",
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Copyright */}
        <div className="border-border mt-12 border-t pt-8">
          <p className="text-text-tertiary text-center text-xs">
            &copy; {currentYear} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
