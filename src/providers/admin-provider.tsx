import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { type Organization } from "@/types/platform";

interface AdminTelemetry {
  usersCount: number;
  workspacesCount: number;
  organizationsCount: number;
  activePlansDistribution: {
    FREE: number;
    PRO: number;
    ENTERPRISE: number;
  };
  monthlyRecurringRevenueUSD: number;
}

interface AdminContextType {
  telemetry: AdminTelemetry | null;
  organizations: Organization[];
  isLoading: boolean;
  loadTelemetry: () => Promise<void>;
  loadOrganizations: () => Promise<void>;
  createOrganization: (name: string, plan: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [telemetry, setTelemetry] = useState<AdminTelemetry | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTelemetry = useCallback(async () => {
    try {
      const res = await fetch("/api/admin");
      const payload = await res.json();
      if (payload.success) {
        setTelemetry(payload.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadOrganizations = useCallback(async () => {
    try {
      const res = await fetch("/api/organizations");
      const payload = await res.json();
      if (payload.success) {
        setOrganizations(payload.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const createOrganization = useCallback(
    async (name: string, billingPlan = "FREE") => {
      try {
        const res = await fetch("/api/organizations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, billingPlan }),
        });
        if (res.ok) {
          await loadOrganizations();
          await loadTelemetry();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [loadOrganizations, loadTelemetry],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
      const loadAll = async () => {
        try {
          await Promise.all([loadTelemetry(), loadOrganizations()]);
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };
      loadAll();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadTelemetry, loadOrganizations]);

  const value = useMemo(
    () => ({
      telemetry,
      organizations,
      isLoading,
      loadTelemetry,
      loadOrganizations,
      createOrganization,
    }),
    [
      telemetry,
      organizations,
      isLoading,
      loadTelemetry,
      loadOrganizations,
      createOrganization,
    ],
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdminContext() {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return ctx;
}
