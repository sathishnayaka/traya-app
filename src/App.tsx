import React from "react";
import { DataGrid } from "./components/DataGrid/DataGrid";
import { Column } from "./components/DataGrid/types";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Generate 1000 mock rows
const data: User[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  age: 20 + (i % 50),
}));

// Define columns
const columns: Column<User>[] = [
  { key: "id", title: "ID", width: 80, frozen: true },
  { key: "name", title: "Name", filterable: true, width: 150 },
  { key: "email", title: "Email", filterable: true, width: 250 },
  { key: "age", title: "Age", width: 100 },
];

function App() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Virtualized DataGrid with 1000 Rows</h2>
      <DataGrid<User> columns={columns} data={data} rowHeight={35} height={500} />
    </div>
  );
}

export default App;