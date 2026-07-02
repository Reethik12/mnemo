"use client";

import { useToast as useToastContext } from "@/providers/toast-provider";

export function useToast() {
  return useToastContext();
}
