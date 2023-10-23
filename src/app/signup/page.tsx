'use client'

import { Button, Typography, Box } from '@mui/material'

import useSignUpForm from './hook/useSignUpForm'

import EmailField from './panel/EmailField'
import CodeField from './panel/CodeField'
import PasswordField from './panel/PasswordField'
import NameField from './panel/NameField'
import NickNameField from './panel/NickNameField'

const SignUp = () => {
  const {
    signUpStep,
    isEmailSent,
    emailError,
    isCodeSent,
    codeError,
    isNickNameSent,
    nickNameError,
    showPassword,
    setIsEmailSent,
    submitEmail,
    setIsCodeSent,
    submitCode,
    setIsNickNameSent,
    submitNickName,
    setShowPassword,
    submitSignUp,
    handleSubmit,
    control,
    errors,
  } = useSignUpForm()

  const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '50px',
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    marginTop: '30px',
  }

  const buttonStyle = {
    display: 'block',
    margin: 'auto',
    width: '50%',
  }

  return (
    <Box sx={mainStyle} component="main">
      <Typography
        aria-label="회원가입"
        sx={{ textAlign: 'center', flexGrow: 1 }}
        component="h3"
      >
        회원가입
      </Typography>
      <form onSubmit={handleSubmit(submitSignUp)}>
        <Box sx={formStyle}>
          {signUpStep === 0 && (
            <>
              <EmailField
                control={control}
                error={errors.email}
                submitEmail={submitEmail}
                setIsEmailSent={setIsEmailSent}
                isEmailSent={isEmailSent}
                emailError={emailError}
              />
              <CodeField
                control={control}
                error={errors.code}
                setIsCodeSent={setIsCodeSent}
                isCodeSent={isCodeSent}
                codeError={codeError}
              />
              <PasswordField
                control={control}
                error={errors.password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <Button
                aria-label="다음 버튼"
                sx={buttonStyle}
                variant="contained"
                onClick={submitCode}
              >
                다음
              </Button>
            </>
          )}
          {signUpStep === 1 && (
            <>
              <NameField control={control} error={errors.name} />
              <NickNameField
                control={control}
                error={errors.nickName}
                setIsNickNameSent={setIsNickNameSent}
                submitNickName={submitNickName}
                isNickNameSent={isNickNameSent}
                nickNameError={nickNameError}
              />
              <Button
                aria-label="회원가입 버튼"
                sx={buttonStyle}
                variant="contained"
                type="submit"
              >
                회원가입
              </Button>
            </>
          )}
        </Box>
      </form>
    </Box>
  )
}

export default SignUp
