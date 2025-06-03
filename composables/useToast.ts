import { ref } from 'vue'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  timeout?: number
}

const toasts = ref<Toast[]>([])
let nextId = 1

export const useToast = () => {
  const addToast = (message: string, type: Toast['type'] = 'info', timeout = 3000) => {
    const id = nextId++
    const toast: Toast = {
      id,
      message,
      type,
      timeout
    }
    
    toasts.value.push(toast)
    
    if (timeout > 0) {
      setTimeout(() => {
        removeToast(id)
      }, timeout)
    }
    
    return id
  }
  
  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  const success = (message: string, timeout?: number) => addToast(message, 'success', timeout)
  const error = (message: string, timeout?: number) => addToast(message, 'error', timeout)
  const info = (message: string, timeout?: number) => addToast(message, 'info', timeout)
  
  return {
    toasts,
    success,
    error,
    info,
    removeToast
  }
} 