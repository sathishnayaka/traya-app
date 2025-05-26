import React from "react";
import { DataGrid } from "../components/DataGrid/DataGrid";
import { Column } from "../components/DataGrid/types";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: "Active" | "Inactive";
  joinDate: string;
}

const data: User[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  age: 20 + (i % 50),
  status: Math.random() > 0.5 ? "Active" : "Inactive",
  joinDate: new Date(Date.now() - i * 86400000).toISOString(), // last X days
}));

const columns: Column<User>[] = [
  { key: "id", title: "ID", width: 80 },
  { key: "name", title: "Name", filterable: true, width: 150 },
  { key: "email", title: "Email", filterable: true, width: 250 },
  { key: "age", title: "Age", width: 100 },

  // 🟢 Status Badge
  {
    key: "status",
    title: "Status",
    width: 120,
    render: (value) => (
      <span
        style={{
          padding: "2px 8px",
          borderRadius: "9999px",
          backgroundColor: value === "Active" ? "#d4fcd4" : "#fde2e2",
          color: value === "Active" ? "#007f00" : "#cc0000",
          fontWeight: "bold",
          fontSize: "0.85em",
        }}
      >
        {value}
      </span>
    ),
  },

  // 🔗 Profile Link
  {
    key: "email",
    title: "Profile",
    width: 180,
    render: (value, row) => (
      <a
        href={`https://example.com/users/${row.id}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#007bff", textDecoration: "underline" }}
      >
        View Profile
      </a>
    ),
  },

  // 📅 Join Date
  {
    key: "joinDate",
    title: "Join Date",
    width: 160,
    render: (value) => {
      const date = new Date(value);
      return date.toLocaleDateString();
    },
  },
];

function DataGridPage() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Virtualized DataGrid with Custom Rendered Columns</h2>
      <DataGrid<User> columns={columns} data={data} rowHeight={35} height={500} />
    </div>
  );
}

export default DataGridPage;