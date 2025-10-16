"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user, signOut } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button
              onClick={signOut}
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
            >
              Sign Out
            </Button>
          </div>

          {/* User Info Card */}
          <div className="bg-white/5 p-6 rounded-lg border border-white/10 mb-8">
            <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
            {user && (
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                {user.name && (
                  <p className="text-gray-300">
                    <span className="font-medium">Name:</span> {user.name}
                  </p>
                )}
                <p className="text-gray-300">
                  <span className="font-medium">User ID:</span> {user.id}
                </p>
              </div>
            )}
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-gray-400">View your analytics and insights</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-2">Settings</h3>
              <p className="text-gray-400">Manage your account settings</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-2">Reports</h3>
              <p className="text-gray-400">Generate and view reports</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
