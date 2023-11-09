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
} from '@mui/material'
import { IPostDetail, ITag } from '@/types/IPostDetail'
import Image from 'next/image'
import React, { useMemo } from 'react'
import RecruitFormModal from './panel/RecruitFormModal'
import { useRouter, useSearchParams } from 'next/navigation'
import RecruitFormText from './panel/RecruitFormText'
import useMedia from '@/hook/useMedia'
import ApplyButton from './panel/ApplyButton'
import LinkButton from './panel/LinkButton'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'
import useAuthStore from '@/states/useAuthStore'
import useAxiosWithAuth from '@/api/config'

const RecruitDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const type = useSearchParams().get('type') ?? 'projects'
  const [open, setOpen] = React.useState(false)
  const [roleOpen, setRoleOpen] = React.useState(false)
  const [role, setRole] = React.useState<string>('')

  const { isPc } = useMedia()
  const { isLogin } = useAuthStore()
  const axiosInstance = useAxiosWithAuth()

  const { data, isLoading, error } = useSWR<IPostDetail>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/${params.id}`,
    isLogin
      ? (url: string) => axiosInstance.get(url).then((res) => res.data)
      : defaultGetFetcher,
  )

  const total = useMemo(() => {
    if (!data) return 0
    return data?.roleList?.reduce((acc, cur) => {
      return acc + cur.number
    }, 0)
  }, [data])

  const handleApply = (selectedRole: string) => {
    if (!isLogin) router.push('/login')
    else {
      setRole(selectedRole)
      setRoleOpen(false)
      setOpen(true)
    }
  }

  if (isLoading) return <Typography>로딩중...</Typography>
  if (error) return <Typography>에러 발생</Typography>
  if (!data) return <Typography>데이터가 없습니다</Typography>

  return (
    <>
      <RecruitFormModal
        open={open}
        setOpen={setOpen}
        recruit_id={params.id}
        role={role}
        user_id={data?.user_id}
      />
      {isPc ? (
        <Container>
          <Stack direction={'row'} gap={4} marginBottom={6}>
            <Image
              src={data?.user_thumbnail ?? ''}
              alt="leader_profile"
              width={300}
              height={300}
            />
            <Box display="flex" flexDirection="column" gap={2}>
              <Stack gap={2} direction="row">
                <Typography variant="h5">{data?.title}</Typography>
                <Chip label={data?.status} size="medium" />
              </Stack>
              <Stack gap={2} direction="row">
                <Typography>{data?.user_nickname}</Typography>
                <Typography>
                  {type === 'project' ? '프로젝트' : '스터디'}
                </Typography>
                <Typography>{data?.place}</Typography>
              </Stack>
              <Stack gap={2} direction="row">
                <Button
                  variant="contained"
                  size="large"
                  href="/my-page/message"
                >
                  쪽지
                </Button>
                <LinkButton href={data?.link} />
              </Stack>
              <ApplyButton
                role={data?.roleList?.map((item) => item.name) || []}
                onApply={handleApply}
              />
            </Box>
          </Stack>
          <RecruitFormText
            label="총 인원"
            content={(total?.toString() ?? '0') + ' 명'}
          />
          <RecruitFormText label="목표 작업기간" content={data?.due} />
          <RecruitFormText label="지역">
            {data?.region ? (
              <Typography>{data.region[0] + ' ' + data.region?.[1]}</Typography>
            ) : (
              <Typography>없음</Typography>
            )}
          </RecruitFormText>
          <RecruitFormText label="역할">
            <Box>
              {data?.roleList?.map(({ name, number }, idx: number) => (
                <Chip label={`${name} ${number} 명`} size="small" key={idx} />
              ))}
            </Box>
          </RecruitFormText>
          <RecruitFormText label="설명" content={data?.content} />
          <RecruitFormText label="태그">
            <Box>
              {data?.tagList?.map((tag: ITag, idx: number) => (
                <Chip
                  label={tag?.tagName}
                  size="small"
                  key={idx}
                  sx={{ backgroundColor: tag?.tagColor }}
                />
              ))}
            </Box>
          </RecruitFormText>
        </Container>
      ) : (
        <>
          <Drawer
            anchor={'bottom'}
            open={roleOpen}
            onClose={() => setRoleOpen(false)}
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
          <Typography variant="h5">{data?.title}</Typography>
          <Chip label={data?.status} size="medium" />
          <Stack gap={2} direction="row">
            <Typography>{data?.user_nickname}</Typography>
            <Typography>
              {type === 'project' ? '프로젝트' : '스터디'}
            </Typography>
            <Typography>{data?.place}</Typography>
          </Stack>
          <Image
            src={data?.user_thumbnail ?? ''}
            alt="leader_profile"
            width={300}
            height={300}
          />
          <RecruitFormText
            label="총 인원"
            content={(total?.toString() ?? '0') + ' 명'}
          />
          <RecruitFormText label="목표 작업기간" content={data?.due} />
          <RecruitFormText label="지역" content={data?.region} />
          <RecruitFormText label="역할">
            <Box>
              {data?.roleList?.map(({ name, number }, idx: number) => (
                <Chip label={`${name} ${number} 명`} size="small" key={idx} />
              ))}
            </Box>
          </RecruitFormText>
          <RecruitFormText label="소통도구" content={data?.link} />
          <RecruitFormText label="설명" content={data?.content} />
          <RecruitFormText label="태그">
            <Box>
              {data?.tagList?.map((tag: ITag, idx: number) => (
                <Chip
                  label={tag?.tagName}
                  size="small"
                  key={idx}
                  sx={{ backgroundColor: tag?.tagColor }}
                />
              ))}
            </Box>
          </RecruitFormText>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={() => {
              if (!isLogin) router.push('/login')
              else setRoleOpen(true)
            }}
          >
            지원하기
          </Button>
        </>
      )}
    </>
  )
}

export default RecruitDetailPage
