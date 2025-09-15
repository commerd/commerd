"use client";

import { useState, useEffect, useCallback } from 'react';

interface MessageEditorProps {
  filePath: string;
  initialData: Record<string, any>;
  onSave: (data: Record<string, any>) => Promise<void>;
  onCancel: () => void;
}

interface FlattenedItem {
  key: string;
  value: string;
  type: string;
  level: number;
}

export function MessageEditor({ filePath, initialData, onSave, onCancel }: MessageEditorProps) {
  const [data, setData] = useState<Record<string, any>>(initialData);
  const [flattenedData, setFlattenedData] = useState<FlattenedItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<FlattenedItem[]>([]);
  const [saving, setSaving] = useState(false);

  // Flatten the data for editing
  useEffect(() => {
    const flattened = flattenObject(data);
    setFlattenedData(flattened);
    setFilteredData(flattened);
  }, [data, flattenObject]);

  // Filter data based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(flattenedData);
    } else {
      const filtered = flattenedData.filter(item =>
        item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, flattenedData]);

  const flattenObject = useCallback((obj: any, prefix = '', level = 0): FlattenedItem[] => {
    const result: FlattenedItem[] = [];
    
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        result.push(...flattenObject(value, fullKey, level + 1));
      } else {
        result.push({
          key: fullKey,
          value: String(value),
          type: typeof value,
          level,
        });
      }
    }
    
    return result.sort((a, b) => a.key.localeCompare(b.key));
  }, []);

  const updateKey = (keyPath: string, value: string) => {
    const keys = keyPath.split('.');
    const newData = { ...data };
    
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setData(newData);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(data);
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  const getIndentClass = (level: number) => {
    return `ml-${level * 4}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {filePath.split('/').pop()?.replace('.json', '')}
          </h2>
          <p className="text-sm text-gray-500">
            {flattenedData.length} keys • {filteredData.length} visible
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="admin-button"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={onCancel}
            className="admin-button admin-button-secondary"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="admin-form-group">
        <label className="admin-label">Search</label>
        <input
          type="text"
          placeholder="Search keys or values..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-input"
        />
      </div>

      {/* Editor Table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-1/3">Key</th>
                <th className="w-2/3">Value</th>
                <th className="w-20">Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.key}>
                  <td className="font-mono text-sm text-gray-600">
                    <div className={getIndentClass(item.level)}>
                      {item.key}
                    </div>
                  </td>
                  <td>
                    {item.type === 'string' && item.value.length > 50 ? (
                      <textarea
                        value={item.value}
                        onChange={(e) => updateKey(item.key, e.target.value)}
                        className="admin-textarea min-h-[60px]"
                        rows={3}
                      />
                    ) : (
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => updateKey(item.key, e.target.value)}
                        className="admin-input"
                      />
                    )}
                  </td>
                  <td>
                    <span className={`admin-badge ${
                      item.type === 'string' ? 'admin-badge-success' :
                      item.type === 'number' ? 'admin-badge-warning' :
                      'admin-badge-error'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-500">No results found for &quot;{searchTerm}&quot;</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="admin-card">
          <h3 className="font-semibold text-gray-900 mb-2">Total Keys</h3>
          <p className="text-2xl font-bold text-primary-600">{flattenedData.length}</p>
        </div>
        <div className="admin-card">
          <h3 className="font-semibold text-gray-900 mb-2">String Values</h3>
          <p className="text-2xl font-bold text-green-600">
            {flattenedData.filter(item => item.type === 'string').length}
          </p>
        </div>
        <div className="admin-card">
          <h3 className="font-semibold text-gray-900 mb-2">Other Types</h3>
          <p className="text-2xl font-bold text-orange-600">
            {flattenedData.filter(item => item.type !== 'string').length}
          </p>
        </div>
      </div>
    </div>
  );
}
