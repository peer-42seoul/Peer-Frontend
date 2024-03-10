import useAxiosWithAuth from '@/api/config'
import { SendIcon } from '@/icons'
import useToast from '@/states/useToast'
import { IPostId } from '@/types/IComment'
import { TextField } from '@mui/material'
import { Container, IconButton, Stack } from '@mui/material'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { mutate as mutateType } from 'swr'
import * as style from './CommentWriter.style'

export const CommentWriter = ({
  postId,
  mutate,
}: IPostId & { mutate: typeof mutateType }) => {
  const [content, setContent] = useState<string>('')
  const commentURL = `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/comment/${postId}?page=1&pageSize=3`
  const axiosWithAuth = useAxiosWithAuth()
  const { openToast } = useToast()

  const onChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }
  const submitContent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      if (!content) {
        openToast({
          severity: 'error',
          message: '댓글을 작성해주세요.',
        })
        return
      }
      await axiosWithAuth.post(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/comment`,
        {
          content: content,
          postId: Number(postId),
        },
      )
      setContent('')
      mutate(commentURL)
    } catch (error: any) {
      switch (error.response.status) {
        case 401: {
          openToast({
            severity: 'error',
            message: '401',
          })
          break
        }
        case 403: {
          openToast({
            severity: 'error',
            message: '403',
          })
          break
        }
        case 404: {
          openToast({
            severity: 'error',
            message: '404',
          })
          break
        }
      }
    }
  }

  return (
    <Container sx={style.writerWrapper}>
      <Stack sx={style.writerContainer}>
        <form onSubmit={submitContent} style={style.writerForm}>
          <Stack sx={style.writerInputContainer}>
            <TextField
              type="text"
              value={content}
              onChange={onChangeContent}
              placeholder="댓글을 작성해주세요."
              style={style.writerInput}
              inputProps={{ maxLength: 150 }}
            />
            <IconButton type="submit" style={style.writerButton}>
              <SendIcon />
            </IconButton>
          </Stack>
        </form>
      </Stack>
    </Container>
  )
}
