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
}: {
  children: React.ReactNode
  payload: any
  setData: (data: { code: string }) => void
  apiType: EApiType
  setPayload: (payload: any) => void
  setIsLoading?: (isLoading: boolean) => void
}) => {
  const axiosWithAuth = useAxiosWithAuth()

  const getStatus = async ({
    payload,
    setData,
    apiType,
  }: {
    apiType: EApiType
    payload: any
    setData: (data: any) => void
  }) => {
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

    await axiosWithAuth
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/main/receive`, {
        code: verifyCode,
        token: payloadToken,
      })
      .then((res) => {
        console.log(res)
        setData(res.data)
      })
  }

  const apiSend = useCallback(async () => {
    try {
      if (!payload) {
        return
      }
      if (setIsLoading) setIsLoading(true)
      await getStatus({ payload, setData, apiType })
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
