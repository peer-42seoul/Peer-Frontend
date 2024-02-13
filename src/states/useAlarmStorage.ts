import { create } from 'zustand'
import useAuthStore from './useAuthStore'
import axios from 'axios'

export enum AlarmType {
  ALL = 'ALL',
  SYSTEM = 'SYSTEM',
  MESSAGE = 'MESSAGE',
  TEAM = 'TEAM',
}

export interface IAlarm {
  title: string
  body: string
  redirectUrl: string
  issuedAt: string
  notificationId: number
  type: AlarmType
  iconUrl: string
  isEnd: boolean
}

interface IStoreAlarmState {
  isNew: boolean
  isNewAlarm: (isLogin: boolean) => void
  alarms: IAlarm[]
  getAlarms: () => void
  deleteAlarm: (id: number) => void
  deleteAllAlarms: (tabvalue: number) => void
}

const useAlarmStorage = create<IStoreAlarmState>((set) => {
  const accessToken = useAuthStore.getState().accessToken

  return {
    isNew: false,
    isNewAlarm: (isLogin: boolean) => {
      if (!isLogin) {
        return
      }
      axios
        .get(`${process.env.NEXT_PUBLIC_CSR_API}/api/v1/noti/summary`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            const newValue = res.data > 0 ? true : false
            console.log('isNewAlarm', newValue)
            set(() => ({ isNew: newValue }))
          } else if (res.status === 204) {
            set(() => ({ isNew: false }))
          }
        })
    },
    alarms: [],
    getAlarms: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/noti/spring?type=ALL&pgIdx=1&size=5`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        )
        if (res.status === 200) {
          set(() => ({ alarms: res.data }))
        }
      } catch (error) {
        console.error(error)
      }
    },
    deleteAlarm: (id: number) => {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/noti/spring/delete-target?notificationId=${id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        )
        .then((res) => {
          console.log('deleteAlarm', res)
          if (res.status === 200) {
            set((state) => ({
              alarms: state.alarms.filter(
                (alarm) => alarm.notificationId !== id,
              ),
            }))
          }
        })
    },
    deleteAllAlarms: (tabvalue) => {
      const type =
        tabvalue === 0
          ? AlarmType.ALL
          : tabvalue === 1
            ? AlarmType.MESSAGE
            : tabvalue === 2
              ? AlarmType.TEAM
              : AlarmType.SYSTEM

      axios
        .delete(
          `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/noti/spring/delete-all?type=${type}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        )
        .then((res) => {
          console.log('deleteAllAlarms', res)
          if (res.status === 200) {
            set(() => ({ alarms: [] }))
          }
        })
    },
  }
})

export default useAlarmStorage
