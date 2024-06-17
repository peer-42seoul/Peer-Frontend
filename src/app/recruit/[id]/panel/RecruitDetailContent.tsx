import { Grid, Stack, Typography } from '@mui/material'
import RecruitContentText from '@/app/recruit/[id]/panel/RecruitContentText'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { IPostDetail, IRole, ITag, ProjectType } from '@/types/IPostDetail'
import TagChip from '@/components/TagChip'
import React from 'react'
import DynamicToastViewer from '@/components/DynamicToastViewer'
import * as style from '@/app/recruit/write/page.style'
import * as Icon from '@/icons'
import DateRangeIcon from '@mui/icons-material/DateRange'
import dayjs from 'dayjs'

const RecruitDetailContent = ({
  data,
  type,
  roleList,
}: {
  data: IPostDetail
  type: ProjectType
  roleList: IRole[]
}) => {
  return (
    <>
      <Grid container rowGap={'1.5rem'}>
        <RecruitContentText
          label="팀명"
          content={data?.teamName}
          icon={<PersonOutlineOutlinedIcon />}
        />
        <RecruitContentText
          label={type === 'PROJECT' ? '역할' : '인원'}
          icon={
            <Icon.TwoPeopleIcon
              sx={{ ...style.iconStyleBase, color: 'text.normal' }}
            />
          }
        >
          <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
            {type === 'STUDY' ? (
              <Typography
                variant={'Body2'}
                color={'text.alternative'}
              >{`${data?.current}/${data?.totalNumber} 명`}</Typography>
            ) : (
              roleList?.map(({ name, number, current }, idx: number) => (
                <Typography
                  variant={'Body2'}
                  color={'text.alternative'}
                  key={idx}
                >{`${name} ${current}/${number} 명`}</Typography>
              ))
            )}
          </Stack>
        </RecruitContentText>
        <RecruitContentText
          label="활동방식"
          content={data?.place}
          icon={
            <Icon.WifiIcon
              sx={{ ...style.iconStyleBase, color: 'text.normal' }}
            />
          }
        />
        <RecruitContentText
          icon={
            <Icon.PieChartIcon
              sx={{ ...style.iconStyleBase, color: 'text.normal' }}
            />
          }
          label="목표기간"
          content={data?.due}
        />
        <RecruitContentText
          label="지역"
          icon={
            <Icon.LocationIcon
              sx={{ ...style.iconStyleBase, color: 'text.normal' }}
            />
          }
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
          label="관련 태그"
          icon={
            <Icon.TagIcon
              sx={{ ...style.iconStyleBase, color: 'text.normal' }}
            />
          }
        >
          <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
            {data?.tagList?.map((tag: ITag, idx: number) => (
              <TagChip name={tag?.name} key={idx} color={tag?.color} />
            ))}
          </Stack>
        </RecruitContentText>
        <RecruitContentText
          label="작성일"
          icon={<DateRangeIcon fontSize={'small'} />}
          content={dayjs(data?.updatedAt).format('YYYY-MM-DD HH:mm')}
        />
      </Grid>
      <Stack marginY={'1.5rem'}>
        <RecruitContentText
          label="설명"
          icon={
            <Icon.FileIcon
              sx={{ ...style.iconStyleBase, color: 'text.normal' }}
            />
          }
        >
          <DynamicToastViewer initialValue={data?.content} />
        </RecruitContentText>
      </Stack>
    </>
  )
}

export default RecruitDetailContent
