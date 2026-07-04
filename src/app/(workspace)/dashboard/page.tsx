"use client";

import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ModuleCard } from "@/components/dashboard/module-card";
import { SectionHeader } from "@/components/shared/section-header";
import { DASHBOARD_STATS, MODULE_CARDS } from "@/lib/constants";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeBanner />

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {DASHBOARD_STATS.map((stat, i) => (
          <StatsCard key={stat.id} stat={stat} index={i} />
        ))}
      </motion.div>

      {/* Modules */}
      <section id="modules">
        <SectionHeader
          title="Modules"
          description="Explore the Mnemo ecosystem"
          className="mb-4"
        />
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
