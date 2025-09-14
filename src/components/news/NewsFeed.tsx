import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { NewsItem } from '../../types';
import { mockNews } from '../../data/mockData';

const typeColors = {
  resolution: 'bg-green-100 text-green-800',
  announcement: 'bg-blue-100 text-blue-800',
  appreciation: 'bg-purple-100 text-purple-800'
};

const typeIcons = {
  resolution: '✅',
  announcement: '📢',
  appreciation: '👏'
};

export const NewsFeed: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredNews = selectedType === 'all' 
    ? mockNews 
    : mockNews.filter(item => item.type === selectedType);

  const types = ['all', 'resolution', 'announcement', 'appreciation'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Community News Feed</h2>
          <p className="text-gray-600">Stay updated with the latest civic developments and achievements</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedType === type
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Items */}
      <div className="max-w-3xl mx-auto space-y-6">
        {filteredNews.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Article Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{typeIcons[item.type]}</div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[item.type]}`}>
                      {item.type}
                    </span>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(item.publishedAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                {item.title}
              </h3>

              {item.image && (
                <div className="mb-4 -mx-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <p className="text-gray-700 leading-relaxed mb-4">
                {item.content}
              </p>

              {/* Department Tag */}
              {item.departmentId && (
                <div className="flex items-center mb-4">
                  <Tag className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">
                    by {item.departmentId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-medium">Like</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Comment</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
                  >
                    <Share className="w-5 h-5" />
                    <span className="text-sm font-medium">Share</span>
                  </motion.button>
                </div>

                <div className="text-sm text-gray-500">
                  {Math.floor(Math.random() * 50) + 10} interactions
                </div>
              </div>
            </div>
          </motion.article>
        ))}

        {/* No Results */}
        {filteredNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <MessageCircle className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No news items found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later.</p>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredNews.length > 0 && (
          <div className="text-center pt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
            >
              Load More News
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};