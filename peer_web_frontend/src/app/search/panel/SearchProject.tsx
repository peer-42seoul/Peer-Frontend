'use client'

import { TextField } from '@mui/material'
import { Form, useController, useForm } from 'react-hook-form'

export default function SearchProject() {
  return (
    <>
      <Form>
        <TextField placeholder="Project" />
      </Form>
    </>
  )
}
