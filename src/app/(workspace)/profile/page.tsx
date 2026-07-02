"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useUser } from "@/hooks/use-user";
import { userService } from "@/services/user-service";
import { SectionHeader } from "@/components/shared/section-header";
import { GlassContainer } from "@/components/shared/glass-container";
import { StatusPill } from "@/components/shared/status-pill";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const user = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      await userService.updateProfile(user, { name, email });
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <SectionHeader
        title="Profile"
        description="Manage your personal information and preferences."
      />

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-8 md:grid-cols-3"
      >
        {/* Left Column: Avatar & Summary */}
        <motion.div variants={fadeInUp} className="space-y-6 md:col-span-1">
          <GlassContainer className="flex flex-col items-center p-8 text-center">
            <div className="relative mb-6">
              <div className="bg-accent-purple/20 text-accent-purple-light flex h-32 w-32 items-center justify-center rounded-full text-4xl font-bold shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button
                className="bg-surface-hover border-border text-text-secondary hover:text-text-primary absolute right-0 bottom-0 rounded-full border p-2 transition-colors"
                aria-label="Upload avatar"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-text-primary text-xl font-bold">{user.name}</h2>
            <p className="text-text-secondary mb-4 text-sm">{user.email}</p>
            <StatusPill status="active" />
          </GlassContainer>
        </motion.div>

        {/* Right Column: Details & Form */}
        <motion.div variants={fadeInUp} className="space-y-6 md:col-span-2">
          <GlassContainer>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-text-primary text-lg font-semibold">
                Personal Details
              </h3>
              {!isEditing && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <Input
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="flex gap-3 pt-4">
                  <Button type="submit" variant="primary" isLoading={isLoading}>
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setIsEditing(false);
                      setName(user.name);
                      setEmail(user.email);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <p className="text-text-tertiary mb-1 text-xs font-medium tracking-wider uppercase">
                    Full Name
                  </p>
                  <p className="text-text-primary">{user.name}</p>
                </div>
                <div>
                  <p className="text-text-tertiary mb-1 text-xs font-medium tracking-wider uppercase">
                    Email Address
                  </p>
                  <p className="text-text-primary">{user.email}</p>
                </div>
                <div>
                  <p className="text-text-tertiary mb-1 text-xs font-medium tracking-wider uppercase">
                    Workspace
                  </p>
                  <p className="text-text-primary">{user.workspace.name}</p>
                </div>
                <div>
                  <p className="text-text-tertiary mb-1 text-xs font-medium tracking-wider uppercase">
                    Member Since
                  </p>
                  <p className="text-text-primary">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </GlassContainer>
        </motion.div>
      </motion.div>
    </div>
  );
}
