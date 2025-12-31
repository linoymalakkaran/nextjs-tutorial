import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Types
interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

interface TaskStore {
  tasks: Task[]
  addTask: (title: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  clearCompleted: () => void
}

// Zustand store with persistence
export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      
      addTask: (title: string) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Math.random().toString(36).substring(7),
              title,
              completed: false,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      
      toggleTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      
      deleteTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      
      clearCompleted: () =>
        set((state) => ({
          tasks: state.tasks.filter((task) => !task.completed),
        })),
    }),
    {
      name: 'task-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// User preferences store
interface UserStore {
  theme: 'light' | 'dark' | 'system'
  notifications: boolean
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  toggleNotifications: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      theme: 'system',
      notifications: true,
      
      setTheme: (theme) => set({ theme }),
      toggleNotifications: () =>
        set((state) => ({ notifications: !state.notifications })),
    }),
    {
      name: 'user-preferences',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// Counter store (simple example)
interface CounterStore {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
