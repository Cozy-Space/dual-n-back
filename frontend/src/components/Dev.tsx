import { ReactNode } from 'react'

type Props = {
  values: Record<string, ReactNode>
}

export const Dev = ({ values }: Props) => {
  return (
    <div className={'bg-slate-900/30 text-green-800'}>
      {Object.entries(values).map(([key, value]) => (
        <div key={key} className="p-2">
          {key}: {value}
        </div>
      ))}
    </div>
  )
}

export const DevText = ({
  text,
  truthy
}: {
  text?: string | undefined
  truthy: boolean
}) => {
  if (truthy) {
    return (
      <span className={'bg-green-100 px-1 text-green-800'}>
        {text ?? 'yes'}
      </span>
    )
  } else {
    return (
      <span className={'bg-red-100 px-1 text-red-800'}>{text ?? 'no'}</span>
    )
  }
}
