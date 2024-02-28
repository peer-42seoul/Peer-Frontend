'use client'
import { FormHelperText, Stack, Typography } from '@mui/material'
import useMedia from '@/hook/useMedia'
import { IRecruitWriteField } from '@/types/IRecruitWriteField'
import {
  Control,
  UseFormTrigger,
  useFieldArray,
  useFormState,
} from 'react-hook-form'
import ControlledTextfield from '@/components/ControlledTextfield'
import React from 'react'
import FieldWithLabel from '@/components/FieldWithLabel'
import { CloseIcon, PlusIcon, UserCheckIcon } from '@/icons'
import * as style from '../../page.style'
import { IconButton } from '@mui/material'
import useToast from '@/states/useToast'

// 해당 컴포넌트는 react-hook-form에 최적화되어있습니다.
const SetTeamRole = ({
  trigger,
  control,
  editorType,
}: {
  trigger: UseFormTrigger<IRecruitWriteField>
  control?: Control<IRecruitWriteField, any>
  editorType: 'write' | 'edit'
}) => {
  const { isPc } = useMedia()
  const { prepend, remove, fields } = useFieldArray({
    control,
    name: 'roleList',
  })

  const { errors } = useFormState({ control, name: 'roleList' })

  const { openToast, closeToast } = useToast()

  const handlePrepend = (event: React.MouseEvent) => {
    event.stopPropagation()
    closeToast()
    if (fields.length >= 10) {
      return openToast({
        message: '최대 10개의 역할까지 모집 가능해요.',
        severity: 'error',
      })
    }
    prepend({ name: '', number: 0 })
  }

  const handleRemove = (index: number) => {
    closeToast()
    if (fields.length <= 1) {
      return openToast({
        message: '최소 1개의 역할은 입력해주세요.',
        severity: 'error',
      })
    }
    remove(index)
  }

  return (
    <FieldWithLabel
      label="역할"
      labelIcon={
        <UserCheckIcon sx={{ ...style.iconStyleBase, color: 'text.normal' }} />
      }
      endIconButton={
        <IconButton onClick={handlePrepend} sx={{ marginLeft: '0.5rem' }}>
          <PlusIcon
            sx={{ ...style.iconStyleBase, color: 'text.alternative' }}
          />
        </IconButton>
      }
    >
      <Stack direction={'column'} spacing={'0.5rem'}>
        {fields.map((field, index) => {
          return (
            <Stack key={field.id} spacing={'0.5rem'}>
              <Stack direction={'row'} spacing={'0.5rem'} alignItems={'center'}>
                <ControlledTextfield
                  control={control}
                  inputProps={{ maxLength: 20 }}
                  onChange={() => {
                    trigger([`roleList.${index}.name`])
                  }}
                  name={`roleList.${index}.name`}
                  sx={{
                    width: ['100%', '26rem'],
                  }}
                  variant="outlined"
                  placeholder={
                    isPc
                      ? '찾고있는 역할을 입력하세요, ex) 프론트엔드 개발자, 디자이너'
                      : '찾고있는 역할을 입력하세요.'
                  }
                  rules={{
                    required: '모집 역할을 입력해주세요.',
                    maxLength: {
                      value: 20,
                      message: '20글자 이하로 입력해주세요.',
                    },
                  }}
                  disabled={editorType === 'edit'}
                  error={!!errors?.roleList?.[index]?.name}
                />
                <ControlledTextfield
                  control={control}
                  name={`roleList.${index}.number`}
                  inputProps={{ type: 'number' }}
                  InputProps={{
                    endAdornment: (
                      <Typography variant="Caption" color="text.alternative">
                        명
                      </Typography>
                    ),
                  }}
                  rules={{
                    required: '모집 인원을 입력해주세요.',
                    min: { value: 1, message: '1명 이상 입력해주세요.' },
                    max: { value: 6, message: '6명 이하로 입력해주세요.' },
                  }}
                  sx={{
                    width: '4.5rem',
                  }}
                  disabled={editorType === 'edit'}
                  error={!!errors?.roleList?.[index]?.number}
                />
                <IconButton
                  onClick={() => handleRemove(index)}
                  sx={{ height: '1.5rem' }}
                >
                  <CloseIcon
                    sx={{ ...style.iconStyleBase, color: 'text.alternative' }}
                  />
                </IconButton>
              </Stack>
              {!index && !!errors.roleList?.[index] && (
                <FormHelperText error={!!errors.roleList?.[index]}>
                  {errors?.roleList?.[index]?.name?.message}
                  {errors?.roleList?.[index]?.name?.message && <br />}
                  {errors?.roleList?.[index]?.number?.message}
                </FormHelperText>
              )}
            </Stack>
          )
        })}
      </Stack>
    </FieldWithLabel>
  )
}

export default SetTeamRole
