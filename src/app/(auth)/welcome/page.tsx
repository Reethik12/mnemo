"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/effects/particles";
import { NoiseTexture } from "@/components/effects/noise-texture";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export default function WelcomePage() {
  const router = useRouter();
  const user = useUser();

  return (
    <div className="bg-bg-primary relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <Particles count={8} />
      <NoiseTexture />

      <motion.div
        variants={staggerContainer(0.2, 0.3)}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-lg flex-col items-center text-center"
      >
        <motion.div variants={fadeInUp} className="mb-8">
          <span className="text-gradient text-3xl font-bold">Mnemo</span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-text-primary text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Welcome,{" "}
          <span className="text-gradient">
            {user?.name?.split(" ")[0] ?? "Explorer"}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-text-secondary mt-4 text-base leading-relaxed"
        >
          Your Living Memory Operating System is ready. Start building a
          persistent knowledge fabric that grows with you across applications,
          devices, and time.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-10">
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push("/dashboard")}
            rightIcon={
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            }
          >
            Enter Mnemo
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
