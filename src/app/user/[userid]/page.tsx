"use client";
import { sessionContext } from "@/app/components/HomePage";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const { session, status } = useContext(sessionContext);
  const [bugs, setBugs] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    status: "",
    severity: "",
  });

  const fetchBugs = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/bugs/search?${query}`, {
        headers: {
          Authorization: `userid ${session?.user?.name}`,
        },
      });
      const data = await response.json();
      setBugs(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (session?.user) {
      fetchBugs();
    }
  }, [filters, session, status]);

  const updateStatus = async (id: string, status: any) => {
    await fetch(`/api/bugs/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    fetchBugs();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by Title"
          className="text-center flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />
        <select
          className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
        <select
          className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
        >
          <option value="">All Severity</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <Link href={`${session?.user?.name}/reportbug`}>
          <button className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Report a bug
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {bugs.map((bug: any) => (
          <div
            key={bug._id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-800">
                {bug.title}
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  bug.severity === "High"
                    ? "bg-red-100 text-red-700"
                    : bug.severity === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {bug.severity}
              </span>
            </div>

            <p className="text-gray-600 mt-2">{bug.description}</p>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  bug.status === "Open"
                    ? "bg-blue-100 text-blue-700"
                    : bug.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {bug.status}
              </span>

              <div className="flex gap-2">
                {["Open", "In Progress", "Closed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(bug._id, s)}
                    className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                      bug.status === s
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
