'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useToast from '@/hook/useToast'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import ImageUploadButton from '@/components/ImageUploadButton'
import RowRadioButtonsGroup from '../[id]/edit/panel/radioGroup'
import SetTeamRole from '../[id]/edit/panel/SetTeamRole/SetTeamRole'
import TagAutoComplete from '../[id]/edit/panel/SetTeamTag/TagAutoComplete'
import BasicSelect, { ComponentType } from '../[id]/edit/panel/BasicSelect'
import SetInterview from '../[id]/edit/panel/SetInterview/SetInterview'
import SetCommunicationToolLink from '../[id]/edit/panel/SetCommunicationToolLink/SetCommunicationToolLink'
import SelectRegion from '../[id]/edit/panel/SelectRegion'
import { ITag } from '@/types/IPostDetail'
import useAxiosWithAuth from '@/api/config'
import useSWR from 'swr'
// import useAuthStore from '@/states/useAuthStore'

const dummyData1: ITag = {
  name: 'java',
  color: 'red',
}
const dummyData2: ITag = {
  name: 'spring',
  color: 'blue',
}
const dummyData3: ITag = {
  name: 'react',
  color: 'green',
}
const dummyDatas: ITag[] = [dummyData1, dummyData2, dummyData3]

export interface IRoleData {
  // types 로 병합예정
  role: string | null
  member: number
}

export interface IFormInterview {
  // 수정 및 types로 병합예정
  question: string
  type: string
  optionList?: string[]
  ratioList?: { max: string; valueOfMin: string; valueOfMax: string }
}

const CreateTeam = () => {
  const [title, setTitle] = useState<string>('')
  const [image, setImage] = useState<File[]>([])
  const [previewImage, setPreviewImage] = useState<string>(
    '/images/defaultImage.png',
  )
  const [name, setName] = useState<string>('')
  const [type, setType] = useState<string>('project')
  const [tagList, setTagList] = useState<ITag[]>([])
  const [region, setRegion] = useState<string[]>([])
  const [place, setPlace] = useState<string>('')
  const [due, setMonth] = useState<string>('')
  const [teamsize, setTeamsize] = useState<string>('')
  const [link, setCommunicationTool] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [roleList, setRoleList] = useState<IRoleData[]>([])
  const [interviewList, setInterviewList] = useState<IFormInterview[]>([])
  const [allTagList, setAllTagList] = useState<ITag[]>(dummyDatas)
  const [openBasicModal, setOpenBasicModal] = useState(false)
  const { CuToast, isOpen, openToast, closeToast } = useToast()
  const [toastMessage, setToastMessage] = useState<string>('')
  const router = useRouter()
  const axiosInstance = useAxiosWithAuth()
  // const { isLogin } = useAuthStore()

  // 로그인 하지 않고 모집글쓰기 들어왓을때 로그인 하러가기 안내가 필요합니다.
  // 새로운 공통컴포넌트 모달창을 만들면 효율적일듯합니다.
  // useEffect(() => {
  //   if (!isLogin) {
  //     setToastMessage('로그인이 필요합니다')
  //     openToast()
  //     router.push('/')
  //   }
  // }, [isLogin])

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/write`,
    (url: string) => axiosInstance.get(url).then((res) => res.data),
  )

  useEffect(() => {
    if (error) {
      console.log('error ocurred!!')
      setToastMessage('태그를 불러오는데 실패했습니다.')
      openToast()
    } else if (data) {
      console.log('tag fetching success', data)
      setAllTagList(data)
    }
  }, [data])

  const onHandlerFinish = async () => {
    if (type === 'project') {
      setRoleList([{ role: null, member: parseInt(teamsize) }])
    }
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/write`,
        {
          place,
          image,
          title,
          name,
          due,
          type,
          content,
          region,
          link,
          tagList,
          roleList,
          interviewList,
        },
      )
      router.push(`/recruit/${response.data}`) // 백엔드에서 리턴값으로 새로생긴 모집글의 id 를 던져줌
    } catch (error) {
      console.log(error)
      setToastMessage('모집글 작성 실패, 다시 시도해주세요')
      openToast()
    }
  }

  return (
    <>
      <Box>
        <Typography variant="h3">모집 글 쓰기</Typography>
        <Box>
          <ImageUploadButton
            setImage={setImage}
            setPreviewImage={setPreviewImage}
          >
            <Box>
              <Image
                src={previewImage}
                width={218}
                height={144}
                alt="Picture of the author"
              />
            </Box>
          </ImageUploadButton>
        </Box>
        <Box>
          <Typography variant="h6">모집글 제목</Typography>
          <TextField
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value as string)}
          />
        </Box>
        <Box>
          <Typography variant="h6">팀 이름</Typography>
          <TextField
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box>
          <Typography variant="h6">팀 분류</Typography>
          <RowRadioButtonsGroup setValue={setType} />
        </Box>
        {type === 'study' && (
          <Box>
            <Typography variant="h6">팀 인원</Typography>
            <BasicSelect
              type={ComponentType.TeamSize}
              value={teamsize}
              setValue={setTeamsize}
            />
          </Box>
        )}
        <Box>
          <Typography variant="h6">목표기간</Typography>
          <BasicSelect
            type={ComponentType.Month}
            value={due}
            setValue={setMonth}
          />
        </Box>
        <Box>
          <Typography variant="h6">지역</Typography>
          <SelectRegion setValue={setRegion} />
        </Box>
        <Box>
          <Typography variant="h6">활동방식</Typography>
          <BasicSelect
            type={ComponentType.Place}
            value={place}
            setValue={setPlace}
          />
        </Box>
        <Box>
          <Typography variant="h6">커뮤니케이션 툴 링크</Typography>
          <SetCommunicationToolLink setValue={setCommunicationTool} />
        </Box>
        <Stack>
          <Typography variant="h6" sx={{ paddingRight: '5px' }}>
            모집인원 인터뷰 등록하기
          </Typography>
          <Button variant="outlined" onClick={() => setOpenBasicModal(true)}>
            등록
          </Button>
          <SetInterview
            openBasicModal={openBasicModal}
            handleCloseBasicModal={() => setOpenBasicModal(false)}
            interviewData={interviewList}
            setInterviewData={setInterviewList}
          />
        </Stack>
        <Box>
          <Typography variant="h6">태그</Typography>
          {allTagList ? (
            <TagAutoComplete
              datas={tagList}
              setData={setTagList}
              allTagList={allTagList}
            />
          ) : null}
        </Box>
        {type === 'study' ? null : (
          <Box>
            <Typography variant="h6">팀 역할</Typography>
            <SetTeamRole roleData={roleList} setRoleData={setRoleList} />
          </Box>
        )}
        <Box>
          <Typography variant="h6">팀 소개</Typography>
          <TextField
            variant="outlined"
            sx={{ width: '80vw', height: 'auto' }}
            onChange={(e) => setContent(e.target.value as string)}
            multiline
          />
        </Box>
        <Button variant="contained" color="success" onClick={onHandlerFinish}>
          작성 완료
        </Button>
        <CuToast open={isOpen} onClose={closeToast} severity="error">
          <Typography>{toastMessage}</Typography>
        </CuToast>
      </Box>
    </>
  )
}

export default CreateTeam
