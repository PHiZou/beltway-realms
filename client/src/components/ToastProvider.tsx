import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Toast = {
  id: string
  icon: string
  title: string
  body: string
  kind: 'achievement' | 'unlock' | 'milestone' | 'info'
}

type ToastContextValue = {
  toasts: Toast[]
  push: (toast: Omit<Toast, 'id'>) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

let nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push = useCallback((t: Omit<Toast, 'id'>) => {
    const id = `toast-${++nextId}`
    setToasts((prev) => [...prev, { ...t, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id))
    }, 4500)
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((x) => x.id !== id))
  }, [])

  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="br-toast-container" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`br-toast br-toast-${t.kind}`}>
            <span className="br-toast-icon">{t.icon}</span>
            <div className="br-toast-content">
              <span className="br-toast-title">{t.title}</span>
              <span className="br-toast-body">{t.body}</span>
            </div>
            <button
              type="button"
              className="br-toast-dismiss"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
            >
              {'\u00D7'}
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
