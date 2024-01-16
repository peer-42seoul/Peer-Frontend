'use client'

import { Typography, Stack, Container, Divider } from '@mui/material'
import { IPostDetail, ProjectType } from '@/types/IPostDetail'
import React, { useMemo } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import useMedia from '@/hook/useMedia'
import RecruitQuickMenu from '@/app/recruit/[id]/panel/RecruitQuickMenu'
import RecruitInfo from './RecruitInfo'
import ApplyFormButton from '@/app/recruit/[id]/panel/ApplyFormButton'
import RecruitDetailContent from '@/app/recruit/[id]/panel/RecruitDetailContent'
import DropdownMenu from '@/components/DropdownMenu'
import FavoriteButton from '@/components/FavoriteButton'

const RecruitDetailPage = ({ data, id }: { data: IPostDetail; id: string }) => {
  const type = (useSearchParams().get('type') as ProjectType) ?? 'PROJECT'
  const { isPc } = useMedia()
  const path = usePathname()

  const roleList = useMemo(() => {
    if (!data) return []
    return data.roleList.filter((role) => role.name !== 'Leader')
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
          marginBottom={'2rem'}
        >
          <Typography variant={'Body2Emphasis'}>모집글 보기</Typography>
        </Stack>
        {/* 모집글 영역 */}
        <Stack direction={'row'}>
          <Stack width={'100%'}>
            {/*이미지, 제목, 프로필 영역*/}
            <RecruitInfo data={data} type={type} pc>
              <ApplyFormButton roleList={roleList} id={id} type={type} pc />
            </RecruitInfo>
            {/* 모집 내용 */}
            <RecruitDetailContent data={data} type={type} roleList={roleList} />
          </Stack>
          {/* 퀵 메뉴 */}
          <RecruitQuickMenu
            recruit_id={parseInt(id)}
            favorite={data?.favorite}
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
            favorite={data?.favorite}
            recruit_id={parseInt(id)}
            redirect_url={`${path}?type=${type}`}
          />
          <DropdownMenu
            title={data?.title}
            url={`${path}?type=${type}`}
            content={data?.content}
          />
        </Stack>
        <Stack gap={'1.5rem'}>
          <RecruitInfo data={data} type={type} />
          <Divider />
          <RecruitDetailContent data={data} type={type} roleList={roleList} />
        </Stack>
        <ApplyFormButton id={id} type={type} roleList={roleList} />
      </Stack>
    </Container>
  )
}

export default RecruitDetailPage
