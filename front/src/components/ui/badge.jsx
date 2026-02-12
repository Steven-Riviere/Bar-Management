import * as React from "react"

export const Badge = ({ active }) => {
  const color = active ? "bg-green-500 text-white" : "bg-gray-400 text-gray-800"
  const label = active ? "Actif" : "Inactif"

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  )
}
