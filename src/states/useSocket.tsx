import { Socket } from 'socket.io-client'
import { create } from 'zustand'

interface ISocket {
  socket: Socket | null
  setSocket: (socket: Socket) => void
  resetSocket: () => void
}

const useSocket = create<ISocket>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => set({ socket: socket }),
  resetSocket: () => set({ socket: null }),
}))

export default useSocket
