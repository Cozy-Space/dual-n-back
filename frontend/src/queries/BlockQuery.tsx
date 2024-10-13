import { useQuery } from '@tanstack/react-query'
import { Block } from 'types'

export const useBlockQuery = (n: number) => {
  return useQuery({
    // n doesn't need to be in the query key, because we refetch manually (because sometimes n doesn't change)
    queryKey: ['block'], // eslint-disable-line
    queryFn: async () => {
      console.log('fetching block')
      return (
        await fetch('/api/dual_n_back.get?n=' + n)
      ).json() as unknown as Block
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })
}
