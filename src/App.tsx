import { useState } from "react";
import type { Column } from "./components/DataTable";
import { InputField } from "./components/InputField";
import { DataTable } from "./components/DataTable";

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

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [inputVariant, setInputVariant] = useState<'filled' | 'outlined' | 'ghost'>('outlined');
  const [inputSize, setInputSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [inputLoading, setInputLoading] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState<User[]>(sampleData);

  const columns: Column<User>[] = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-8">
      {/* InputField Demo */}
      <div className="max-w-md">
        <h2 className="text-xl font-bold mb-4">InputField Demo</h2>
        <div className="flex gap-2 mb-2">
          <select value={inputVariant} onChange={e => setInputVariant(e.target.value as any)}>
            <option value="filled">Filled</option>
            <option value="outlined">Outlined</option>
            <option value="ghost">Ghost</option>
          </select>
          <select value={inputSize} onChange={e => setInputSize(e.target.value as any)}>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
          <button onClick={() => setInputLoading(l => !l)}>
            {inputLoading ? "Stop Loading" : "Loading"}
          </button>
          <button onClick={() => setInputDisabled(d => !d)}>
            {inputDisabled ? "Enable" : "Disable"}
          </button>
        </div>
        <InputField
          label="Your Name"
          placeholder="Enter your name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          helperText="Please enter your full name"
          errorMessage="Name is required"
          disabled={inputDisabled}
          invalid={!inputValue && !inputLoading}
          variant={inputVariant}
          size={inputSize}
          loading={inputLoading}
          clearable={true}
        />
        <p className="mt-2">Current value: {inputValue}</p>
      </div>

      {/* DataTable Demo */}
      <div className="max-w-2xl">
        <h2 className="text-xl font-bold mb-4">DataTable Demo</h2>
        <div className="flex gap-2 mb-2">
          <button onClick={() => setTableLoading(l => !l)}>
            {tableLoading ? "Stop Loading" : "Loading"}
          </button>
          <button onClick={() => setTableData(d => d.length ? [] : sampleData)}>
            {tableData.length ? "Show Empty" : "Show Data"}
          </button>
        </div>
        <DataTable<User>
          data={tableData}
          columns={columns}
          loading={tableLoading}
          selectable
          onRowSelect={setSelectedRows}
        />
        <p className="mt-2 text-sm text-gray-600">
          Selected Rows: {selectedRows.map((r) => r.name).join(", ") || "None"}
        </p>
      </div>
    </div>
  );
}

export default App;