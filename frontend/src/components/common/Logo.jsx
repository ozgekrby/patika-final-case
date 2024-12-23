import React from 'react'

export default function Logo ({ className, fill }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" className={`${className}`}>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
            fontFamily="Arial, sans-serif" fontSize="48" fill={`${fill}`} fontWeight="800">
        OK Commerce
      </text>
    </svg>
  )
}