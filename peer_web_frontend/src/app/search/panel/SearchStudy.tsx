'use client'

import { TextField } from '@mui/material'
import { Form, useForm } from 'react-hook-form'

export default function SearchStudy() {
  return (
    <>
      <Form>
        <TextField placeholder="Study" />
      </Form>
    </>
  )
}
