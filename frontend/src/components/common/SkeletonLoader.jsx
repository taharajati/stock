import React from 'react';

// Skeleton for table rows
export const TableSkeleton = ({ rows = 5, columns = 6 }) => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex items-center space-x-4 py-3 border-b border-gray-200">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className={`h-4 bg-gray-200 rounded ${
                colIndex === 0 ? 'w-24' : 
                colIndex === 1 ? 'w-32' : 
                colIndex === 2 ? 'w-20' : 
                colIndex === 3 ? 'w-28' : 
                colIndex === 4 ? 'w-24' : 'w-20'
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Skeleton for chart loading
export const ChartSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
      <div className="flex justify-between">
        <div className="h-3 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-24"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
};

// Skeleton for card loading
export const CardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  );
};

// Skeleton for filter sidebar
export const FilterSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border">
            <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Skeleton for news/announcements
export const NewsSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg p-4 border">
          <div className="flex items-start space-x-3">
            <div className="w-16 h-12 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 