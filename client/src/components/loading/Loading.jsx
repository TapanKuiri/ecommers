import React from 'react'
import { assets } from '../../assets/assets'

export const Loading = () => {
  return (
    <div> 
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {[1, 2, 3, 4, 5, 6,7,8].map((i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center border rounded-lg p-4 h-48 bg-gray-50 shadow-sm"
                      >
                        <img
                          src={assets.spinner}
                          alt="Loading..."
                          className="w-10 h-10 animate-spin"
                        />
                        <p className="text-xs text-gray-400 mt-2">Loading...</p>
                      </div>
                    ))}
                  </div>
    </div>
  )
}
