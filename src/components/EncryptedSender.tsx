import useAxiosWithAuth from '@/api/config'
import { getToken } from '@/api/jwtToken'
import { EApiType } from '@/types/EApiType'
import axios from 'axios'
import React, { useCallback, useEffect } from 'react'

const EncryptedSender = ({
  children,
  payload,
  setData,
  apiType,
  setPayload,
  setIsLoading,
  needToken = false,
}: {
  children: React.ReactNode
  payload: any
  setData: (data: { code: string }) => void
  apiType: EApiType
  setPayload: (payload: any) => void
  setIsLoading?: (isLoading: boolean) => void
  needToken?: boolean
}) => {
  const axiosWithAuth = useAxiosWithAuth()

  const getStatus = async (payload: any) => {
    if (!payload) {
      return
    }

    const { initSecret, initCode }: { initSecret: string; initCode: string } =
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/main/init`)
        .then((res) => {
          return {
            initSecret: res.data.secret,
            initCode: res.data.code,
          }
        })

    const initToken = await getToken({ apiType: apiType }, initSecret)

    const { verifyCode, verifySeed } = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/main/get`, {
        code: initCode,
        token: initToken,
      })
      .then((res) => {
        return {
          verifyCode: res.data.code,
          verifySeed: res.data.seed,
        }
      })

    const payloadToken = await getToken(payload, verifySeed)

    if (!needToken) {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/main/receive`, {
          code: verifyCode,
          token: payloadToken,
        })
        .then((res) => {
          setData(res.data)
        })
    } else {
      await axiosWithAuth
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/main/receive`, {
          code: verifyCode,
          token: payloadToken,
        })
        .then((res) => {
          setData(res.data)
        })
    }
  }

  const apiSend = useCallback(async () => {
    try {
      if (!payload) {
        return
      }
      if (setIsLoading) setIsLoading(true)
      await getStatus(payload)
      if (setIsLoading) setIsLoading(false)
    } catch (e) {
      console.log(e)
      if (setIsLoading) setIsLoading(false)
      setPayload(null)
    }
  }, [payload])

  useEffect(() => {
    apiSend()
  }, [apiSend])

  return <>{children}</>
}

export default EncryptedSender
