import { useQuery } from '@tanstack/react-query'
import { Config } from 'types'

export const useConfigQuery = () => {
  return useQuery({
    queryKey: ['config'],
    queryFn: async () => {
      return (await fetch('/api/config/get')).json() as unknown as Config
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })
}
