'use client'

import { Typography, Stack, Container, Divider } from '@mui/material'
import { IPostDetail, ProjectType } from '@/types/IPostDetail'
import React, { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useMedia from '@/hook/useMedia'
import RecruitQuickMenu from '@/app/recruit/[id]/panel/RecruitQuickMenu'
import RecruitInfo from './RecruitInfo'
import ApplyFormButton from '@/app/recruit/[id]/panel/ApplyFormButton'
import RecruitDetailContent from '@/app/recruit/[id]/panel/RecruitDetailContent'
import DropdownMenu from '@/components/DropdownMenu'
import FavoriteButton from '@/components/FavoriteButton'
import ShareMenuItem from '@/components/dropdownMenu/ShareMenuItem'
import useHeaderStore from '@/states/useHeaderStore'
import UseNicknameStore from '@/states/useNicknameStore'
import useSWR from 'swr'
import useAuthStore from '@/states/useAuthStore'
import useAxiosWithAuth from '@/api/config'
import Tutorial from '@/components/Tutorial'
import RecruitPageTutorial from '@/components/tutorialContent/RecruitPageTutorial'

const RecruitDetailPage = ({ data, id }: { data: IPostDetail; id: string }) => {
  const [isClient, setIsClient] = useState(false)
  const path = usePathname()
  const router = useRouter()
  const type = (useSearchParams().get('type') as ProjectType) ?? 'PROJECT'
  const { isPc } = useMedia()
  const { setHeaderTitle } = useHeaderStore()
  const { nickname } = UseNicknameStore()
  const { isLogin } = useAuthStore()
  const axiosInstance = useAxiosWithAuth()

  const { data: favoriteData } = useSWR<boolean>(
    isLogin
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/favorite/${id}`
      : null,
    (url: string) => axiosInstance.get(url).then((res) => res.data),
  )

  //하이드레이션 오류 방지
  useEffect(() => {
    setIsClient(true)
  }, [])

  const roleList = useMemo(() => {
    if (!data) return []
    return data.roleList.filter((role) => role.name !== 'Leader')
  }, [data])

  useEffect(() => {
    if (data) {
      setHeaderTitle(data.teamName)
    }
    return () => {
      setHeaderTitle('')
    }
  }, [data])

  if (!data) return <Typography>데이터가 없습니다</Typography>

  /** PC 뷰 **/
  if (isPc) {
    return (
      <Container sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* 헤더 */}
        <Stack
          justifyContent={'flex-start'}
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
        </Stack>
        {/* 모집글 영역 */}
        <Stack direction={'row'}>
          <Stack width={'100%'}>
            {/*이미지, 제목, 프로필 영역*/}
            <RecruitInfo data={data} type={type} pc>
              {isClient && nickname !== data?.leader_nickname && (
                <Stack display={'flex'} direction={'row'} alignItems={'center'}>
                  <ApplyFormButton roleList={roleList} id={id} type={type} pc />
                  <Tutorial
                    title="지원 방법"
                    content={<RecruitPageTutorial />}
                  />
                </Stack>
              )}
            </RecruitInfo>
            {/* 모집 내용 */}
            <RecruitDetailContent data={data} type={type} roleList={roleList} />
          </Stack>
          {/* 퀵 메뉴 */}
          <RecruitQuickMenu
            recruit_id={parseInt(id)}
            favorite={favoriteData}
            title={data?.title}
            content={data?.content}
          />
        </Stack>
      </Container>
    )
  }

  /** 모바일 뷰 **/
  return (
    <Container>
      <Stack height={'100%'} padding={'1.5rem'}>
        <Stack flexDirection={'row'} justifyContent={'flex-end'}>
          <FavoriteButton
            favorite={favoriteData}
            recruit_id={parseInt(id)}
            redirect_url={`${path}?type=${type}`}
          />
          <DropdownMenu>
            <ShareMenuItem
              title={data?.title}
              url={`${path}?type=${type}`}
              content={data?.content}
              message={`피어에서 동료를 구해보세요! 이런 프로젝트가 있어요!`}
            />
          </DropdownMenu>
        </Stack>
        <Stack gap={'1.5rem'}>
          <RecruitInfo data={data} type={type} />
          <Divider />
          <RecruitDetailContent data={data} type={type} roleList={roleList} />
        </Stack>
        {isClient && nickname !== data?.leader_nickname && (
          <ApplyFormButton id={id} type={type} roleList={roleList} />
        )}
      </Stack>
    </Container>
  )
}

export default RecruitDetailPage
