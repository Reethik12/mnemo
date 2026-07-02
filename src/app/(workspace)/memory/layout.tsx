"use client";

import { ReactNode } from "react";
import { WorkspaceShell } from "@/components";

export default function MemoryLayout({ children }: { children: ReactNode }) {
  return (
    <WorkspaceShell>
      {/* 
        The WorkspaceShell handles the Sidebar and TopNav.
        Children here are the 3-pane Memory layout.
      */}
      <div className="bg-bg-primary h-[calc(100vh-64px)] w-full overflow-hidden">
        {children}
      </div>
    </WorkspaceShell>
  );
}
