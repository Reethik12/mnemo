import type { ReactNode } from "react";

export default function WorkflowsLayout({ children }: { children: ReactNode }) {
  return <div className="h-full w-full">{children}</div>;
}
