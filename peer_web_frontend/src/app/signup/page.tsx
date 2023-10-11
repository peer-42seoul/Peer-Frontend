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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '50px',
      }}
      component="main"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ textAlign: 'center', flexGrow: 1 }} component="h1">
            회원가입
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(submitSignUp)}>
          {signUpStep === 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '400px',
                marginTop: '30px',
              }}
            >
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
                sx={{
                  display: 'block',
                  margin: 'auto',
                  width: '50%',
                }}
                variant="contained"
                onClick={submitCode}
              >
                다음
              </Button>
            </Box>
          )}
          {signUpStep === 1 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '400px',
                marginTop: '30px',
              }}
            >
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
                sx={{
                  display: 'block',
                  margin: 'auto',
                  width: '50%',
                }}
                variant="contained"
                type="submit"
              >
                회원가입
              </Button>
            </Box>
          )}
        </form>
      </Box>
    </Box>
  )
}

export default SignUp
