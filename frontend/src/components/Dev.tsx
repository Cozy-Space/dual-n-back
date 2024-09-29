import { ReactNode } from 'react'

type Props = {
  values: Record<string, ReactNode>
}

export const Dev = ({ values }: Props) => {
  return (
    <div className=" text-green-800 bg-slate-900 bg-opacity-30 fixed left-0 top-0">
      {Object.entries(values).map(([key, value]) => (
        <div key={key} className="p-2">
          {key}: {value}
        </div>
      ))}
    </div>
  )
}
