'use client'

import React, { useState } from 'react'

const SendCodeForm = ({ email }: { email: string }) => {
  const [code, setCode] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const jsonData = JSON.stringify({ email, code })
    console.log(jsonData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="auth-code">인증코드</label>
      <p>이메일로 전송된 인증코드를 입력해주세요.</p>
      <input
        type="text"
        name="auth-code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">인증코드 확인</button>
    </form>
  )
}

export default SendCodeForm
