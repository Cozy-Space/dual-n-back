import React, { useMemo, useState } from 'react'
import { Card } from './Card'
import { Infos } from 'types'
import { useAdminInfosQuery } from '../queries/UseAdminInfosQuery'

interface AdminDashboardProps {
  className?: string | undefined
  password: string
}

export function AdminDashboard(props: AdminDashboardProps) {
  const [searchId, setSearchId] = useState('')
  const [details, setDetails] = useState<string | null>(null)
  const { data: adminInfosData } = useAdminInfosQuery(props.password)

  const totalPersons = useMemo<number | undefined>(() => {
    if (!adminInfosData) return undefined
    return (adminInfosData as unknown as Infos).totalPersons
  }, [adminInfosData])
  const totalRecords = useMemo<number | undefined>(() => {
    if (!adminInfosData) return undefined
    return (adminInfosData as unknown as Infos).totalRecords
  }, [adminInfosData])
  const averageN = useMemo<number | undefined>(() => {
    if (!adminInfosData) return undefined
    return (adminInfosData as unknown as Infos).averageN
  }, [adminInfosData])
  const averageHighestN = useMemo<number | undefined>(() => {
    if (!adminInfosData) return undefined
    return (adminInfosData as unknown as Infos).averageHighestN
  }, [adminInfosData])
  const mockDatabase: Record<string, string> = {
    '1': 'Person 1: Details about person 1.',
    '2': 'Person 2: Details about person 2.',
    '3': 'Person 3: Details about person 3.'
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDetails(mockDatabase[searchId] || 'No details found for this ID.')
  }

  return (
    <div className="grid w-full max-w-3xl gap-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-xl font-bold">Total Persons</h3>
          <p className="mt-2 text-2xl">{totalPersons}</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-xl font-bold">Total Records</h3>
          <p className="mt-2 text-2xl">{totalRecords}</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-xl font-bold">Average N</h3>
          <p className="mt-2 text-2xl">{averageN}</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-xl font-bold">Average Highest N</h3>
          <p className="mt-2 text-2xl">{averageHighestN}</p>
        </Card>
      </div>

      {/* Search Section */}
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Search by ID</h2>
        <form onSubmit={handleSearch} className={'flex gap-4'}>
          <input
            placeholder="Enter ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className={'flex-1 rounded-md bg-blue-100 p-2'}
          />
          <button
            type={'submit'}
            className={
              'rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600'
            }
          >
            Search
          </button>
        </form>
        {details && (
          <div className="mt-4 rounded-lg bg-blue-50 p-4">
            <h3 className="font-semibold">Details:</h3>
            <p>{details}</p>
          </div>
        )}
      </div>
    </div>
  )
}
