'use client'

import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Drawer,
  ListItem,
  ListItemButton,
  List,
  Container,
  Avatar,
} from '@mui/material'
import { IPostDetail, ITag } from '@/types/IPostDetail'
import React from 'react'
import RecruitFormModal from './panel/form/RecruitFormModal'
import { useRouter, useSearchParams } from 'next/navigation'
import useMedia from '@/hook/useMedia'
import ApplyButton from './panel/ApplyButton'
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

const RecruitDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const type = (useSearchParams().get('type') as ProjectType) ?? 'PROJECT'
  const [open, setOpen] = React.useState(false)
  const [roleOpen, setRoleOpen] = React.useState(false)
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

  console.log('Data', data)
  // const total = useMemo(() => {
  //   if (!data) return 0
  //   return data?.roleList?.reduce((acc, cur) => {
  //     return acc + cur.number
  //   }, 0)
  // }, [data])

  const handleApply = (selectedRole: string | null) => {
    if (!isLogin) router.push(currentUrl)
    else {
      setRole(selectedRole)
      setRoleOpen(false)
      setOpen(true)
    }
  }

  if (isLoading) return <Typography>로딩중...</Typography>
  if (error) return <Typography>에러 발생</Typography>
  if (!data) return <Typography>데이터가 없습니다</Typography>

  // pc뷰
  if (isPc) {
    return (
      <>
        <RecruitFormModal
          open={open}
          setOpen={setOpen}
          recruit_id={params.id}
          role={role}
          setRoleOpen={setRoleOpen}
        />

        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
          {/*돌아가기 버튼*/}
          <Stack justifyContent={'flex-start'} direction={'row'}>
            <Button
              onClick={() => router.back()}
              variant={'text'}
              sx={{ color: 'text.strong' }}
            >
              돌아가기
            </Button>
          </Stack>
          {/* 모집글 영역 */}
          <Stack direction={'row'}>
            <Stack width={'100%'}>
              {/*이미지, 제목, 프로필 영역*/}
              <Stack direction={'row'} gap={4} marginBottom={6}>
                <Box
                  src={data?.image ?? ''}
                  alt="leader_profile"
                  width={240}
                  height={160}
                  component={'img'}
                />
                <Box display="flex" flexDirection="column" gap={2}>
                  <Stack gap={2} direction="row" alignItems={'center'}>
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
                    <Typography color={'yellow.strong'} variant={'caption'}>
                      {data?.status}
                    </Typography>
                  </Stack>
                  <Stack gap={2} direction="row" alignItems={'center'}>
                    <Avatar
                      alt="avatar"
                      src={data?.leader_image}
                      sizes={'small'}
                    />
                    <Typography variant={'Body2'}>{data?.teamName}</Typography>
                    <LinkButton href={data?.link} variant={'contained'} />
                  </Stack>
                  {data?.roleList?.length ? (
                    <ApplyButton
                      role={data?.roleList?.map((item) => item.name)}
                      onApply={handleApply}
                    />
                  ) : (
                    <Button
                      id="apply-button"
                      variant="contained"
                      size="large"
                      onClick={() => handleApply(null)}
                    >
                      지원하기
                    </Button>
                  )}
                </Box>
              </Stack>
              {/* 모집 내용 */}
              <Stack gap={2}>
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
                  <Box>
                    {type === 'PROJECT' ? (
                      data?.roleList.length ? (
                        data?.roleList?.map(({ name, number }, idx: number) => (
                          <Typography
                            key={idx}
                          >{`${name} ${number} 명`}</Typography>
                        ))
                      ) : (
                        <Typography>-</Typography>
                      )
                    ) : (
                      <Typography>{(data?.totalNumber ?? 0) + '명'}</Typography>
                    )}
                  </Box>
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
                    <Typography>
                      {data.region[0] + ' ' + data.region?.[1]}
                    </Typography>
                  ) : (
                    <Typography>없음</Typography>
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

  // 모바일 뷰
  return (
    <>
      <RecruitFormModal
        open={open}
        setOpen={setOpen}
        recruit_id={params.id}
        role={role}
        setRoleOpen={setRoleOpen}
      />
      <Drawer
        anchor={'bottom'}
        open={roleOpen}
        onClose={() => setRoleOpen(false)}
        sx={{ zIndex: 1500 }}
      >
        <List>
          {data?.roleList.map(({ name }) => (
            <ListItem key={name}>
              <ListItemButton onClick={() => handleApply(name)}>
                {name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
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
            src={data?.image ?? ''}
            alt="leader_profile"
            width={240}
            height={160}
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
              {data?.roleList?.map(({ name, number }, idx: number) => (
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
          {data?.roleList?.length ? (
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => {
                if (!isLogin) router.push(currentUrl)
                else setRoleOpen(true)
              }}
            >
              지원하기
            </Button>
          ) : (
            <Button
              id="apply-button"
              variant="contained"
              size="large"
              onClick={() => handleApply(null)}
            >
              지원하기
            </Button>
          )}
        </Stack>
      </Container>
    </>
  )
}

export default RecruitDetailPage
