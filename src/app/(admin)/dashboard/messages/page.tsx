"use client";

import { useState, useEffect } from "react";
import { Mail, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getContactMessages, toggleMessageRead, deleteContactMessage } from "@/actions/contact.actions";

export default function DashboardMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMessages = async () => {
    setIsLoading(true);
    const data = await getContactMessages();
    setMessages(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleRead = async (id: string, currentReadStatus: boolean) => {
    const res = await toggleMessageRead(id, !currentReadStatus);
    if (res.success) {
      toast.success(currentReadStatus ? "Marked as unread" : "Marked as read");
      loadMessages();
    } else {
      toast.error(res.error || "Failed to update message");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete message from ${name}?`)) return;
    const res = await deleteContactMessage(id);
    if (res.success) {
      toast.success("Message deleted");
      loadMessages();
    } else {
      toast.error(res.error || "Failed to delete message");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Messages</h2>
        <p className="text-sm text-slate-500 mt-1">
          Contact form submissions stored in PostgreSQL ({messages.filter((m) => !m.read).length} unread)
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-2xl bg-white p-5 group border shadow-xs transition-all ${
                !msg.read
                  ? "border-l-4 border-l-indigo-600 border-slate-200 bg-indigo-50/30"
                  : "border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 h-fit shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{msg.name}</h4>
                      {!msg.read && (
                        <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0 animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs font-medium text-slate-400">{msg.email}</p>
                    {msg.subject && (
                      <p className="text-sm text-slate-900 mt-2 font-semibold">
                        Subject: {msg.subject}
                      </p>
                    )}
                    <p className="text-sm text-slate-700 mt-1 whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-2 font-medium">
                      {new Date(msg.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => handleToggleRead(msg.id, msg.read)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
                    title={msg.read ? "Mark as unread" : "Mark as read"}
                  >
                    {msg.read ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id, msg.name)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                    title="Delete message"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="text-center py-12 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <Mail size={32} className="mx-auto text-slate-400 mb-3" />
              <p className="text-slate-900 font-bold">No messages yet</p>
              <p className="text-xs text-slate-500 mt-1">
                Submissions from your public contact form will appear here.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
