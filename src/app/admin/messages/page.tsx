"use client";

import { useState, useEffect } from 'react';
import { MessageEditor } from '@/components/admin/MessageEditor';

interface MessageFile {
  name: string;
  path: string;
  locale: string;
  keys: number;
  lastModified: string;
}

interface MessageData {
  [key: string]: any;
}

export default function MessagesPage() {
  const [messageFiles, setMessageFiles] = useState<MessageFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [messageData, setMessageData] = useState<MessageData>({});
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);

  // Load available message files
  useEffect(() => {
    const loadMessageFiles = async () => {
      try {
        const response = await fetch('/api/admin/messages/files');
        const files = await response.json();
        setMessageFiles(files);
      } catch (error) {
        console.error('Error loading message files:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessageFiles();
  }, []);

  // Load message data for selected file
  const loadMessageData = async (filePath: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/messages/data?file=${encodeURIComponent(filePath)}`);
      const data = await response.json();
      setMessageData(data);
      setSelectedFile(filePath);
      setShowEditor(false);
    } catch (error) {
      console.error('Error loading message data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save message data
  const saveMessageData = async (data: MessageData) => {
    if (!selectedFile) return;

    try {
      const response = await fetch('/api/admin/messages/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: selectedFile,
          data: data,
        }),
      });

      if (response.ok) {
        setMessageData(data);
        setShowEditor(false);
        // Reload the file list to update last modified times
        const filesResponse = await fetch('/api/admin/messages/files');
        const files = await filesResponse.json();
        setMessageFiles(files);
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving message data:', error);
      alert('Failed to save changes. Please try again.');
      throw error;
    }
  };


  // Flatten nested object for table display
  const flattenObject = (obj: any, prefix = ''): Array<{ key: string; value: string; type: string }> => {
    const result: Array<{ key: string; value: string; type: string }> = [];
    
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        result.push(...flattenObject(value, fullKey));
      } else {
        result.push({
          key: fullKey,
          value: String(value),
          type: typeof value,
        });
      }
    }
    
    return result.sort((a, b) => a.key.localeCompare(b.key));
  };

  const flattenedData = flattenObject(messageData);

  return (
    <div className="admin-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Message Management</h1>
        <p className="text-gray-600">Edit translations and localized content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File Browser */}
        <div className="lg:col-span-1">
          <div className="admin-card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Message Files</h2>
            
            {loading && !selectedFile ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">Loading files...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {messageFiles.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => loadMessageData(file.path)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedFile === file.path
                        ? 'border-primary-600 bg-primary-50 text-primary-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{file.name}</div>
                        <div className="text-sm text-gray-500">{file.locale}</div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>{file.keys} keys</div>
                        <div>{file.lastModified}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Editor */}
        <div className="lg:col-span-2">
          {selectedFile ? (
            showEditor ? (
              <MessageEditor
                filePath={selectedFile}
                initialData={messageData}
                onSave={saveMessageData}
                onCancel={() => setShowEditor(false)}
              />
            ) : (
              <div className="admin-card">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {messageFiles.find(f => f.path === selectedFile)?.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {messageFiles.find(f => f.path === selectedFile)?.locale} • {flattenedData.length} keys
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowEditor(true)}
                      className="admin-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => loadMessageData(selectedFile)}
                      className="admin-button admin-button-secondary"
                    >
                      Refresh
                    </button>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="text-sm text-gray-500 mt-2">Loading content...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Key</th>
                          <th>Value</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {flattenedData.map((item) => (
                          <tr key={item.key}>
                            <td className="font-mono text-sm text-gray-600">
                              {item.key}
                            </td>
                            <td>
                              <span className="text-gray-900">{item.value}</span>
                            </td>
                            <td>
                              <span className="admin-badge admin-badge-success">
                                {item.type}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="admin-card">
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Message File</h3>
                <p className="text-gray-500">Choose a file from the list to view and edit its content</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="admin-button admin-button-secondary">
            Export All Messages
          </button>
          <button className="admin-button admin-button-secondary">
            Import Messages
          </button>
          <button className="admin-button admin-button-secondary">
            Validate Translations
          </button>
          <button className="admin-button admin-button-secondary">
            Find Missing Keys
          </button>
        </div>
      </div>
    </div>
  );
}
