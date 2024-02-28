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
  onSuccess,
  onError,
  axiosOption,
}: {
  children: React.ReactNode
  payload: any
  setData?: (data: any) => void
  apiType: EApiType
  setPayload: (payload: any) => void
  setIsLoading?: (isLoading: boolean) => void
  needToken?: boolean
  onSuccess?: () => void
  onError?: (message: string) => void
  axiosOption?: any
}) => {
  const axiosWithAuth = useAxiosWithAuth()

  const getStatus = async (payload: any) => {
    if (!payload) {
      return
    }

    const { initSecret, initCode }: { initSecret: string; initCode: string } =
      await axios
        .get(`${process.env.NEXT_PUBLIC_CSR_API}/api/v1/main/init`)
        .then((res) => {
          return {
            initSecret: res.data.secret,
            initCode: res.data.code,
          }
        })

    const initToken = await getToken({ apiType: apiType }, initSecret)

    const { verifyCode, verifySeed } = await axios
      .post(`${process.env.NEXT_PUBLIC_CSR_API}/api/v1/main/get`, {
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
        .post(
          `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/main/receive`,
          {
            code: verifyCode,
            token: payloadToken,
          },
          axiosOption,
        )
        .then((res) => {
          if (setData) setData(res.data ?? null)
        })
    } else {
      await axiosWithAuth
        .post(
          `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/main/receive`,
          {
            code: verifyCode,
            token: payloadToken,
          },
          axiosOption,
        )
        .then((res) => {
          if (setData) setData(res.data ?? null)
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
      if (onSuccess) onSuccess()
      if (setIsLoading) setIsLoading(false)
    } catch (e: any) {
      if (onError) {
        onError(e?.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.')
      }
      if (setIsLoading) setIsLoading(false)
      setPayload(null)
    }
  }, [payload])

  useEffect(() => {
    apiSend()

    return () => {
      setPayload(null)
      if (setData) setData(null)
    }
  }, [apiSend])

  return <>{children}</>
}

export default EncryptedSender
