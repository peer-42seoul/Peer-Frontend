'use client'

import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Container,
  Avatar,
} from '@mui/material'
import { IPostDetail, IRole, ITag } from '@/types/IPostDetail'
import React, { useMemo } from 'react'
import RecruitFormModal from './panel/form/RecruitFormModal'
import { useRouter, useSearchParams } from 'next/navigation'
import useMedia from '@/hook/useMedia'
import ApplyMenuButton from './panel/ApplyMenuButton'
import LinkButton from './panel/LinkButton'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'
import useAuthStore from '@/states/useAuthStore'
import useAxiosWithAuth from '@/api/config'
import { ProjectType } from '@/app/panel/MainPage'
import RecruitQuickMenu from '@/app/recruit/[id]/panel/RecruitQuickMenu'
import RecruitContentText from '@/app/recruit/[id]/panel/RecruitContentText'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined'
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import TagChip from '@/components/TagChip'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Link from 'next/link'
import ApplyDrawerButton from '@/app/recruit/[id]/panel/ApplyDrawerButton'
import ApplyButton from '@/app/recruit/[id]/panel/ApplyButton'

const RecruitDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const type = (useSearchParams().get('type') as ProjectType) ?? 'PROJECT'
  const [open, setOpen] = React.useState(false)
  const [role, setRole] = React.useState<string | null>(null)
  const { isPc } = useMedia()
  const { isLogin } = useAuthStore()
  const axiosInstance = useAxiosWithAuth()
  const currentUrl = '/login?redirect=/recruit/1?type=' + type
  const { data, isLoading, error } = useSWR<IPostDetail>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/${params.id}`,
    isLogin
      ? (url: string) => axiosInstance.get(url).then((res) => res.data)
      : defaultGetFetcher,
  )

  const roleList = useMemo(() => {
    if (!data) return []
    return data.roleList.filter((role) => role.name !== 'Leader')
  }, [data])

  const handleApply = (selectedRole: string | null) => {
    if (!isLogin) router.push(currentUrl)
    else {
      setRole(selectedRole)
      setOpen(true)
    }
  }

  const checkIsFull = useMemo(
    () => roleList?.some((role: IRole) => role?.current >= role?.number),
    [roleList],
  )

  if (isLoading) return <Typography>로딩중...</Typography>
  if (error) return <Typography>에러 발생</Typography>
  if (!data) return <Typography>데이터가 없습니다</Typography>

  /** PC 뷰 **/
  if (isPc) {
    return (
      <>
        <RecruitFormModal
          open={open}
          setOpen={setOpen}
          recruit_id={params.id}
          role={role}
        />
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
          {/*돌아가기 버튼*/}
          <Stack
            justifyContent={'flex-start'}
            direction={'row'}
            marginBottom={'2rem'}
          >
            <Link href={'/'}>
              <Button variant={'text'} sx={{ color: 'text.strong' }}>
                돌아가기
              </Button>
            </Link>
          </Stack>
          {/* 모집글 영역 */}
          <Stack direction={'row'}>
            <Stack width={'100%'}>
              {/*이미지, 제목, 프로필 영역*/}
              <Stack direction={'row'} gap={4} marginBottom={6}>
                <Box
                  src={data?.image}
                  alt="main_image"
                  width={'18.5rem'}
                  height={'12.5rem'}
                  component={'img'}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
                <Box display="flex" flexDirection="column" gap={2}>
                  <Stack gap={'1rem'} direction="row" alignItems={'center'}>
                    <Chip
                      label={type === 'STUDY' ? '스터디' : '프로젝트'}
                      size="medium"
                      sx={{
                        backgroundColor: 'background.tertiary',
                        borderRadius: 2,
                        color: 'green.normal',
                      }}
                    />
                    <Typography variant={'Title3'}>{data?.title}</Typography>
                    <Typography color={'yellow.strong'} variant={'Caption'}>
                      {data?.status === 'ONGOING'
                        ? '모집중'
                        : data?.status === 'BEFORE'
                          ? '모집전'
                          : '모집완료'}
                    </Typography>
                  </Stack>
                  <Stack gap={'1rem'} direction="row" alignItems={'center'}>
                    <Avatar
                      alt="avatar"
                      src={data?.leader_image}
                      sizes={'small'}
                    />
                    <Typography variant={'Body2'}>{data?.teamName}</Typography>
                    <LinkButton href={data?.link} variant={'contained'} />
                  </Stack>
                  {type === 'PROJECT' && roleList?.length ? (
                    <ApplyMenuButton
                      roleList={roleList}
                      onApply={handleApply}
                      disabled={checkIsFull}
                    />
                  ) : (
                    <ApplyButton
                      handleApply={handleApply}
                      disabled={checkIsFull}
                      sx={{ width: '6.785rem', marginTop: '2rem' }}
                    />
                  )}
                </Box>
              </Stack>
              {/* 모집 내용 */}
              <Stack gap={'1.5rem'}>
                <RecruitContentText
                  label="작성자"
                  content={
                    data?.leader_nickname
                      ? data.leader_nickname
                      : '존재하지 않는 유저'
                  }
                  icon={<PersonOutlineOutlinedIcon />}
                />
                <RecruitContentText
                  label={type === 'PROJECT' ? '역할' : '인원'}
                  icon={<HowToRegOutlinedIcon />}
                >
                  <div>
                    {roleList.length ? (
                      roleList?.map(({ name, number, current }, idx: number) =>
                        type === 'PROJECT' ? (
                          <Typography
                            variant={'Body2'}
                            color={'text.alternative'}
                            key={idx}
                          >{`${name} ${current}/${number} 명`}</Typography>
                        ) : (
                          name === 'STUDY' && (
                            <Typography
                              variant={'Body2'}
                              color={'text.alternative'}
                              key={idx}
                            >{`${current}/${number} 명`}</Typography>
                          )
                        ),
                      )
                    ) : (
                      <Typography>-</Typography>
                    )}
                  </div>
                </RecruitContentText>
                <RecruitContentText
                  label="활동방식"
                  content={data?.place}
                  icon={<WifiOutlinedIcon />}
                />
                <RecruitContentText
                  icon={<AccessTimeOutlinedIcon />}
                  label="목표기간"
                  content={data?.due}
                />
                <RecruitContentText
                  label="지역"
                  icon={<LocationOnOutlinedIcon />}
                >
                  {data?.region ? (
                    <Typography variant={'Body2'} color={'text.alternative'}>
                      {data.region[0] + ' ' + data.region?.[1]}
                    </Typography>
                  ) : (
                    <Typography variant={'Body2'} color={'text.alternative'}>
                      없음
                    </Typography>
                  )}
                </RecruitContentText>
                <RecruitContentText
                  label="기술스택"
                  icon={<LocalOfferOutlinedIcon />}
                >
                  <Stack direction={'row'} gap={1}>
                    {data?.tagList?.map((tag: ITag, idx: number) => (
                      <TagChip name={tag?.name} key={idx} color={tag?.color} />
                    ))}
                  </Stack>
                </RecruitContentText>
                <RecruitContentText
                  label="설명"
                  content={data?.content}
                  icon={<DescriptionOutlinedIcon />}
                />
              </Stack>
            </Stack>
            {/* 퀵 메뉴 */}
            <RecruitQuickMenu
              recruit_id={parseInt(params.id)}
              favorite={data?.favorite}
            />
          </Stack>
        </Container>
      </>
    )
  }

  /** 모바일 뷰 **/
  return (
    <>
      <RecruitFormModal
        open={open}
        setOpen={setOpen}
        recruit_id={params.id}
        role={role}
      />
      <Container>
        <Stack gap={1}>
          <Box>
            <Typography variant="h6" fontWeight={'bold'}>
              {data?.title}
            </Typography>
            <Chip label={data?.status} size="medium" />
            <Stack gap={2} direction="row">
              <Typography>{data?.leader_nickname}</Typography>
              <Typography>
                {type === 'PROJECT' ? '프로젝트' : '스터디'}
              </Typography>
              <Typography>{data?.place}</Typography>
            </Stack>
          </Box>
          <Box
            src={data?.image}
            alt="leader_profile"
            width={300}
            height={300}
            component={'img'}
          />
          <RecruitContentText label="목표 작업기간" content={data?.due} />
          <RecruitContentText label="지역">
            {data?.region ? (
              <Typography>{data.region[0] + ' ' + data.region?.[1]}</Typography>
            ) : (
              <Typography>없음</Typography>
            )}
          </RecruitContentText>
          <RecruitContentText label="역할">
            <Box>
              {roleList?.map(({ name, number }, idx: number) => (
                <Chip label={`${name} ${number} 명`} size="small" key={idx} />
              ))}
            </Box>
          </RecruitContentText>
          <RecruitContentText label="소통도구">
            <LinkButton href={data?.link} variant={'text'} />
          </RecruitContentText>
          <RecruitContentText label="설명" content={data?.content} />
          <RecruitContentText label="태그">
            <Stack direction={'row'} gap={1}>
              {data?.tagList?.map((tag: ITag, idx: number) => (
                <TagChip name={tag?.name} key={idx} color={tag?.color} />
              ))}
            </Stack>
          </RecruitContentText>
          {/*역할이 없을 경우 처리*/}
          {type === 'PROJECT' && roleList?.length ? (
            <ApplyDrawerButton
              handleApply={handleApply}
              roleList={roleList}
              disabled={checkIsFull}
            />
          ) : (
            <ApplyButton handleApply={handleApply} disabled={checkIsFull} />
          )}
        </Stack>
      </Container>
    </>
  )
}

export default RecruitDetailPage
