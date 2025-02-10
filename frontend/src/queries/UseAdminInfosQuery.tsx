import { useQuery } from '@tanstack/react-query'
import { Infos } from 'types'

export const useAdminInfosQuery = (password: string) => {
  return useQuery({
    retry: false,
    queryKey: ['adminInfo', password],
    queryFn: async () => {
      const response = await fetch('/api/admin/infos?password=' + password, {
        method: 'GET'
      })

      if (!response.ok) {
        throw new Error('Failed to fetch if password is correct')
      }

      return response.json() as unknown as Infos
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })
}
