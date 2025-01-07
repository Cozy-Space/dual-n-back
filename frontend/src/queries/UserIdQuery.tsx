import { useQuery } from '@tanstack/react-query'

export const useUserIdQuery = (userId: string | null) => {
  return useQuery({
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: userId !== null,
    queryKey: ['userId', userId],
    queryFn: async () => {
      const response = await fetch('/api/userid.post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      })
      if (!response.ok) {
        throw new Error('Failed to fetch userId')
      }
      return response.json() as unknown as { filename: string }
    }
  })
}
