import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

// ─── Logic ───────────────────────────────────────────

function getStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "bg-status-error" };
  if (score <= 2)
    return { score: 2, label: "Fair", color: "bg-status-warning" };
  if (score <= 3) return { score: 3, label: "Strong", color: "bg-accent-cyan" };
  return { score: 4, label: "Very Strong", color: "bg-status-success" };
}

// ─── Component ───────────────────────────────────────

export function PasswordStrength({
  password,
  className,
}: PasswordStrengthProps) {
  if (!password) return null;

  const { score, label, color } = getStrength(password);

  return (
    <div className={cn("mt-2 space-y-1.5", className)}>
      <div
        className="flex gap-1"
        role="meter"
        aria-label="Password strength"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={4}
      >
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              level <= score ? color : "bg-white/10",
            )}
          />
        ))}
      </div>
      <p className="text-text-tertiary text-xs">{label}</p>
    </div>
  );
}
