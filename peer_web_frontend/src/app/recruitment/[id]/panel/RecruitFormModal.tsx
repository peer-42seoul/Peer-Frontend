import FormCheckbox from "@/app/panel/FormCheckbox";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Modal, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material"
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";


type CloseQuestionList = string[];
type RatioQuestionList = {
    number: string;
    option1: string;
    option2: string;
}
type CheckQuestionList = string[];

interface IInterviewData {
    question: string;
    type: 'close' | 'open' | 'ratio' | 'check';
    optionList?: CloseQuestionList | RatioQuestionList | CheckQuestionList | null;
}

const data: IInterviewData[] = [
    {
        question: '질문내용 1',
        type: 'close',
        optionList: ['1번선택지', '2번선택지']
    },
    {
        question: '질문내용 2',
        type: 'open',
        optionList: null
    },
    {
        question: '질문내용 3',
        type: 'ratio',
        optionList: {
            number: '10',
            option1: '일번옵션',
            option2: '마지막옵션'
        }
    },
    {
        question: '질문내용 4',
        type: 'check',
        optionList: ['1번선택지', '2번선택지', '3번선택지']
    }
];

const CloseQuestionForm = ({ optionList, control, idx }: { optionList: CloseQuestionList, control: any, idx: number }) => {
    return (
        <Controller
            name={idx + ""}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <RadioGroup {...field}>
                    {
                        optionList?.map((data: string, index: number) => {
                            return (
                                <FormControlLabel control={<Radio />} label={data} value={index} key={index} />
                            )
                        })
                    }
                </RadioGroup>
            )}
        />

    );
}

const RatioQuestionForm = ({ optionList, control, idx }: { optionList: RatioQuestionList, control: any, idx: number }) => {
    const number = optionList?.number;
    const listArray = Array.from({ length: number }, (_, index) => index.toString());
    return (
        <Controller
            name={idx + ""}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <RadioGroup {...field}>
                    {
                        listArray?.map((data: string, index: number) => {
                            return (
                                <Box key={index}>
                                    <FormControlLabel control={<Radio />} label={data} value={index} />
                                </Box>
                            )
                        })
                    }
                </RadioGroup>
            )}
        />
    )
}

const CheckQuestionForm = ({ optionList, control, idx }: { optionList: CheckQuestionList, control: any, idx: number }) => {
    const { fields } = useFieldArray({
        control,
        name: idx + ""
    });

    return (
        <FormGroup>
            {optionList?.map((data: string, index: number) => {
                return (
                    <FormCheckbox
                        name={idx + "-" + index}
                        label={data}
                        control={control}
                        key={index}
                    />
                )
            })}
            {/* <Stack direction={"row"} alignItems={"center"}>
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { value, ...field } }) => (
                        <Checkbox {...field} checked={!!value} />
                    )}
                />
                <Box>{label}</Box>
            </Stack> */}
            {fields.map((item, index) => {
                return (
                    <Stack direction={"row"} alignItems={"center"}>
                        <Controller
                            name={`${idx}[${index}]`}
                            control={control}
                            render={({ field: { value, ...field } }) => (
                                <Checkbox {...field} checked={!!value} />
                            )}
                        />
                    </Stack>
                );
            })}
        </FormGroup>
    );
}

const RecruitFormModal = ({ open, setOpen, post_id, role }: { open: boolean, setOpen: any, post_id: string, role: string }) => {
    const { handleSubmit, control } = useForm()
    console.log("optionList", data);
    const onSubmit = (data: any) => {
        console.log(data);
        //추후에 제출할 form
        const value = {
            user_id: "",
            post_id,
            role,
            interviewList: [{
                question_id: "",
                answer: ""
            }]
        }
        console.log("value", value);
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box bgcolor={"white"} padding={4} height={"90%"} sx={{ overflowY: "scroll" }}>
                <Button onClick={() => setOpen(false)}>닫기</Button>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h4">{`${role} 지원 하기`}</Typography>
                    {data?.map((v, idx) => (
                        <Box key={idx}>
                            <Typography>{idx + 1}번 질문</Typography>
                            <Typography>{v.question}</Typography>
                            {v.type === 'open' &&
                                <Controller
                                    name={idx + ""}
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <TextField {...field} />}
                                />
                            }
                            {v.type === 'close' && <CloseQuestionForm optionList={v?.optionList as CloseQuestionList} control={control} idx={idx} />}
                            {v.type === 'ratio' && <RatioQuestionForm optionList={v?.optionList as RatioQuestionList} control={control} idx={idx} />}
                            {v.type === 'check' && <CheckQuestionForm optionList={v?.optionList as CheckQuestionList} control={control} idx={idx} />}
                        </Box>
                    ))}
                    <Button type="submit">제출</Button>
                </form>
            </Box>
        </Modal>
    )
}

export default RecruitFormModal;