"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Link as LinkIcon, Settings, QrCode as QrCodeIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/utils";
import { FormInput } from "../auth/FormInput";
import { LoadingButton } from "../auth/LoadingButton";

interface CreateLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateLinkModal({ isOpen, onClose }: CreateLinkModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "settings">("general");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    onClose();
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-heading/40 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg -translate-x-[50%] -translate-y-[50%] overflow-hidden rounded-2xl bg-white shadow-2xl focus:outline-none border border-border"
              >
                <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                  <Dialog.Title className="text-lg font-bold text-heading flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <LinkIcon size={16} />
                    </div>
                    Create new link
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="text-paragraph/50 hover:text-heading p-2 rounded-lg hover:bg-surface transition-colors">
                      <X size={18} />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="flex border-b border-border px-6 gap-6">
                  <button
                    onClick={() => setActiveTab("general")}
                    className={cn(
                      "py-3 text-sm font-medium transition-colors border-b-2",
                      activeTab === "general"
                        ? "border-primary text-primary"
                        : "border-transparent text-paragraph hover:text-heading"
                    )}
                  >
                    General
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={cn(
                      "py-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-1.5",
                      activeTab === "settings"
                        ? "border-primary text-primary"
                        : "border-transparent text-paragraph hover:text-heading"
                    )}
                  >
                    Settings
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="p-6 space-y-5">
                    {activeTab === "general" ? (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <FormInput
                          label="Destination URL"
                          placeholder="https://example.com/long-url..."
                          autoFocus
                        />
                        <FormInput
                          label="Custom Alias (Optional)"
                          placeholder="my-custom-link"
                          rightElement={<span className="text-paragraph/40 text-sm">mini.url/</span>}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                         <FormInput
                          label="Password Protection"
                          type="password"
                          placeholder="Enter password..."
                        />
                        <FormInput
                          label="Expiration Date"
                          type="datetime-local"
                        />
                        <label className="flex items-center gap-3 p-3 rounded-xl border border-border cursor-pointer hover:bg-surface transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-heading shrink-0 border border-border">
                            <QrCodeIcon size={16} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-heading">Generate QR Code</p>
                            <p className="text-xs text-paragraph">Automatically create a downloadable QR code.</p>
                          </div>
                          <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20" defaultChecked />
                        </label>
                      </motion.div>
                    )}
                  </div>

                  <div className="px-6 py-4 border-t border-border bg-surface flex justify-end gap-3">
                    <Dialog.Close asChild>
                      <button type="button" className="px-4 py-2 text-sm font-medium text-heading hover:bg-white border border-transparent hover:border-border rounded-xl transition-all">
                        Cancel
                      </button>
                    </Dialog.Close>
                    <LoadingButton type="submit" loading={isLoading} className="w-auto">
                      Create Link
                    </LoadingButton>
                  </div>
                </form>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
