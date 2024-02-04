'use client'
import { FormHelperText, Stack, Typography } from '@mui/material'
import useMedia from '@/hook/useMedia'
import { IRecruitWriteField } from '@/app/recruit/write/page'
import {
  Control,
  UseFormTrigger,
  useFieldArray,
  useFormState,
  useWatch,
} from 'react-hook-form'
import ControlledTextfield from '@/components/ControlledTextfield'
import React, { useState } from 'react'
import FieldWithLabel from '@/components/FieldWithLabel'
import { CloseIcon, PlusIcon, UserCheckIcon } from '@/icons'
import * as style from '../../../../write/page.style'
import { IconButton } from '@mui/material'

// 해당 컴포넌트는 react-hook-form에 최적화되어있습니다.
const SetTeamRole = ({
  trigger,
  control,
}: {
  trigger: UseFormTrigger<IRecruitWriteField>
  control?: Control<IRecruitWriteField, any>
}) => {
  const { isPc } = useMedia()
  const [maxMember, setMaxMember] = useState<Array<number>>([])
  const [leftMember, setLeftMember] = useState(12)
  const { prepend, remove, fields } = useFieldArray({
    control,
    name: 'roleList',
  })
  const roleData = useWatch({ control, name: 'roleList.0.number' })

  const { errors } = useFormState({ control })

  const handlePrepend = () => {
    if (leftMember < 1) return
    trigger('roleList').then(() => {
      if (!errors.roleList) {
        setLeftMember((prev) => {
          setMaxMember([prev - roleData, ...maxMember])
          return prev - roleData
        })
        prepend({ name: '', number: 1 })
      }
    })
  }

  return (
    <FieldWithLabel
      label="역할"
      labelIcon={
        <UserCheckIcon sx={{ ...style.iconStyleBase, color: 'text.normal' }} />
      }
      endIconButton={
        <IconButton onClick={handlePrepend} sx={{ justifySelf: 'flex-end' }}>
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
                  onBlur={() => {
                    trigger([`roleList.${index}.name`])
                  }}
                  name={`roleList.${index}.name`}
                  sx={{
                    width: ['100%', '26rem'],
                  }}
                  variant="outlined"
                  placeholder={
                    isPc
                      ? '모집하는 역할을 입력해주세요, ex) 프론트엔드 개발자, 디자이너'
                      : '모집 역할을 입력해주세요.'
                  }
                  rules={{
                    required: '모집 역할을 입력해주세요.',
                    minLength: {
                      value: 2,
                      message: '2글자 이상 입력해주세요.',
                    },
                    maxLength: {
                      value: 20,
                      message: '20글자 이하로 입력해주세요.',
                    },
                  }}
                  disabled={!!index}
                  error={!!errors?.roleList?.[index]?.name}
                />
                <ControlledTextfield
                  control={control}
                  name={`roleList.${index}.number`}
                  inputProps={{ type: 'number', max: 6, min: 1 }}
                  InputProps={{
                    endAdornment: (
                      <Typography variant="Caption" color="text.alternative">
                        명
                      </Typography>
                    ),
                  }}
                  onBlur={() => {
                    trigger([`roleList.${index}.number`])
                  }}
                  rules={{
                    required: '모집 인원을 입력해주세요.',
                    min: { value: 1, message: '1명 이상 입력해주세요.' },
                    max: {
                      value: maxMember[index] > 6 ? 6 : maxMember[index],
                      message: `${
                        maxMember[index] > 6 ? 6 : maxMember[index]
                      }명 이하로 입력해주세요.`,
                    },
                  }}
                  sx={{
                    width: '4.5rem',
                  }}
                  disabled={!!index}
                  error={!!errors?.roleList?.[index]?.number}
                />
                <IconButton
                  onClick={() => remove(index)}
                  sx={{ height: '1.5rem' }}
                  disabled={fields.length === 1}
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
