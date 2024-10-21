import { Reaction } from 'types'
import { useQuery } from '@tanstack/react-query'

export const useNQuery = (
  n: number,
  reactions: Reaction[],
  enabled: boolean
) => {
  return useQuery({
    enabled: enabled,
    queryKey: ['user_reaction', n, JSON.stringify(reactions)],
    queryFn: async () => {
      const response = await fetch('/api/user_reaction.post?n=' + n, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reactions })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch new n')
      }

      return response.json() as unknown as number
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })
}
