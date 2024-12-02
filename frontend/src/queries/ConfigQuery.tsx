import { useQuery } from '@tanstack/react-query'
import { DayConfig } from 'types'

export const useConfigQuery = () => {
  return useQuery({
    queryKey: ['config'],
    queryFn: async () => {
      return (await fetch('/api/config/get')).json() as unknown as DayConfig
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })
}
