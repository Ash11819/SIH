import React from 'react';
import { Trophy, TrendingUp, Clock, CheckCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Department } from '../../types';
import { mockDepartments } from '../../data/mockData';

export const DepartmentLeaderboard: React.FC = () => {
  const sortedDepartments = [...mockDepartments].sort((a, b) => {
    const aScore = (a.performance.resolved / a.performance.totalAssigned) * 100;
    const bScore = (b.performance.resolved / b.performance.totalAssigned) * 100;
    return bScore - aScore;
  });

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <Trophy className="w-6 h-6 text-gray-400" />;
    if (index === 2) return <Trophy className="w-6 h-6 text-amber-600" />;
    return <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-white">{index + 1}</div>;
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-blue-600 bg-blue-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Department Leaderboard
        </h2>
        <p className="text-gray-600">Performance rankings based on issue resolution rates and response times</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Total Departments</p>
              <p className="text-xl font-bold text-blue-900">{mockDepartments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Issues Resolved</p>
              <p className="text-xl font-bold text-green-900">
                {mockDepartments.reduce((sum, dept) => sum + dept.performance.resolved, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-600 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-800">Avg Resolution</p>
              <p className="text-xl font-bold text-orange-900">
                {Math.round(mockDepartments.reduce((sum, dept) => sum + (dept.performance.resolved / dept.performance.totalAssigned * 100), 0) / mockDepartments.length)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-800">Avg Response</p>
              <p className="text-xl font-bold text-purple-900">
                {Math.round(mockDepartments.reduce((sum, dept) => sum + dept.performance.avgResponseTime, 0) / mockDepartments.length)}h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-4">
        {sortedDepartments.map((department, index) => {
          const resolutionRate = Math.round((department.performance.resolved / department.performance.totalAssigned) * 100);
          
          return (
            <motion.div
              key={department.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl border-2 p-6 transition-all duration-200 ${
                index === 0 ? 'border-yellow-200 shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getRankIcon(index)}
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{department.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {department.performance.avgResponseTime}h avg response
                      </span>
                      <div className="flex items-center">
                        {'★'.repeat(Math.floor(department.performance.rating))}
                        {'☆'.repeat(5 - Math.floor(department.performance.rating))}
                        <span className="ml-1 text-sm text-gray-600">({department.performance.rating})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getPerformanceColor(resolutionRate)}`}>
                    {resolutionRate}% Success Rate
                  </div>
                  <div className="text-sm text-gray-600">
                    {department.performance.resolved}/{department.performance.totalAssigned} resolved
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Resolution Progress</span>
                  <span className="text-xs text-gray-500">{department.performance.resolved}/{department.performance.totalAssigned}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${resolutionRate}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ backgroundColor: department.color }}
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
                <span>{department.contactInfo.email}</span>
                <span>{department.contactInfo.phone}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Achievement Badges */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">This Month's Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Fastest Response</p>
            <p className="text-sm text-gray-600">{sortedDepartments.reduce((prev, curr) => prev.performance.avgResponseTime < curr.performance.avgResponseTime ? prev : curr).name}</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Most Resolved</p>
            <p className="text-sm text-gray-600">{sortedDepartments.reduce((prev, curr) => prev.performance.resolved > curr.performance.resolved ? prev : curr).name}</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Best Rating</p>
            <p className="text-sm text-gray-600">{sortedDepartments.reduce((prev, curr) => prev.performance.rating > curr.performance.rating ? prev : curr).name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};