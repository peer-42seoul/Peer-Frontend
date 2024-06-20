'use client'

import { Typography, Stack, Container, Divider, Box } from '@mui/material'
import { IPostDetail } from '@/types/IPostDetail'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import useMedia from '@/hook/useMedia'
import RecruitQuickMenu from '@/app/recruit/[id]/panel/RecruitQuickMenu'
import RecruitInfo from './RecruitInfo'
import ApplyFormButton from '@/app/recruit/[id]/panel/ApplyFormButton'
import RecruitDetailContent from '@/app/recruit/[id]/panel/RecruitDetailContent'
import useHeaderStore from '@/states/useHeaderStore'
import UseNicknameStore from '@/states/useNicknameStore'
import useSWR from 'swr'
import useAuthStore from '@/states/useAuthStore'
import useAxiosWithAuth from '@/api/config'
import Tutorial from '@/components/Tutorial'
import RecruitPageTutorial from '@/components/tutorialContent/RecruitPageTutorial'

const RecruitDetailPage = ({
  data,
  id,
}: {
  data?: IPostDetail
  id: string
}) => {
  const [isClient, setIsClient] = useState(false)
  const [content, setCotent] = useState<IPostDetail | undefined>(data)
  const router = useRouter()
  const type = data?.type ?? 'PROJECT'
  const { isPc } = useMedia()
  const { setHeaderTitle } = useHeaderStore()
  const { nickname } = UseNicknameStore()
  const { isLogin } = useAuthStore()
  const axiosInstance = useAxiosWithAuth()

  const { data: favoriteData } = useSWR<boolean>(
    isLogin
      ? `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/recruit/favorite/${id}`
      : null,
    (url: string) => axiosInstance.get(url).then((res) => res.data),
  )

  //하이드레이션 오류 방지
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (data) {
      setHeaderTitle(data.teamName)
      setCotent(data)
    }
    return () => {
      setHeaderTitle('')
    }
  }, [data])

  const roleList = useMemo(() => {
    if (!content) return []
    return content.roleList.filter((role) => role.name !== 'Leader')
  }, [content])

  const me = nickname === content?.leader_nickname

  if (!content) return <Typography>데이터가 없습니다</Typography>

  /** PC 뷰 **/
  if (isPc) {
    return (
      <Container sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* 헤더 */}
        <Stack
          justifyContent={'space-between'}
          direction={'row'}
          marginTop={'2rem'}
          marginBottom={'1rem'}
        >
          <Typography
            variant={'Body2Emphasis'}
            onClick={() => router.back()}
            sx={{ cursor: 'pointer' }}
          >
            돌아가기
          </Typography>
          <RecruitQuickMenu
            recruit_id={parseInt(id)}
            favorite={favoriteData}
            title={content?.title}
            content={content?.content}
            status={content?.status}
            me={me}
          />
        </Stack>
        {/* 모집글 영역 */}
        <Stack direction={'row'}>
          <Stack width={'100%'}>
            {/*이미지, 제목, 프로필 영역*/}
            <RecruitInfo data={content} type={type} pc>
              {isClient && !me && (
                <Stack display={'flex'} direction={'row'} alignItems={'center'}>
                  <ApplyFormButton
                    roleList={roleList}
                    id={id}
                    type={type}
                    pc
                    data={content}
                    status={content.status}
                  />
                  <Box sx={{ marginTop: '2rem' }}>
                    <Tutorial
                      title="지원 방법"
                      content={<RecruitPageTutorial />}
                    />
                  </Box>
                </Stack>
              )}
            </RecruitInfo>
            {/* 모집 내용 */}
            <RecruitDetailContent
              data={content}
              type={type}
              roleList={roleList}
            />
          </Stack>
        </Stack>
      </Container>
    )
  }

  /** 모바일 뷰 **/
  return (
    <Stack height={'100%'} padding={'2.25rem'}>
      <Stack gap={'1.5rem'} width={'100%'}>
        <Stack>
          <RecruitQuickMenu
            recruit_id={parseInt(id)}
            favorite={favoriteData}
            title={content?.title}
            content={content?.content}
            me={me}
            status={content?.status}
          />
          <RecruitInfo data={content} type={type} />
        </Stack>
        <Divider />
        <RecruitDetailContent data={content} type={type} roleList={roleList} />
        {isClient && !me && (
          <ApplyFormButton
            id={id}
            type={type}
            roleList={roleList}
            data={content}
            status={content.status}
          />
        )}
      </Stack>
    </Stack>
  )
}

export default RecruitDetailPage
