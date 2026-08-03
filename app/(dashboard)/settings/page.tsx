"use client";

import { useState } from "react";
import { cn } from "@/utils";
import { FormInput } from "@/app/components/auth/FormInput";
import { LoadingButton } from "@/app/components/auth/LoadingButton";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "appearance", label: "Appearance" },
    { id: "api", label: "API Keys" },
    { id: "danger", label: "Danger Zone" },
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading">Settings</h1>
        <p className="text-sm text-paragraph mt-1">Manage your account and preferences.</p>
      </div>

      <div className="flex gap-8">
        <aside className="w-48 shrink-0 hidden md:block">
          <nav className="flex flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-paragraph hover:bg-surface hover:text-heading"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
          {activeTab === "profile" && (
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <h2 className="text-lg font-bold text-heading mb-4">Personal Information</h2>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-full bg-surface border border-border flex items-center justify-center text-xl font-bold text-primary">
                    JD
                  </div>
                  <button className="bg-white border border-border text-heading px-4 py-2 rounded-xl text-sm font-medium hover:bg-surface transition-colors shadow-sm">
                    Change Avatar
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput label="First Name" defaultValue="John" />
                  <FormInput label="Last Name" defaultValue="Doe" />
                </div>
                <div className="mt-4">
                  <FormInput label="Email Address" defaultValue="john@example.com" type="email" />
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <LoadingButton className="w-auto px-8">Save Changes</LoadingButton>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-bold text-heading">Theme Preferences</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button className="border-2 border-primary rounded-xl p-4 text-left relative overflow-hidden bg-white">
                  <div className="w-full h-20 bg-surface rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-sm font-medium text-heading">Light</span>
                  </div>
                  <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                </button>
                <button className="border-2 border-border rounded-xl p-4 text-left relative overflow-hidden bg-slate-900">
                  <div className="w-full h-20 bg-slate-800 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">Dark</span>
                  </div>
                </button>
                <button className="border-2 border-border rounded-xl p-4 text-left relative overflow-hidden bg-white">
                  <div className="w-full h-20 bg-gradient-to-r from-surface to-slate-800 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-sm font-medium text-heading">System</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {activeTab === "danger" && (
            <div className="p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-bold text-danger">Danger Zone</h2>
              <p className="text-sm text-paragraph">Once you delete your account, there is no going back. Please be certain.</p>
              
              <div className="p-4 border border-danger/30 bg-danger/5 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-heading">Delete Account</h4>
                  <p className="text-xs text-paragraph mt-1">Permanently remove your personal data and all short links.</p>
                </div>
                <button className="bg-danger text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-danger/90 transition-colors shadow-sm whitespace-nowrap">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
