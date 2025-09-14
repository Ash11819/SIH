import React, { useState } from 'react';
import { MapPin, Filter, Search, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Issue, Department } from '../../types';
import { mockIssues, mockDepartments } from '../../data/mockData';

const categoryColors = {
  pothole: '#DC2626',
  sanitation: '#059669',
  streetlight: '#EA580C',
  water: '#0284C7',
  corruption: '#7C2D12',
  other: '#6B7280'
};

const statusColors = {
  reported: '#EF4444',
  assigned: '#F59E0B',
  'in-progress': '#3B82F6',
  resolved: '#10B981',
  closed: '#6B7280'
};

export const MapView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const filteredIssues = mockIssues.filter(issue => {
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', 'pothole', 'sanitation', 'streetlight', 'water', 'corruption', 'other'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Issue Map Dashboard</h2>
          <p className="text-gray-600">Real-time view of reported civic issues</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4" />
          <span>{filteredIssues.length} active issues</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 h-96 lg:h-[500px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"></div>
            <div className="text-center space-y-4 relative z-10">
              <MapPin className="w-16 h-16 text-blue-600 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800">Interactive Map</h3>
              <p className="text-gray-600 max-w-md">
                Map integration with Google Maps API will display all reported issues with clustering and filtering capabilities
              </p>
              {/* Mock pins */}
              <div className="absolute inset-0 pointer-events-none">
                {filteredIssues.slice(0, 5).map((issue, index) => (
                  <div
                    key={issue.id}
                    className="absolute w-4 h-4 rounded-full animate-pulse"
                    style={{
                      backgroundColor: categoryColors[issue.category],
                      top: `${20 + index * 15}%`,
                      left: `${30 + index * 10}%`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Issue Details Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Issues</h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {filteredIssues.map((issue) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedIssue(issue)}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: categoryColors[issue.category] }}
                    />
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      {issue.category}
                    </span>
                  </div>
                  <span
                    className="px-2 py-1 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: statusColors[issue.status] + '20',
                      color: statusColors[issue.status]
                    }}
                  >
                    {issue.status}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{issue.title}</h4>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{issue.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{issue.upvotes} upvotes</span>
                  <span>{new Date(issue.reportedAt).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Issue Modal */}
      {selectedIssue && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIssue(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">{selectedIssue.title}</h3>
              <button
                onClick={() => setSelectedIssue(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            {selectedIssue.images && selectedIssue.images.length > 0 && (
              <img
                src={selectedIssue.images[0]}
                alt="Issue"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Description:</span>
                <p className="text-gray-800 mt-1">{selectedIssue.description}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Location:</span>
                <p className="text-gray-800 mt-1">{selectedIssue.location.address}</p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm">
                  <span className="text-gray-500">Upvotes:</span>
                  <span className="ml-2 font-semibold text-blue-600">{selectedIssue.upvotes}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span
                    className="ml-2 px-2 py-1 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: statusColors[selectedIssue.status] + '20',
                      color: statusColors[selectedIssue.status]
                    }}
                  >
                    {selectedIssue.status}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};