import { useQuery } from '@tanstack/react-query'
import { Block } from 'types'

export const useBlockQuery = (n: number) => {
  return useQuery({
    queryKey: ['block', n],
    queryFn: async () => {
      return (
        await fetch('/api/dual_n_back.get?n=' + n)
      ).json() as unknown as Block
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })
}
