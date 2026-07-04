"use client";

import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { ModuleCard } from "@/components/dashboard/module-card";
import { SectionHeader } from "@/components/shared/section-header";
import { MODULE_CARDS } from "@/lib/constants";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeBanner />

      {/* Modules */}
      <section id="modules">
        <SectionHeader title="Core Intelligence Modules" className="mb-4" />
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {MODULE_CARDS.map((module, i) => (
            <ModuleCard key={module.id} module={module} index={i} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}
