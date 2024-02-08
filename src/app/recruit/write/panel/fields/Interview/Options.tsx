import ControlledSelect from '@/components/ControlledSelect'
import ControlledTextfield from '@/components/ControlledTextfield'
import {
  CloseIcon,
  SelectedRadioButton,
  UnCheckedCheckBox,
  UnSelectedRadioButton,
} from '@/icons'
import useToast from '@/states/useToast'
import { IRecruitWriteField } from '@/types/IRecruitWriteField'
import {
  Button,
  FormHelperText,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import { Control, useFieldArray, useFormState, useWatch } from 'react-hook-form'

const Body2Style = {
  '& .MuiInputBase-root': {
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '150%',
    color: 'text.alternative',
    width: '40%',
  },
  '& input': {
    p: 0,
  },
  width: '100%',
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

  const { errors } = useFormState<IRecruitWriteField>({ control })

  const ratioMax = useWatch({
    control,
    name: `interviewList.${firstIndex}.optionList.${0}.option`,
  })

  const { openToast } = useToast()

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
                placeholder="선택지를 입력해주세요."
                variant="standard"
                sx={Body2Style}
                error={
                  !!errors?.interviewList?.[firstIndex]?.optionList?.[index]
                    ?.option?.message
                }
                inputProps={{
                  maxLength: 20,
                }}
                rules={{
                  required: '선택지를 입력해주세요.',
                  maxLength: {
                    value: 20,
                    message: '최대 20자까지 입력 가능합니다.',
                  },
                  minLength: {
                    value: 2,
                    message: '최소 2자 이상 입력해주세요.',
                  },
                }}
                helperText={
                  <Typography variant="Caption" color={'error'}>
                    {
                      errors?.interviewList?.[firstIndex]?.optionList?.[index]
                        ?.option?.message
                    }
                  </Typography>
                }
              />
              <IconButton
                onClick={() => {
                  if (fields.length === 1) {
                    openToast({
                      severity: 'error',
                      message: '선택지는 최소 1개 이상 입력해야 합니다.',
                    })
                    return
                  }
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
                error={
                  !!errors?.interviewList?.[firstIndex]?.optionList?.[index]
                    ?.option?.message
                }
                name={`interviewList.${firstIndex}.optionList.${index}.option`}
                control={control}
                placeholder="선택지를 입력해주세요."
                variant="standard"
                sx={Body2Style}
                inputProps={{
                  maxLength: 20,
                }}
                rules={{
                  required: '선택지를 입력해주세요.',
                  maxLength: {
                    value: 20,
                    message: '최대 20자까지 입력 가능합니다.',
                  },
                  minLength: {
                    value: 2,
                    message: '최소 2자 이상 입력해주세요.',
                  },
                }}
                helperText={
                  <Typography variant="Caption" color={'error'}>
                    {
                      errors?.interviewList?.[firstIndex]?.optionList?.[index]
                        ?.option?.message
                    }
                  </Typography>
                }
              />
              <IconButton
                onClick={() => {
                  if (fields.length === 1) {
                    openToast({
                      severity: 'error',
                      message: '선택지는 최소 1개 이상 입력해야 합니다.',
                    })
                    return
                  }
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
                  placeholder="선택지를 입력해주세요."
                  variant="outlined"
                  rules={{
                    required: '최대 값을 지정해주세요.',
                  }}
                  error={
                    !!errors?.interviewList?.[firstIndex]?.optionList?.[index]
                      ?.option?.message
                  }
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
            <Stack direction={'column'} key={field.id}>
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
                  placeholder="선택지를 입력해주세요."
                  variant="standard"
                  sx={Body2Style}
                  inputProps={{
                    maxLength: 20,
                  }}
                  rules={{
                    required:
                      '선형 배울의 최소 / 최대 값에 이름을 붙여주세요. ex. 매우 그렇지 않다. / 매우 그렇다.',
                    maxLength: {
                      value: 20,
                      message: '최대 20자까지 입력 가능합니다.',
                    },
                    minLength: {
                      value: 2,
                      message: '최소 2자 이상 입력해주세요.',
                    },
                  }}
                  error={
                    !!errors?.interviewList?.[firstIndex]?.optionList?.[index]
                      ?.option?.message
                  }
                />
              </Stack>
              <FormHelperText>
                <Typography variant="Caption" color={'error'}>
                  {errors?.interviewList?.[firstIndex]?.optionList?.[0]?.option
                    ?.message ??
                    errors?.interviewList?.[firstIndex]?.optionList?.[index]
                      ?.option?.message}
                </Typography>
              </FormHelperText>
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
        placeholder="주관식 답변입니다."
        variant="standard"
        sx={Body2Style}
        disabled
        inputProps={{
          maxLength: 20,
        }}
      />
    )
  })
}

export default Options
