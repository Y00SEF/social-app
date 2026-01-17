import React from "react";

export default function PostCardSkeleton() {
  return (
    <>
      <div className="bg-white mt-10 rounded-xl shadow-md overflow-hidden border border-gray-200 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center gap-3 p-4">
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        </div>

        {/* Body Skeleton */}
        <div className="px-4 pb-4">
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
        </div>

        {/* Comment Section Skeleton */}
        <div className="flex items-start gap-3 px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <div className="bg-white rounded-lg px-3 py-2 shadow-sm flex-1">
            <div className="h-3 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>
    </>
  );
}

