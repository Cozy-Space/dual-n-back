import { useQuery } from '@tanstack/react-query'
import { DetailedInfos } from 'types'

export const useAdminDetailedInfosQuery = (
  password: string,
  experimenteeId: string
) => {
  return useQuery({
    retry: false,
    queryKey: ['adminDetailedInfo', password, experimenteeId],
    queryFn: async () => {
      const params = new URLSearchParams({
        password,
        experimenteeId
      })

      const response = await fetch(
        '/api/admin/detailedInfos?' + params.toString(),
        { method: 'GET' }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch if password is correct')
      }

      return response.json() as unknown as DetailedInfos
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })
}
