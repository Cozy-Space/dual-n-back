import { useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  callbackOnUndefined: () => void
) {
  const [value] = useState<T>(() => {
    const item = window.localStorage.getItem(key)
    if (item === null) {
      callbackOnUndefined()
      return undefined
    }
    return JSON.parse(item)
  })

  return [value] as const
}
