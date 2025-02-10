import { useQuery } from '@tanstack/react-query'

export const useAdminPasswordQuery = (password: string) => {
  return useQuery({
    enabled: password.length > 0,
    retry: false,
    queryKey: ['adminPassword', password],
    queryFn: async () => {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch if password is correct')
      }

      return response.json() as unknown as boolean
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })
}
