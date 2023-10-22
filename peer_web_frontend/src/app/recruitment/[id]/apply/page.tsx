'use client'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, FormControl, FormControlLabel, FormGroup, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import CuTextField from "@/components/CuTextField";
import FormCheckbox from "@/app/panel/FormCheckbox";
import { Controller, useForm } from "react-hook-form";
import React from "react";

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

const CloseQuestionForm = ({ optionList, control, id }: { optionList: CloseQuestionList, control: any, id: string }) => {
    return (
        <Controller
            name={id}
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

const RatioQuestionForm = ({ optionList, control, id }: { optionList: RatioQuestionList, control: any, id: string }) => {
    const number = optionList?.number;
    const listArray = Array.from({ length: number }, (_, index) => index.toString());
    return (
        <Controller
            name={id}
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

const CheckQuestionForm = ({ optionList, control, id }: { optionList: CheckQuestionList, control: any, id: string }) => {
    return (
        <FormGroup>
            {optionList?.map((data: string, index: number) => {
                return (
                    <FormCheckbox
                        name={id + "-" + index}
                        label={data}
                        control={control}
                    />
                )
            })}
        </FormGroup>
    );
}

const RecruitApplyPage = () => {
    const { handleSubmit, control } = useForm()

    console.log("optionList", data);
    const onSubmit = (data: any) => {
        console.log(data);
        const value = {
            user_id: "",
            post_id: "",
            type: "디자이너",
            interviewList: [{
                question_id: "",
                answer: "",
            }]
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4">지원 하기</Typography>
            {data?.map((v, idx) => (
                <React.Fragment key={idx}>
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
                    {v.type === 'close' && <CloseQuestionForm optionList={v?.optionList as CloseQuestionList} control={control} id={idx + ""}/>}
                    {v.type === 'ratio' && <RatioQuestionForm optionList={v?.optionList as RatioQuestionList} control={control} id={idx + ""}/>}
                    {v.type === 'check' && <CheckQuestionForm optionList={v?.optionList as CheckQuestionList} control={control} id={idx + ""}/>}
                </React.Fragment>
            ))}
            <Button type="submit">제출</Button>
        </form>
    )
}

export default RecruitApplyPage;
