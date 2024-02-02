import useAxiosWithAuth from '@/api/config'
import { SendIcon } from '@/icons'
import useToast from '@/states/useToast'
import { IPostId } from '@/types/IComment'
import { TextField } from '@mui/material'
import { Container, IconButton, Stack } from '@mui/material'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { mutate as mutateType } from 'swr'

export const CommentWriter = ({
  postId,
  mutate,
}: IPostId & { mutate: typeof mutateType }) => {
  const [content, setContent] = useState<string>('')
  const commentURL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/post/comment/${postId}?page=1&pageSize=3`
  const axiosWithAuth = useAxiosWithAuth()
  const { openToast } = useToast()

  const onChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }
  const submitContent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await axiosWithAuth.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/post/comment`,
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
    <Container
      sx={{
        width: '100%',
        height: '3.5rem',
        backgroundColor: 'background.tertiary',
      }}
    >
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'background.tertiary',
        }}
      >
        <form
          onSubmit={submitContent}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
          }}
        >
          <Stack
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              gap: '1rem',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TextField
              type="text"
              value={content}
              onChange={onChangeContent}
              placeholder="댓글을 작성해주세요."
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                color: 'text.alternative',
              }}
            />
            <IconButton
              type="submit"
              style={{
                width: '1.5rem',
                height: '1.5rem',
              }}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </form>
      </Stack>
    </Container>
  )
}
