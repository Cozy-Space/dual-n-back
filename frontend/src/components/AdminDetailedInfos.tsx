import { DetailedInfos } from 'types'
import React from 'react'
import { Card } from './Card'

interface AdminDetailedInfosProps {
  className?: string | undefined
  detailedInfos: DetailedInfos
}

export function AdminDetailedInfos(props: AdminDetailedInfosProps) {
  return (
    <Card className="mt-4 border-blue-200 bg-blue-50 p-4" unleashWidth={true}>
      <div className="space-y-2 text-gray-700">
        <p>
          Experimentee ID:{' '}
          <span className="font-bold">
            {props.detailedInfos.experimenteeId}
          </span>
        </p>
        <p>
          Games Played:{' '}
          <span className="font-bold">{props.detailedInfos.dates.length}</span>
        </p>
        <p>
          Dates:{' '}
          <span className="font-bold">
            {props.detailedInfos.dates.join(', ')}
          </span>
        </p>
        <p>
          Average N:{' '}
          <span className="font-bold">{props.detailedInfos.averageN}</span>
        </p>
        <p>
          Average Highest N:{' '}
          <span className="font-bold">
            {props.detailedInfos.averageHighestN}
          </span>
        </p>
        <p>
          Highest N:{' '}
          <span className="font-bold">{props.detailedInfos.highestN}</span>
        </p>
      </div>
    </Card>
  )
}
