"use client";
import { useState } from "react";

export default function AdminDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState([
    { name: "example.pdf", category: "Reports" },
  ]);

  const handleUpload = () => {
    if (!file) return;
    setFiles([...files, { name: file.name, category: "Uncategorized" }]);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-4 flex flex-col">
        <div className="text-lg font-bold mb-6">New Logo</div>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="px-4 py-2 hover:bg-blue-500">Dashboard</a>
          <a href="#" className="px-4 py-2 hover:bg-blue-500">Create new folder</a>
          <a href="#" className="px-4 py-2 hover:bg-blue-500">Scan File</a>
          <a href="#" className="px-4 py-2 hover:bg-blue-500">Files</a>
        </nav>
        <button className="mt-auto bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>

        {/* File Upload */}
        <div className="bg-white p-4 shadow rounded mb-4">
          <div className="flex space-x-2">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="border p-2 flex-1"
            />
            <input type="text" placeholder="Category" className="border p-2 flex-1" />
          </div>
          <button onClick={handleUpload} className="w-full bg-green-500 text-white py-2 mt-2 rounded">
            Upload
          </button>
        </div>

        {/* File Table */}
        <div className="bg-white p-4 shadow rounded">
          <input type="text" placeholder="Search files..." className="w-full p-2 border mb-4" />
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-2">Filename</th>
                <th className="p-2">Category</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{file.name}</td>
                  <td className="p-2">{file.category}</td>
                  <td className="p-2 flex space-x-2">
                    <button className="bg-teal-500 text-white px-3 py-1 rounded">Preview</button>
                    <button className="bg-green-500 text-white px-3 py-1 rounded">Download</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
