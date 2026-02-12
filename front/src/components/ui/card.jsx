import * as React from "react"

export const Card = ({ className, children }) => {
  return (
    <div className={`bg-white shadow-md rounded-md p-4 relative ${className}`}>
      {children}
    </div>
  )
}

export const CardHeader = ({ children }) => <div className="mb-2">{children}</div>
export const CardContent = ({ children }) => <div className="mb-2">{children}</div>
export const CardFooter = ({ children }) => <div className="flex gap-2 mt-2">{children}</div>
