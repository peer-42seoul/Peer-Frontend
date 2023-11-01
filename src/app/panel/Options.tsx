import {
    Box,
    Button,
    FormControl,
    FormGroup,
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import FormCheckbox from './FormCheckbox'
import TagAutoComplete from '@/components/TagAutoComplete'
import SetupSelect from '../teams/@setting/[id]/panel/SetupSelect'

const Options = ({ setDetailOption }: { setDetailOption: any }) => {
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            due: -1,
            placeOnline: false,
            placeOffline: false,
            placemix: false,
            statusBefore: false,
            statusonGoing: false,
            statusdone: false,
        },
    })
    const [tagData, setTagData] = useState<string[]>([])
    const [location, setLocation] = useState<string>('');
    const [parentLocation, setParentLocation] = useState<string>('선택안함');
    const stackList = ['javaScript', 'react', 'TypeScript', 'NextJs']
    const dueList = [
        '1주일',
        '2주일',
        '3주일',
        '4주일',
        '1개월',
        '2개월',
        '3개월',
        '4개월',
        '5개월',
        '6개월',
        '7개월',
        '8개월',
        '9개월',
        '10개월',
        '11개월',
        '12개월',
        '12개월 이상',
    ]

    const onSubmit = (data: any) => {
        const {
            due,
            placeOnline,
            placeOffline,
            placemix,
            statusBefore,
            statusonGoing,
            statusdone,
        } = data

        const makeCommaString = (obj: {
            [key: string]: boolean
        }) => {
            const trueKeys = Object.keys(obj).filter((key) => obj[key])
            const resultString = trueKeys.join(',')
            return resultString
        }

        const status = makeCommaString({
            before: statusBefore,
            onGoing: statusonGoing,
            done: statusdone,
        })

        const place = makeCommaString({
            online: placeOnline,
            offline: placeOffline,
            mix: placemix,
        })

        const tag = tagData.length ? tagData.join(',') : ''
        setDetailOption({
            due: due == -1 || !due ? '' : due,
            region: parentLocation === "선택안함" ? '' : parentLocation + " " + location,
            place: place,
            status: status,
            tag: tag,
        })
    }

    const handleReset = () => {
        reset()
        setTagData([])
        setLocation('');
        setParentLocation('');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box>작업 스택</Box>
                    <TagAutoComplete
                        list={stackList}
                        datas={tagData}
                        setData={setTagData}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box>목표 기간</Box>
                    <Controller
                        name="due"
                        control={control}
                        render={({ field }) => (
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <Select {...field}>
                                    <MenuItem value={-1}>
                                        선택안함
                                    </MenuItem>
                                    {dueList.map((item, index) => (
                                        <MenuItem key={index} value={index}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box>작업 지역</Box>
                    <SetupSelect value={parentLocation} setValue={(event: SelectChangeEvent) => setParentLocation(event.target.value)} type="location" />
                    <SetupSelect value={location} setValue={(event: SelectChangeEvent) => setLocation(event.target.value)} type="location" parentLocation={parentLocation} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box>작업 유형</Box>
                    <FormGroup row>
                        <FormCheckbox name="placeOnline" label="온라인" control={control} />
                        <FormCheckbox
                            name="placeOffline"
                            label="오프라인"
                            control={control}
                        />
                        <FormCheckbox name="placemix" label="혼합" control={control} />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box>작업 단계</Box>
                    <FormGroup row>
                        <FormCheckbox
                            name="statusBefore"
                            label="모집전"
                            control={control}
                        />
                        <FormCheckbox
                            name="statusonGoing"
                            label="모집중"
                            control={control}
                        />
                        <FormCheckbox
                            name="statusdone"
                            label="모집완료"
                            control={control}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent={'space-between'}>
                        <Button onClick={handleReset}>초기화</Button>
                        <Button type={'submit'}>확인</Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    )
}

export default Options