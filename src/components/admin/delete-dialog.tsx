"use client";

import { AlertTriangle } from "lucide-react";

interface DeleteDialogProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export function DeleteDialog({
  isOpen,
  title,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 border border-slate-200 shadow-xl">
        <div className="flex items-center gap-3 text-rose-600 mb-4">
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100">
            <AlertTriangle size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Confirm Delete</h3>
        </div>

        <p className="text-sm text-slate-600 mb-6">
          Are you sure you want to delete <span className="font-semibold text-slate-900">&quot;{title}&quot;</span>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white shadow-xs disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Permanently"}
          </button>
        </div>
      </div>
    </div>
  );
}
