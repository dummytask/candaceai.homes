import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Application } from "@prisma/client";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const lower = status.toLowerCase();
  let className = "text-[10px] tracking-widest uppercase px-2 py-0.5 border ";

  if (lower === "approved") {
    className += "text-green-900 border-green-900";
  } else if (lower === "rejected") {
    className += "text-red-900 border-red-900";
  } else {
    className += "text-[#888] border-[#222]";
  }

  return <span className={className}>{status}</span>;
}

type SearchParams = { status?: string; page?: string };

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin();

  const resolvedParams = await searchParams;
  const statusFilter = resolvedParams.status ?? "";

  const where = statusFilter ? { status: statusFilter } : {};

  const applications: Application[] = await prisma.application.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const tabs = [
    { label: "ALL", value: "" },
    { label: "PENDING", value: "pending" },
    { label: "APPROVED", value: "approved" },
    { label: "REJECTED", value: "rejected" },
  ];

  return (
    <div className="bg-[#080808] min-h-screen px-8 py-12 md:px-16">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-widest text-[#444] uppercase">
          Candace AI / Admin
        </span>
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="text-[10px] tracking-widest text-[#444] uppercase hover:text-[#888] transition-colors"
          >
            Logout
          </button>
        </form>
      </div>

      {/* Headline */}
      <h1 className="text-3xl font-light text-white mt-8 mb-8">
        Applications
      </h1>

      {/* Filter tabs */}
      <div className="flex gap-6 mb-8 border-b border-[#111] pb-4">
        {tabs.map((tab) => {
          const isActive = statusFilter === tab.value;
          const href = tab.value ? `/admin?status=${tab.value}` : "/admin";
          return (
            <Link
              key={tab.value}
              href={href}
              className={`text-[10px] tracking-widest uppercase pb-1 transition-colors ${
                isActive
                  ? "text-white border-b border-white"
                  : "text-[#444] hover:text-[#888]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Table */}
      {applications.length === 0 ? (
        <div className="flex items-center justify-center py-32">
          <p className="text-[#333]">No applications yet.</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#111]">
                <th className="text-left text-[10px] tracking-widest text-[#333] uppercase pb-3 pr-6 font-normal">
                  Name
                </th>
                <th className="text-left text-[10px] tracking-widest text-[#333] uppercase pb-3 pr-6 font-normal">
                  Email
                </th>
                <th className="text-left text-[10px] tracking-widest text-[#333] uppercase pb-3 pr-6 font-normal">
                  Kitchen Type
                </th>
                <th className="text-left text-[10px] tracking-widest text-[#333] uppercase pb-3 pr-6 font-normal">
                  Status
                </th>
                <th className="text-left text-[10px] tracking-widest text-[#333] uppercase pb-3 font-normal">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b border-[#0d0d0d] hover:bg-[#0d0d0d] transition-colors"
                >
                  <td className="py-4 pr-6">
                    <Link
                      href={`/admin/${app.id}`}
                      className="text-sm text-[#e8e8e8] hover:text-white transition-colors"
                    >
                      {app.fullName}
                    </Link>
                  </td>
                  <td className="py-4 pr-6">
                    <Link href={`/admin/${app.id}`} className="text-sm text-[#888] hover:text-[#aaa] transition-colors">
                      {app.email}
                    </Link>
                  </td>
                  <td className="py-4 pr-6">
                    <Link href={`/admin/${app.id}`} className="text-sm text-[#888] hover:text-[#aaa] transition-colors">
                      {app.streetAddress}
                    </Link>
                  </td>
                  <td className="py-4 pr-6">
                    <Link href={`/admin/${app.id}`}>
                      <StatusBadge status={app.status} />
                    </Link>
                  </td>
                  <td className="py-4">
                    <Link href={`/admin/${app.id}`} className="text-sm text-[#555] hover:text-[#888] transition-colors">
                      {formatDate(app.createdAt)}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
