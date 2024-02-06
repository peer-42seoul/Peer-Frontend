'use client'

import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/system'
import { Button, Container, Stack, Typography } from '@mui/material'
import axios from 'axios'
import NewTag from './panel/NewTag'
import { fetchTags } from '../panel/AdminAxios'

interface content {
  tagId: number
  name: string
  color: string
  createdAt: string
  updatedAt: string
}

const alignCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.secondary',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll',
}

const Tag = () => {
  const API_URL = process.env.NEXT_PUBLIC_CSR_API
  const [content, setContent] = useState<content[]>([])
  const [tagId, setTagId] = useState<number>(0)
  const [tagName, setTagName] = useState<string>('')
  const [tagColor, setTagColor] = useState<string>('#000000')
  const [open, setOpen] = useState<boolean>(false)
  const writeMode = useRef<string>('')
  useEffect(() => {
    fetchTags()
      .then((data) => setContent(data))
      .catch((err) => alert('배너를 불러오는 데 실패했습니다.' + err))
  }, [])

  const onHandleEdit = (tagId: number) => {
    writeMode.current = 'edit'
    const tagid = content.find((item) => item.tagId === tagId)?.tagId
    const tagname = content.find((item) => item.tagId === tagId)?.name
    const tagcolor = content.find((item) => item.tagId === tagId)?.color
    if (tagid !== undefined) setTagId(tagid)
    if (tagname !== undefined) setTagName(tagname)
    if (tagcolor !== undefined) setTagColor(tagcolor)
    setOpen(true)
  }

  const onHandleRemove = (tagId: number) => {
    axios
      .delete(`${API_URL}/api/v1/admin/tag`, {
        data: { tagId: tagId },
        withCredentials: true,
      })
      .then(() => {
        alert(tagId + '번 태그가 삭제되었습니다.')
        fetchTags().then((data) => setContent(data))
      })
  }

  const onHandleSubmit = () => {
    if (writeMode.current === 'write') {
      axios
        .post(
          `${API_URL}/api/v1/admin/tag`,
          {
            name: tagName,
            color: tagColor,
          },
          { withCredentials: true },
        )
        .then(() => {
          alert('새로운 태그가 등록되었습니다.')
          fetchTags().then((data) => setContent(data))
        })
        .catch(() => {
          alert('태그 등록에 실패하였습니다.')
        })
    } else {
      axios
        .put(
          `${API_URL}/api/v1/admin/tag`,
          {
            tagId: tagId,
            name: tagName,
            color: tagColor,
          },
          { withCredentials: true },
        )
        .then(() => {
          alert('태그가 수정되었습니다.')
          fetchTags().then((data) => setContent(data))
        })
        .catch(() => {
          alert('태그 수정에 실패하였습니다.')
        })
    }
    setOpen(false)
    setTagColor('#000000')
    setTagName('')
  }

  return (
    <>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '5rem',
          width: '80rem',
          height: '30rem',
          backgroundColor: 'background.primary',
        }}
      >
        <Stack>
          {/* 새 태그 추가 버튼 */}
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack>
              <Typography variant={'h4'}>태그 리스트</Typography>
              <Typography>ctrl + f 로 태그를 검색하세요</Typography>
            </Stack>
            <Box justifyContent={'right'}>
              <Button
                variant={'contained'}
                onClick={() => {
                  writeMode.current = 'write'
                  setOpen(true)
                }}
              >
                새 태그 추가하기
              </Button>
            </Box>
          </Stack>
          {/* 태그 리스트 */}
          <Stack sx={{ width: '45rem', height: '20rem', overflowY: 'scroll' }}>
            <Stack>
              {content?.map((item) => (
                <Stack
                  direction={'row'}
                  display={'flex'}
                  justifyContent={'space-between'}
                  sx={{ width: '90%', height: '90%' }}
                  key={item.tagId}
                >
                  <Typography variant={'Body1'} sx={alignCenter}>
                    {item.tagId}
                  </Typography>
                  <Typography variant={'Body1'} sx={alignCenter}>
                    {item.name}
                  </Typography>
                  <Typography variant={'Body1'} sx={alignCenter}>
                    {item.color}
                  </Typography>
                  <Typography variant={'Body1'} sx={alignCenter}>
                    {item.createdAt}
                  </Typography>
                  <Typography variant={'Body1'} sx={alignCenter}>
                    {item.updatedAt}
                  </Typography>
                  <Button onClick={() => onHandleEdit(item.tagId)}>
                    <Typography variant={'Body1'} sx={alignCenter}>
                      수정
                    </Typography>
                  </Button>
                  <Button onClick={() => onHandleRemove(item.tagId)}>
                    <Typography variant={'Body1'} sx={alignCenter}>
                      삭제
                    </Typography>
                  </Button>
                </Stack>
              ))}
            </Stack>
          </Stack>
          {/* 새 태그 만들기 모달 */}
          <NewTag
            open={open}
            setOpen={setOpen}
            writeMode={writeMode}
            tagName={tagName}
            setTagName={setTagName}
            tagColor={tagColor}
            setTagColor={setTagColor}
            onHandleSubmit={onHandleSubmit}
            style={style}
          />
        </Stack>
      </Container>
    </>
  )
}

export default Tag
