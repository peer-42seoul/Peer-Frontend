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
import { Tag } from '@/types/IPostDetail'
import Image from 'next/image'
import React, { useMemo } from 'react'
import RecruitFormModal from './panel/RecruitFormModal'
import { useSearchParams } from 'next/navigation'
import RecruitFormText from './panel/RecruitFormText'
import useMedia from '@/hook/useMedia'
import ApplyButton from './panel/ApplyButton'
import LinkButton from './panel/LinkButton'

const RecruitDetailPage = ({ params }: { params: { id: string } }) => {
  const type = useSearchParams().get('type') ?? 'projects'
  const [open, setOpen] = React.useState(false)
  const [roleOpen, setRoleOpen] = React.useState(false)
  const [role, setRole] = React.useState<string>('')

  const { isPc } = useMedia()

  // const { data, isLoading, error } = useSWR<IPostDetail>(`/api/v1/recruit/${params.id}`, defaultGetFetcher);
  const data = useMemo(
    () => ({
      title: 'Software Engineer Position',
      status: '모집중',
      due: '1개월',
      content: `### We are looking for a skilled software engineer to join our team
        This is a great opportunity to work on exciting projects and collaborate with a talented team of developers.
        `,
      place: '온라인',
      user_id: 'user123', // 사용자 ID의 데이터 타입에 따라 변경
      region: 'Seoul, South Korea',
      link: 'https://example.com/job-posting',
      tagList: [{ tagName: 'JavaScript', tagColor: 'red' }],
      role: [
        { name: '프론트', number: 3 },
        { name: '백엔드', number: 1 },
      ],
      interviewList: [
        {
          question: 'Tell us about your experience with React.',
          type: 'text',
          optionList: [],
        },
        {
          question: 'How would you handle a project with tight deadlines?',
          type: 'multiple-choice',
          optionList: ['Prioritize tasks', 'Delegate', 'Work overtime'],
        },
      ],
    }),
    [],
  )

  const userData = {
    nickname: 'user123',
    profileUrl: 'https://picsum.photos/100/100',
  }

  const total = useMemo(() => {
    if (!data) return 0
    return data.role.reduce((acc, cur) => {
      return acc + cur.number
    }, 0)
  }, [data])

  const handleApply = (selectedRole: string) => {
    setRole(selectedRole)
    setRoleOpen(false)
    setOpen(true)
  }

  return (
    <>
      <RecruitFormModal
        open={open}
        setOpen={setOpen}
        post_id={params.id}
        role={role}
        user_id={data?.user_id}
      />
      {isPc ? (
        <Container>
          <Stack direction={'row'} gap={4} marginBottom={6}>
            <Image
              src={userData?.profileUrl}
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
                <Typography>{userData?.nickname}</Typography>
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
                role={data?.role?.map((item) => item.name) || []}
                onApply={handleApply}
              />
            </Box>
          </Stack>
          <RecruitFormText label="총 인원" content={total?.toString() ?? '0'} />
          <RecruitFormText label="목표 작업기간" content={data?.due} />
          <RecruitFormText label="지역" content={data?.region} />
          <RecruitFormText label="역할">
            <Box>
              {data?.role?.map(({ name, number }, idx: number) => (
                <Chip label={`${name} ${number} 명`} size="small" key={idx} />
              ))}
            </Box>
          </RecruitFormText>
          <RecruitFormText label="설명" content={data?.content} />
          <RecruitFormText label="태그">
            <Box>
              {data?.tagList?.map((tag: Tag, idx: number) => (
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
              {data?.role.map(({ name }) => (
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
            <Typography>{userData?.nickname}</Typography>
            <Typography>
              {type === 'project' ? '프로젝트' : '스터디'}
            </Typography>
            <Typography>{data?.place}</Typography>
          </Stack>
          <Image
            src={userData?.profileUrl}
            alt="leader_profile"
            width={300}
            height={300}
          />
          <RecruitFormText label="총 인원" content={total?.toString() ?? '0'} />
          <RecruitFormText label="목표 작업기간" content={data?.due} />
          <RecruitFormText label="지역" content={data?.region} />
          <RecruitFormText label="역할">
            <Box>
              {data?.role?.map(({ name, number }, idx: number) => (
                <Chip label={`${name} ${number} 명`} size="small" key={idx} />
              ))}
            </Box>
          </RecruitFormText>
          <RecruitFormText label="소통도구" content={data?.link} />
          <RecruitFormText label="설명" content={data?.content} />
          <RecruitFormText label="태그">
            <Box>
              {data?.tagList?.map((tag: Tag, idx: number) => (
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
              setRoleOpen(true)
            }}
          >
            {' '}
            지원하기
          </Button>
        </>
      )}
    </>
  )
}

export default RecruitDetailPage
