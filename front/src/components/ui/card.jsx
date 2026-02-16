import * as React from "react"

export const Card = ({ className, children }) => {
  return (
    <div className={`bg-white rounded-lg p-4 relative 
      border border-gray-200
      shadow-[6px_6px_12px_rgba(0,0,0,0.08)]
      hover:shadow-[10px_10px_20px_rgba(0,0,0,0.12)]
      hover:-translate-y-0.5
      transition-all duration-200
      ${className}`}>

      {children}
    </div>
  )
}

export const CardHeader = ({ children }) => <div className="mb-2">{children}</div>
export const CardContent = ({ children }) => <div className="mb-2">{children}</div>
export const CardFooter = ({ children }) => <div className="flex gap-2 mt-2">{children}</div>
