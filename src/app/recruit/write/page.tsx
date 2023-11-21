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
import { IFormInterview, IRoleData, ITag } from '@/types/IPostDetail'
import useAxiosWithAuth from '@/api/config'
import useSWR from 'swr'
import axios from 'axios'

// react-base64-image.js
const convertImageToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]) // Base64 데이터에서 실제 데이터 부분만 추출
      } else {
        reject(new Error('Unexpected result type'))
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}

const CreateTeam = () => {
  const [title, setTitle] = useState<string>('')
  const [image, setImage] = useState<File[]>([])
  const [previewImage, setPreviewImage] = useState<string>(
    '/images/defaultImage.png',
  )
  const [name, setName] = useState<string>('')
  const [type, setType] = useState<string>('PROJECT')
  const [tagList, setTagList] = useState<ITag[]>([])
  const [region, setRegion] = useState<string[]>([])
  const [place, setPlace] = useState<string>('')
  const [due, setMonth] = useState<string>('')
  const [teamsize, setTeamsize] = useState<string>('')
  const [link, setCommunicationTool] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [roleList, setRoleList] = useState<IRoleData[]>([])
  const [interviewList, setInterviewList] = useState<IFormInterview[]>([])
  const [allTagList, setAllTagList] = useState<ITag[]>()
  const [openBasicModal, setOpenBasicModal] = useState(false)
  const { CuToast, isOpen, openToast, closeToast } = useToast()
  const [toastMessage, setToastMessage] = useState<string>('')
  const router = useRouter()
  const axiosInstance = useAxiosWithAuth()
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/allTags`,
    (url: string) => axios.get(url).then((res) => res.data),
  )

  useEffect(() => {
    if (error) {
      setToastMessage('태그를 불러오는데 실패했습니다.')
      openToast()
    } else if (data) {
      setAllTagList(data)
    }
  }, [data])

  const onHandlerFinish = async () => {
    if (type === 'project') {
      setRoleList([{ role: null, member: parseInt(teamsize) }])
    }
    if (
      !image ||
      !title ||
      !name ||
      !due ||
      !region ||
      !place ||
      !link ||
      !tagList ||
      !roleList ||
      !interviewList ||
      !content
    ) {
      alert('빈칸을 모두 채워주세요')
      return
    }
    const base64Data = await convertImageToBase64(image[0])
    setSelectedImage(base64Data)
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/write`,
        {
          place: place,
          image: selectedImage,
          title: title,
          name: name,
          due: due,
          type: type,
          content: content,
          region: region,
          link: link,
          tagList: tagList,
          roleList: roleList,
          interviewList: interviewList,
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
            onChange={(e) => {
              if (e.target.value.length > 20)
                setTitle(e.target.value.slice(0, 20) as string)
              else setTitle(e.target.value as string)
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6">팀 이름</Typography>
          <TextField
            sx={{ width: '80vw' }}
            variant="outlined"
            value={name}
            onChange={(e) => {
              if (e.target.value.length > 20)
                setName(e.target.value.slice(0, 20) as string)
              else setName(e.target.value as string)
            }}
          />
        </Box>
        <Box>
          <Typography variant="h6">팀 분류</Typography>
          <RowRadioButtonsGroup setValue={setType} />
        </Box>
        {type === 'STUDY' && (
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
          <Typography variant="h6" sx={{ paddingRight: '5px', width: '70%' }}>
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
        {type === 'STUDY' ? null : (
          <Box>
            <Typography variant="h6">팀 역할</Typography>
            <SetTeamRole roleData={roleList} setRoleData={setRoleList} />
          </Box>
        )}
        <Box>
          <Typography variant="h6">팀 소개</Typography>
          <TextField
            variant="outlined"
            value={content}
            sx={{ width: '80vw', height: 'auto' }}
            onChange={(e) => {
              if (e.target.value.length > 1000)
                setContent(e.target.value.slice(0, 1000) as string)
              else setContent(e.target.value as string)
            }}
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
