'use client'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Switch } from '@mui/material'

interface Inputs {
  email: string
  password: string
  name: string
  nickName: string
  birthDate: string
  phoneNumber: string
  pushAlarmAgree: boolean
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Peer 회원가입 페이지</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>이메일</label>
        <input {...register('email', { required: true })} />
        {errors.email && <span>이메일을 입력해주세요</span>}
        <label>비밀번호</label>
        <input {...register('password', { required: true })} />
        {errors.password && <span>비밀번호를 입력해주세요</span>}
        <label>본명</label>
        <input {...register('name', { required: true })} />
        {errors.name && <span>본명을 입력해주세요</span>}
        <label>닉네임</label>
        <input {...register('nickName', { required: true })} />
        {errors.nickName && <span>닉네임을 입력해주세요</span>}
        <label>생년월일</label>
        <input {...register('birthDate', { required: true })} />
        {errors.birthDate && <span>생년월일을 입력해주세요</span>}
        <label>전화번호</label>
        <input {...register('phoneNumber', { required: true })} />
        {errors.phoneNumber && <span>전화번호를 입력해주세요</span>}
        <section>
          <label>푸시알람동의</label>
          <Controller
            name="pushAlarmAgree"
            control={control}
            render={({ field }) => <Switch {...field} />}
          />
        </section>
        <input type="submit" />
      </form>
    </div>
  )
}

export default SignUp
