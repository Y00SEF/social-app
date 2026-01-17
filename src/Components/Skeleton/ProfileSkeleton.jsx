import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="max-w-2xl mx-auto my-10 p-5 font-sans animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-32 mb-7"></div>

      {/* User Data Skeleton */}
      <div className="bg-gray-50 rounded-lg p-7 shadow-md border border-gray-200">
        <div className="flex items-center gap-5 mb-7 pb-5 border-b-2 border-gray-200">
          <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-gray-100"></div>
          <div className="flex-1">
            <div className="h-6 bg-gray-300 rounded w-48 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex flex-col gap-2">
              <div className="h-3 bg-gray-300 rounded w-20"></div>
              <div className="h-5 bg-gray-200 rounded w-40"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Posts Section Skeleton */}
      <div className="mt-10">
        <div className="h-8 bg-gray-300 rounded w-32 mb-5"></div>
        <div className="space-y-6">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
                {/* Post Image Skeleton */}
               <div className="w-full h-80 bg-gray-200"></div>
               
               {/* Post Content Skeleton */} 
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                 <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                 <div className="h-3 bg-gray-300 rounded w-24 mb-4"></div>
                 
                   {/* Post Stats Skeleton */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                   <div className="flex-1 flex justify-center"><div className="w-10 h-4 bg-gray-200 rounded"></div></div>
                   <div className="flex-1 flex justify-center border-l border-r border-gray-200"><div className="w-10 h-4 bg-gray-200 rounded"></div></div>
                   <div className="flex-1 flex justify-center"><div className="w-10 h-4 bg-gray-200 rounded"></div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
