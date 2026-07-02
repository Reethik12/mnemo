"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useUser } from "@/hooks/use-user";

// ─── Component ───────────────────────────────────────

export function WelcomeBanner() {
  const user = useUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="text-text-primary">{getGreeting()}, </span>
        <span className="text-gradient">
          {user?.name?.split(" ")[0] ?? "Explorer"}
        </span>
      </h1>
      <p className="text-text-secondary mt-2 text-base">
        Welcome to your Living Memory Operating System.
      </p>
    </motion.div>
  );
}
