'use client'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Switch, TextField, InputLabel, Button, Box } from '@mui/material'
import { Fragment } from 'react'

interface IFormInputs {
  email: string
  password: string
  name: string
  nickName: string
  birthDate: string
  phoneNumber: string
  pushAlarmAgree: boolean
}

// interface IFormInput {
//   label: string
//   name: string
//   control: any
//   rules: any
// }

// const FormInput = ({ label, name, control, rules }: IFormInput) => {
//   return (
//     <>
//       <Controller
//         name={name}
//         control={control}
//         rules={rules}
//         render={({ field }) => (
//           <>
//             <InputLabel>{label}</InputLabel>
//             <TextField {...field} />
//           </>
//         )}
//       />
//     </>
//   )
// }

const SignUp = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInputs>()
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)
  return (
    <Fragment>
      <h2>Peer 회원가입 페이지</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: '이메일 형식이 아닙니다',
            },
          }}
          render={({ field }) => (
            <>
              <InputLabel>이메일</InputLabel>
              <TextField {...field} />
            </>
          )}
        />
        {errors.email && <Box>{errors.email.message}</Box>}
        <Controller
          name="password"
          control={control}
          rules={{ required: '비밀번호를 입력해주세요', pattern: undefined }}
          render={({ field }) => (
            <>
              <InputLabel>비밀번호</InputLabel>
              <TextField {...field} />
            </>
          )}
        />
        {errors.password && <Box>{errors.password.message}</Box>}
        <Controller
          name="nickName"
          control={control}
          rules={{ required: '닉네임을 입력해주세요' }}
          render={({ field }) => (
            <>
              <InputLabel>닉네임</InputLabel>
              <TextField {...field} />
            </>
          )}
        />
        {errors.nickName && <Box>{errors.nickName.message}</Box>}
        <Controller
          name="name"
          control={control}
          rules={{ required: '이름을 입력해주세요' }}
          render={({ field }) => (
            <>
              <InputLabel>이름</InputLabel>
              <TextField {...field} />
            </>
          )}
        />
        {errors.name && <Box>{errors.name.message}</Box>}

        <Controller
          name="birthDate"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <InputLabel>생년월일</InputLabel>
              <TextField {...field} />
            </>
          )}
        />
        {errors.birthDate && <Box>생년월일을 입력해주세요</Box>}
        <Controller
          name="phoneNumber"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <InputLabel>전화번호</InputLabel>
              <TextField {...field} />
            </>
          )}
        />
        {errors.phoneNumber && <Box>전화번호를 입력해주세요</Box>}
        <section>
          <label>푸시알람동의</label>
          <Controller
            name="pushAlarmAgree"
            control={control}
            defaultValue={false}
            render={({ field }) => <Switch {...field} />}
          />
        </section>
        <Button type="submit">제출</Button>
      </form>
    </Fragment>
  )
}

export default SignUp
