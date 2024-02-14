import { Socket } from 'socket.io-client'
import { create } from 'zustand'

interface ISocket {
  socket: Socket | null
  initSocket: () => void
  resetSocket: () => void
  resetEvent: () => void
}

const useSocket = create<ISocket>((set) => ({
  socket: null,
  initSocket: () => {
    console.log('initSocket')
    set({ socket: null })
  },
  resetSocket: () => set({ socket: null }),
  resetEvent: () => set({ socket: null }),
}))

export default useSocket
