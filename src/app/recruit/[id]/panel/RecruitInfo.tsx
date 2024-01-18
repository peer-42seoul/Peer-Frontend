import { Avatar, Box, Stack, Typography } from '@mui/material'
import LinkButton from '@/app/recruit/[id]/panel/LinkButton'
import React from 'react'
import { IPostDetail, ProjectType } from '@/types/IPostDetail'
import {
  RecruitImage,
  RecruitTitle,
  TypeChip,
} from '@/app/recruit/[id]/panel/RecruitInfoElement'

interface RecruitInfoProps {
  data: IPostDetail
  type: ProjectType
  children?: React.ReactNode
  pc?: boolean
}

const RecruitInfo = ({ data, type, children, pc }: RecruitInfoProps) => {
  if (pc)
    return (
      <>
        <Stack direction={'row'} gap={4} marginBottom={6}>
          <RecruitImage
            image={data?.image}
            width={'18.5rem'}
            height={'12.5rem'}
          />
          <Box display="flex" flexDirection="column" gap={2}>
            <Stack gap={'1rem'} direction="row" alignItems={'center'}>
              <TypeChip type={type} />
              <RecruitTitle title={data?.title} status={data?.status} />
            </Stack>
            <Stack gap={'1rem'} direction="row" alignItems={'center'}>
              <Avatar alt="avatar" src={data?.leader_image} sizes={'small'} />
              <Typography variant={'Body2'}>{data?.teamName}</Typography>
              <LinkButton href={data?.link} variant={'contained'} />
            </Stack>
            {/*지원 버튼*/}
            {children}
          </Box>
        </Stack>
      </>
    )

  return (
    <>
      <Stack gap={'1.5rem'}>
        <Stack gap={'0.25rem'}>
          <div>
            <TypeChip type={type} />
          </div>
          <RecruitTitle title={data?.title} status={data?.status} />
        </Stack>
        <Stack alignItems={'center'}>
          <RecruitImage image={data?.image} width={'100%'} height={'12.5rem'} />
        </Stack>
        <Stack
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Stack flexDirection={'row'} alignItems={'center'} gap={'0.5rem'}>
            <Avatar alt="avatar" src={data?.leader_image} sizes={'small'} />
            <Typography variant={'Body2'}>{data?.teamName}</Typography>
          </Stack>
          <LinkButton href={data?.link} variant={'contained'} />
        </Stack>
        {/*지원 버튼*/}
        {children}
      </Stack>
    </>
  )
}

export default RecruitInfo
