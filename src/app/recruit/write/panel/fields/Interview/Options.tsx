import ControlledSelect from '@/components/ControlledSelect'
import ControlledTextfield from '@/components/ControlledTextfield'
import {
  CloseIcon,
  SelectedRadioButton,
  UnCheckedCheckBox,
  UnSelectedRadioButton,
} from '@/icons'
import { IRecruitWriteField } from '@/types/IRecruitWriteField'
import {
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import { Control, useFieldArray, useWatch } from 'react-hook-form'

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
  width: '40%',
}

const Options = ({
  control,
  firstIndex,
  type,
}: {
  control: Control<IRecruitWriteField>
  firstIndex: number
  type: 'OPEN' | 'CLOSE' | 'CHECK' | 'RATIO'
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `interviewList.${firstIndex}.optionList`,
  })

  const ratioMax = useWatch({
    control,
    name: `interviewList.${firstIndex}.optionList.${0}.option`,
  })

  if (type === 'CLOSE') {
    return (
      <>
        {fields.map((field, index) => {
          return (
            <Stack
              key={field.id}
              spacing={'0.25rem'}
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
                name={`interviewList.${firstIndex}.optionList.${index}.option`}
                control={control}
                rules={{ required: '필수 입력 항목입니다.' }}
                placeholder="선택지를 입력해주세요."
                variant="standard"
                sx={Body2Style}
              />
              <IconButton
                onClick={() => {
                  remove(index)
                }}
              >
                <CloseIcon
                  sx={{ color: 'text.alternative', width: '0.875rem' }}
                />
              </IconButton>
            </Stack>
          )
        })}
        <Button
          variant="text"
          sx={{ color: 'primary', width: 'fit-content', p: '0px 4px' }}
          onClick={() => append({ option: '' })}
          disabled={fields.length >= 10}
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
            <Stack
              key={field.id}
              direction={'row'}
              spacing={'0.5rem'}
              alignItems={'center'}
            >
              <UnCheckedCheckBox
                sx={{ color: 'text.alternative', width: '0.875rem' }}
              />
              <ControlledTextfield
                name={`interviewList.${firstIndex}.optionList.${index}.option`}
                control={control}
                rules={{ required: '필수 입력 항목입니다.' }}
                placeholder="선택지를 입력해주세요."
                variant="standard"
                sx={Body2Style}
              />
              <IconButton
                onClick={() => {
                  remove(index)
                }}
              >
                <CloseIcon
                  sx={{ color: 'text.alternative', width: '0.875rem' }}
                />
              </IconButton>
            </Stack>
          )
        })}
        <Button
          variant="text"
          sx={{ color: 'primary', width: 'fit-content', p: '0px 4px' }}
          onClick={() => append({ option: '' })}
          disabled={fields.length >= 10}
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
              <Stack
                key={field.id}
                direction="row"
                spacing={2}
                alignItems={'center'}
              >
                <TextField
                  value={1}
                  disabled
                  sx={{
                    width: '3.5rem',
                    height: ' 2rem',
                    backgroundColor: 'background.tertiary !important',
                  }}
                />
                <Typography variant="Body2" color={'text.alternative'}>
                  ~
                </Typography>
                <ControlledSelect
                  key={field.id}
                  sx={{
                    width: '3.5rem',
                    height: ' 2rem',
                    backgroundColor: 'background.tertiary',
                  }}
                  name={`interviewList.${firstIndex}.optionList.${index}.option`}
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
            <Stack
              key={field.id}
              direction="row"
              spacing={'0.25rem'}
              alignItems={'end'}
            >
              <Typography variant="Body2" color={'text.alternative'}>
                {index === 1 ? '1.' : ratioMax + '.'}
              </Typography>
              <ControlledTextfield
                name={`interviewList.${firstIndex}.optionList.${index}.option`}
                control={control}
                rules={{ required: '필수 입력 항목입니다.' }}
                placeholder="선택지를 입력해주세요."
                variant="standard"
                sx={Body2Style}
              />
            </Stack>
          )
        })}
      </>
    )
  }
  return fields.map((field, index) => {
    return (
      <ControlledTextfield
        key={field.id}
        name={`interviewList.${firstIndex}.optionList.${index}.option`}
        control={control}
        rules={{ required: '필수 입력 항목입니다.' }}
        placeholder="선택지를 입력해주세요."
        variant="standard"
        sx={Body2Style}
        disabled
      />
    )
  })
}

export default Options
