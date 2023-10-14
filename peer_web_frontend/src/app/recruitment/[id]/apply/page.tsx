'use client'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, FormControl, FormControlLabel, FormGroup, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import CuTextField from "@/components/CuTextField";
import FormCheckbox from "@/app/panel/FormCheckbox";
import { useForm } from "react-hook-form";

type CloseQuestionList = string[];
// type OpenQuestionList = null;
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

const CloseQuestionForm = ({ optionList, control }: { optionList: CloseQuestionList, control: any }) => {
    console.log("optionList2", optionList)
    return (
        <RadioGroup name="closeQuestion">
            {
                optionList?.map((data: string, index: number) => {
                    return (
                        <Box key={index}>
                            <FormControlLabel control={<Radio />} label={data} value={index} />
                        </Box>
                    )
                })
            }
        </RadioGroup>
    );
}

const RatioQuestionForm = ({ optionList, control }: { optionList: RatioQuestionList, control: any }) => {
    const number = optionList?.number;
    const listArray = Array.from({ length: number }, (_, index) => index.toString());
    return (
        <RadioGroup
            name="closeQuestion"
        >
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
    )
}

const CheckQuestionForm = ({ optionList, control }: { optionList: CheckQuestionList, control: any }) => {
    return (<FormGroup>
        {optionList?.map((data: string, index: number) => {
            return (
                <FormCheckbox
                    name={index.toString()}
                    label={data}
                    control={control}
                />
            )
        })}
    </FormGroup>);
}

const RecruitApplyPage = () => {
    const { handleSubmit, control, reset } = useForm()
    console.log("optionList", data);
    return (
        <>
            <Typography variant="h4">지원 하기</Typography>
            {data?.map((v, idx) => (
                <>
                    <Typography>{idx + 1}번 질문</Typography>
                    <Typography>{v.question}</Typography>
                    v.type === 'open' && <CuTextField />
                    v.type === 'close' && <CloseQuestionForm optionList={v?.optionList as CloseQuestionList} control={control} />
                    v.type === 'ratio' && <RatioQuestionForm optionList={v?.optionList as RatioQuestionList} control={control} />
                    v.type === 'check' && <CheckQuestionForm optionList={v?.optionList as CheckQuestionList} control={control} />
                </>
            ))}
        </>
    )
}

export default RecruitApplyPage;
