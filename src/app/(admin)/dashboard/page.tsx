import {
  FolderKanban,
  FileText,
  Zap,
  MessageSquare,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { getProjectCount } from "@/actions/project.actions";
import { getBlogCount } from "@/actions/blog.actions";
import { getSkillCount } from "@/actions/skill.actions";
import { getUnreadContactCount, getRecentContactMessages } from "@/actions/contact.actions";

export default async function DashboardPage() {
  const [projectCount, blogCount, skillCount, unreadMessages, recentMessages] =
    await Promise.all([
      getProjectCount(),
      getBlogCount(),
      getSkillCount(),
      getUnreadContactCount(),
      getRecentContactMessages(5),
    ]);

  const stats = [
    {
      label: "Total Projects",
      value: projectCount,
      icon: FolderKanban,
      href: "/dashboard/projects",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Blog Posts",
      value: blogCount,
      icon: FileText,
      href: "/dashboard/blogs",
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      label: "Skills",
      value: skillCount,
      icon: Zap,
      href: "/dashboard/skills",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Unread Messages",
      value: unreadMessages,
      icon: MessageSquare,
      href: "/dashboard/messages",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Welcome back! 👋
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Here&apos;s a live overview of your portfolio database.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-2xl bg-white border border-slate-200 p-5 shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <Eye
                size={16}
                className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stat.value}
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions + Recent Messages */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2.5">
            <Link
              href="/dashboard/projects"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 transition-all text-sm font-medium"
            >
              <FolderKanban size={18} className="text-indigo-600" />
              Manage Projects
            </Link>
            <Link
              href="/dashboard/blogs"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-200 text-slate-700 hover:text-cyan-700 transition-all text-sm font-medium"
            >
              <FileText size={18} className="text-cyan-600" />
              Manage Blog Posts
            </Link>
            <Link
              href="/dashboard/skills"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 text-slate-700 hover:text-amber-700 transition-all text-sm font-medium"
            >
              <Zap size={18} className="text-amber-600" />
              Manage Skills
            </Link>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-4">
            Recent Contact Messages
          </h3>
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {msg.name} <span className="text-xs font-normal text-slate-500">({msg.email})</span>
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                    {msg.subject || msg.message}
                  </p>
                </div>
                <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap ml-2">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
            {recentMessages.length === 0 && (
              <p className="text-xs text-slate-400 py-6 text-center">
                No contact messages yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* View Site Button */}
      <div className="text-center pt-2">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-3 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-200 shadow-xs transition-all"
        >
          <Eye size={16} />
          View Live Portfolio Site
        </Link>
      </div>
    </div>
  );
}
