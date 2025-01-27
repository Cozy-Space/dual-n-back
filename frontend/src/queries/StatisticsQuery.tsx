import { useQuery } from '@tanstack/react-query'
import { FullStatistics } from 'types'

export const useStatisticsQuery = (statistics: FullStatistics | null) => {
  return useQuery({
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: statistics !== null,
    queryKey: ['statistics', statistics],
    queryFn: async () => {
      const response = await fetch('/api/statistics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ statistics })
      })
      if (!response.ok) {
        throw new Error('Failed to fetch userId')
      }
      return response.ok
    }
  })
}
