import { useState } from "react";
import { DataTable } from "../components/DataTable";
import type { DataTableProps } from "../components/DataTable";
import type { Column } from "../components/DataTable";

interface User {
  id: number;
  name: string;
  age: number;
}

const sampleData: User[] = [
  { id: 1, name: "Alice", age: 22 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 25 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

export default {
  title: "Components/DataTable",
  component: DataTable,
  argTypes: {
    loading: { control: "boolean" },
    selectable: { control: "boolean" },
  },
};
export const Basic = (args: DataTableProps<User>) => {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  return (
    <div>
      <DataTable<User>
        {...args}
        data={sampleData}
        columns={columns}
        onRowSelect={setSelectedRows}
      />
      <p style={{ marginTop: 8 }}>
        Selected Rows: {selectedRows.map(r => r.name).join(", ") || "None"}
      </p>
    </div>
  );
};

Basic.args = {
  loading: false,
  selectable: true
};