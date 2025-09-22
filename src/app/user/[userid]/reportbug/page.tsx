"use client";
import { useContext, useState } from "react";
import { sessionContext } from "@/app/components/HomePage";

export default function BugForm() {
  const { session, status } = useContext(sessionContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: "Low",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/bugs", {
      method: "POST",
      body: JSON.stringify({ ...form, user: session?.user?.name }),
    });

    const data = await response.json();

    alert("Bug reported!");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4 border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Report a Bug
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter bug title"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Describe the bug..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Severity
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.severity}
            onChange={(e) => setForm({ ...form, severity: e.target.value })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200"
        >
          Submit Bug
        </button>
      </form>
    </div>
  );
}
