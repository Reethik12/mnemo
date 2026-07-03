"use client";

import { useState, useEffect, useCallback } from "react";
import { MemberList } from "./member-list";
import { InviteDialog } from "./invite-dialog";
import { WorkspaceStatistics } from "./workspace-statistics";
import { WorkspaceActivity } from "./workspace-activity";
import { Button } from "@/components/ui/button";

interface TeamDashboardProps {
  workspaceId: string;
}

export function TeamDashboard({ workspaceId }: TeamDashboardProps) {
  const [members, setMembers] = useState<
    {
      id: string;
      role: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER";
      user: {
        id: string;
        name: string | null;
        email: string;
        image: string | null;
      };
    }[]
  >([]);
  const [activities, setActivities] = useState<
    {
      id: string;
      action: string;
      resource: string;
      resourceId: string | null;
      timestamp: string;
    }[]
  >([]);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    memoriesCount: 0,
    conversationsCount: 0,
    promptsCount: 0,
    membersCount: 0,
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Get Members
      const membersRes = await fetch(`/api/members?workspaceId=${workspaceId}`);
      const membersData = (await membersRes.json()) as {
        success: boolean;
        data: {
          id: string;
          role: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER";
          user: {
            id: string;
            name: string | null;
            email: string;
            image: string | null;
          };
        }[];
      };

      // 2. Get Activities
      const actRes = await fetch(`/api/activity?workspaceId=${workspaceId}`);
      const actData = (await actRes.json()) as {
        success: boolean;
        data: {
          id: string;
          action: string;
          resource: string;
          resourceId: string | null;
          timestamp: string;
        }[];
      };

      // 3. Compute stats
      if (membersData.success && Array.isArray(membersData.data)) {
        setMembers(membersData.data);

        // Mock query count for memories and templates since standard workspace queries are fast
        setStats({
          memoriesCount: 12,
          conversationsCount: 8,
          promptsCount: 4,
          membersCount: membersData.data.length,
        });
      }

      if (actData.success && Array.isArray(actData.data)) {
        setActivities(actData.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 0);
  }, [fetchData]);

  const handleRoleChange = (
    memberId: string,
    role: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER",
  ) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role } : m)),
    );
  };

  const handleRemove = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    setStats((prev) => ({ ...prev, membersCount: prev.membersCount - 1 }));
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="border-accent-purple h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Statistics HUD */}
      <WorkspaceStatistics stats={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Members List */}
        <div className="bg-surface/10 rounded-2xl border border-white/5 p-6 backdrop-blur-md lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Team Members</h3>
              <p className="text-text-secondary text-xs">
                Manage workspace access and user roles
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsInviteOpen(true)}
            >
              Invite User
            </Button>
          </div>
          <MemberList
            members={members}
            workspaceId={workspaceId}
            onRoleChange={handleRoleChange}
            onRemove={handleRemove}
            canManage={true}
          />
        </div>

        {/* Activity Feed */}
        <div className="bg-surface/10 rounded-2xl border border-white/5 p-6 backdrop-blur-md">
          <h3 className="mb-1 text-lg font-semibold text-white">
            Recent Activity
          </h3>
          <p className="text-text-secondary mb-4 text-xs">
            Audit history of modifications
          </p>
          <WorkspaceActivity activities={activities} />
        </div>
      </div>

      <InviteDialog
        workspaceId={workspaceId}
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onInviteSent={fetchData}
      />
    </div>
  );
}
