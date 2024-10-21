import { useQuery } from '@tanstack/react-query'
import { Block } from 'types'

export const useBlockQuery = (n: number) => {
  return useQuery({
    // n doesn't need to be in the query key, because we refetch manually (because sometimes n doesn't change, but we need to refetch nonetheless)
    queryKey: ['block'], // eslint-disable-line
    queryFn: async () => {
      return (
        await fetch('/api/dual_n_back.get?n=' + n)
      ).json() as unknown as Block
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })
}
