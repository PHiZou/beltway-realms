import { useEffect } from 'react'

const BASE = 'Beltway Realms'

export function usePageTitle(subtitle?: string) {
  useEffect(() => {
    document.title = subtitle ? `${subtitle} — ${BASE}` : BASE
    return () => {
      document.title = BASE
    }
  }, [subtitle])
}
