import ControlledSelect from '@/components/ControlledSelect'
import ControlledTextfield from '@/components/ControlledTextfield'
import { SelectedRadioButton, UnSelectedRadioButton } from '@/icons'
import { IRecruitWriteField } from '@/types/IRecruitWriteField'
import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Control, useFieldArray } from 'react-hook-form'

const Body2Style = {
  '& .MuiInputBase-root': {
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '150%',
    color: 'text.alternative',
  },
  '& input': {
    p: 0,
  },
  width: '80%',
}

const Options = ({
  control,
  index,
  type,
}: {
  control: Control<IRecruitWriteField>
  index: number
  type: 'OPEN' | 'CLOSE' | 'CHECK' | 'RATIO'
}) => {
  const { fields, append } = useFieldArray({
    control,
    name: `interviewList.${index}.optionList`,
  })

  if (type === 'CLOSE') {
    return (
      <>
        {fields.map((field, index) => {
          return (
            <Stack
              key={field.id}
              spacing={'0.5rem'}
              direction={'row'}
              alignItems={'center'}
            >
              {!index ? (
                <SelectedRadioButton
                  sx={{ color: 'text.alternative', width: '0.875rem' }}
                />
              ) : (
                <UnSelectedRadioButton
                  sx={{ color: 'text.alternative', width: '0.875rem' }}
                />
              )}
              <ControlledTextfield
                name={`interviewList.${index}.optionList.${index}`}
                control={control}
                rules={{ required: '필수 입력 항목입니다.' }}
                placeholder="선택지를 입력해주세요."
                variant="standard"
                value={field.option}
                sx={Body2Style}
              />
            </Stack>
          )
        })}
        <Button
          variant="text"
          sx={{ color: 'primary', width: 'fit-content', p: '0px 4px' }}
          onClick={() => append({ option: '' })}
        >
          <Typography variant="CaptionEmphasis" color={'primary'}>
            옵션 추가하기
          </Typography>
        </Button>
      </>
    )
  } else if (type === 'CHECK') {
    return (
      <>
        {fields.map((field, index) => {
          return (
            <ControlledTextfield
              key={field.id}
              name={`interviewList.${index}.optionList.${index}`}
              control={control}
              rules={{ required: '필수 입력 항목입니다.' }}
              placeholder="선택지를 입력해주세요."
              variant="standard"
              sx={Body2Style}
              value={field.option}
            />
          )
        })}
        <Button
          variant="text"
          sx={{ color: 'primary', width: 'fit-content', p: '0px 4px' }}
          onClick={() => append({ option: '' })}
        >
          <Typography variant="CaptionEmphasis" color={'primary'}>
            옵션 추가하기
          </Typography>
        </Button>
      </>
    )
  } else if (type === 'RATIO') {
    return (
      <>
        {fields.map((field, index) => {
          if (!index) {
            return (
              <Stack key={field.id} direction="row" spacing={2}>
                <TextField value={1} disabled />
                <ControlledSelect
                  key={field.id}
                  value={field.option}
                  name={`interviewList.${index}.optionList.${index}`}
                  control={control}
                  rules={{ required: '필수 입력 항목입니다.' }}
                  placeholder="선택지를 입력해주세요."
                  variant="outlined"
                >
                  <MenuItem value={'2'}>2</MenuItem>
                  <MenuItem value={'3'}>3</MenuItem>
                  <MenuItem value={'4'}>4</MenuItem>
                  <MenuItem value={'5'}>5</MenuItem>
                </ControlledSelect>
              </Stack>
            )
          }
          return (
            <ControlledTextfield
              key={field.id}
              name={`interviewList.${index}.optionList.${index}`}
              control={control}
              rules={{ required: '필수 입력 항목입니다.' }}
              placeholder="선택지를 입력해주세요."
              variant="standard"
              value={field.option}
              sx={Body2Style}
            />
          )
        })}
      </>
    )
  }
  return fields.map((field, index) => {
    return (
      <ControlledTextfield
        key={field.id}
        name={`interviewList.${index}.optionList.${index}`}
        control={control}
        rules={{ required: '필수 입력 항목입니다.' }}
        placeholder="선택지를 입력해주세요."
        variant="standard"
        value={field.option}
        sx={Body2Style}
        disabled
      />
    )
  })
}

export default Options
