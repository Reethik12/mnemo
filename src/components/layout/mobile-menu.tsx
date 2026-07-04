"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/constants";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

// ─── Types ───────────────────────────────────────────

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Component ───────────────────────────────────────

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed inset-0 z-[calc(var(--z-navbar)-1)]",
            "bg-bg-primary/95 backdrop-blur-xl",
            "md:hidden",
          )}
        >
          <motion.nav
            variants={staggerContainer(0.08, 0.2)}
            initial="hidden"
            animate="visible"
            className="flex h-full flex-col items-center justify-center gap-8 px-6"
          >
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                variants={fadeInUp}
                onClick={onClose}
                className={cn(
                  "text-text-secondary text-2xl font-medium",
                  "hover:text-text-primary transition-colors",
                )}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div
              variants={fadeInUp}
              className="mt-4 flex w-full max-w-xs flex-col gap-3"
            >
              <Link href="/login" className="w-full" onClick={onClose}>
                <Button variant="ghost" size="lg" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/register" className="w-full" onClick={onClose}>
                <Button variant="primary" size="lg" className="w-full">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
