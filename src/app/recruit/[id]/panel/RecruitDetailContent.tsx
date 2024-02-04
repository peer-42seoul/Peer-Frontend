import { Stack, Typography } from '@mui/material'
import RecruitContentText from '@/app/recruit/[id]/panel/RecruitContentText'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined'
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import { IPostDetail, IRole, ITag, ProjectType } from '@/types/IPostDetail'
import TagChip from '@/components/TagChip'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import React from 'react'

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
    <Stack gap={'1.5rem'}>
      <RecruitContentText
        label="작성자"
        content={
          data?.leader_nickname ? data.leader_nickname : '존재하지 않는 유저'
        }
        icon={<PersonOutlineOutlinedIcon />}
      />
      <RecruitContentText
        label={type === 'PROJECT' ? '역할' : '인원'}
        icon={<HowToRegOutlinedIcon />}
      >
        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
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
        </Stack>
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
      <RecruitContentText label="지역" icon={<LocationOnOutlinedIcon />}>
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
      <RecruitContentText label="기술스택" icon={<LocalOfferOutlinedIcon />}>
        <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
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
  )
}

export default RecruitDetailContent
