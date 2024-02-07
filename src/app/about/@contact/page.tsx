'use client'

import { Button, Card, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

interface IContactForm {
  firstName: string
  lastName: string
  email: string
  company: string
  companySite: string
  text: string
}

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactForm>({
    mode: 'onChange',
  })
  const sendRef = useRef<HTMLFormElement>(null)

  const onSubmit = handleSubmit((data) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_CSR_API}/api/v1/about/contact-us`, data)
      .then((res) => {
        if (res.status === 200) {
          alert('문의사항이 성공적으로 전송되었습니다.')
          sendRef.current?.reset()
        } else {
          alert('문의사항 전송에 실패했습니다. 다시 시도해주세요.')
        }
      })
  })

  return (
    <Card sx={{ padding: '2rem' }}>
      <Stack>
        <Typography variant="Title1Emphasis">Contact Us</Typography>
      </Stack>
      <Stack my={'2rem'}>
        <Card
          sx={{
            boxShadow: 'none',
            backgroundColor: 'background.secondary',
            padding: '1rem',
          }}
        >
          <Typography>
            저희는 여러분의 의견을 기다리고 있습니다! 버그를 포함한 다양한
            의견들을 전달해주시면, 운영을 해나가는데 보탬이 됩니다.
          </Typography>
          <br />
          <Typography variant="Body1Emphasis">
            메일을 보내실 때는 이걸 꼭 기억해주세요!
          </Typography>
          <br />
          <Typography>
            ☑️ 버그를 제보하실 때는 어떻게 증상이 나타났는지 상세히
            전달해주세요.
          </Typography>
          <Typography>
            ☑️ 운영진도 누군가의 사랑받는 사람입니다. 과격하고 인격모독적인
            표현은 삼가주세요.
          </Typography>
        </Card>
        <br />

        <Card
          sx={{
            boxShadow: 'none',
            backgroundColor: 'background.secondary',
            padding: '1rem',
          }}
        >
          <form ref={sendRef} onSubmit={onSubmit}>
            <Stack spacing={'1rem'}>
              <Stack direction={'row'} spacing={'1rem'}>
                <TextField
                  required
                  autoComplete="off"
                  placeholder="이름"
                  variant="outlined"
                  type="text"
                  error={errors.firstName?.message ? true : false}
                  helperText={errors.firstName?.message}
                  sx={{
                    width: '100%',
                    '& input': {
                      '&::placeholder': {
                        color: 'white',
                      },
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#515169',
                    },
                  }}
                  {...register('firstName', {
                    required: '필수 입력 내용입니다.',
                    maxLength: 20,
                    minLength: 2,
                    pattern: {
                      value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
                      message: '한글, 영문, 숫자만 입력 가능합니다.',
                    },
                  })}
                />
                <TextField
                  required
                  autoComplete="off"
                  placeholder="성"
                  variant="outlined"
                  type="text"
                  error={errors.lastName?.message ? true : false}
                  helperText={errors.lastName?.message}
                  sx={{
                    width: '100%',
                    '& input': {
                      '&::placeholder': {
                        color: 'white',
                      },
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#515169',
                    },
                  }}
                  {...register('lastName', {
                    required: '필수 입력 내용입니다.',
                    maxLength: 10,
                    minLength: 1,
                    pattern: {
                      value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
                      message: '한글, 영문, 숫자만 입력 가능합니다.',
                    },
                  })}
                />
              </Stack>
              <TextField
                required
                autoComplete="off"
                placeholder="이메일 주소"
                variant="outlined"
                sx={{
                  width: '100%',
                  '& input': {
                    '&::placeholder': {
                      color: 'white',
                    },
                  },
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#515169',
                  },
                }}
                type="email"
                error={errors.email?.message ? true : false}
                helperText={errors.email?.message}
                {...register('email', {
                  required: '필수 입력 내용입니다.',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: '이메일 형식이 아닙니다.',
                  },
                })}
              />
              <Stack direction={'row'} spacing={'1rem'}>
                <TextField
                  autoComplete="off"
                  placeholder="(선택사항) 조직명"
                  variant="outlined"
                  sx={{
                    width: '100%',
                    '& input': {
                      '&::placeholder': {
                        color: 'white',
                      },
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#515169',
                    },
                  }}
                  {...register('company', {
                    maxLength: 20,
                  })}
                />
                <TextField
                  autoComplete="off"
                  placeholder="(선택사항) 조직 웹사이트"
                  variant="outlined"
                  sx={{
                    width: '100%',
                    '& input': {
                      '&::placeholder': {
                        color: 'white',
                      },
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#515169',
                    },
                  }}
                  {...register('companySite', {
                    maxLength: 30,
                  })}
                />
              </Stack>
              <TextField
                helperText={errors.text?.message}
                error={errors.text?.message ? true : false}
                multiline
                rows={5}
                autoComplete="off"
                placeholder="문의사항을 기록해주세요."
                variant="outlined"
                sx={{
                  width: '100%',
                  '& input': {
                    '&::placeholder': {
                      color: 'white',
                    },
                  },
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#515169',
                  },
                }}
                {...register('text', {
                  required: '필수 입력 내용입니다.',
                  maxLength: 300,
                  minLength: {
                    value: 1,
                    message: '1글자 이상 입력해주세요.',
                  },
                })}
              />
            </Stack>
          </form>
        </Card>
        <br />
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button
            onClick={onSubmit}
            variant="contained"
            sx={{ width: 'fit-content' }}
          >
            문의사항 보내기
          </Button>
        </Stack>
      </Stack>
    </Card>
  )
}

export default ContactPage
