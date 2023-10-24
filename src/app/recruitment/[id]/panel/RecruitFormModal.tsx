import FormCheckbox from "@/app/panel/FormCheckbox";
import CuModal from "@/components/CuModal";
import useToast from "@/hook/useToast";
import { Box, Button, FormControl, FormControlLabel, FormGroup, Modal, Portal, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import axios from "axios";
import React, { Dispatch, useState } from "react";
import { Controller, useForm } from "react-hook-form";

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
            number: '5',
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
            rules={{
                required: '답변을 선택해주세요',
            }}
            defaultValue={"0"}
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
    const number = parseInt(optionList?.number);
    const listArray = Array.from({ length: number }, (_, index) => index.toString());
    return (
        <Controller
            name={idx + ""}
            control={control}
            rules={{
                required: '답변을 선택해주세요',
            }}
            defaultValue={"0"}
            render={({ field }) => (
                <RadioGroup {...field}>
                    {
                        listArray?.map((data: any, index: number) => {
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

    return (
        <FormControl component='fieldset'>
            <FormGroup>
                {optionList?.map((data: string, index: number) => {
                    return (
                        <FormCheckbox
                            name={`${idx}[${index}]`}
                            label={data}
                            control={control}
                            key={index}
                        />
                    )
                })}
            </FormGroup>
        </FormControl>
    );
}

const ConfirmModal = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<React.SetStateAction<boolean>> }) => {
    return (<CuModal
        open={open}
        handleClose={() => setOpen(false)}
        ariaTitle="modal-title"
        ariaDescription="modal-description"
    >
        <Box>
            <Typography variant="h4" id="modal-title">지원서 제출</Typography>
            <Typography id="modal-description">
                지원서를 제출하시겠습니까?
            </Typography>
            <Box>
                <Button onClick={() => setOpen(false)}>취소</Button>
                <Button type="submit" form="myForm">확인</Button>
            </Box>
        </Box>
    </CuModal >)
}

const RecruitFormModal = ({ open, setOpen, user_id, post_id, role }: { open: boolean, setOpen: any, user_id: string, post_id: string, role: string }) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm()
    const { CuToast: CuSuccessToast, isOpen: isSuccessOpen, openToast: openSuccessToast, closeToast: closeSuccessToast } = useToast();
    const { CuToast: CuFailedToast, isOpen: isFailedOpen, openToast: openFailedToast, closeToast: closeFailedToast } = useToast();

    const onSubmit = async (data: any) => {
        console.log("data", data);
        const array = Object.values(data);
        const interviewList = array?.map((v: any) => {
            if (typeof v !== 'string') {
                const idxArr = v?.map((item: any, idx: number) => item === true ? idx : undefined);
                const trueArr = idxArr?.filter((item: any) => (item !== undefined));
                return trueArr.join('^&%'); //정해놓은 구분자로 넣기
            }
            else
                return v;
        })

        const value = {
            user_id,
            post_id,
            role,
            interviewList
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/recriut/interview/${post_id}`, value);
            setOpenConfirm(false);
            openSuccessToast();
        } catch (e) {
            setOpenConfirm(false);
            openFailedToast();
            console.log("e", e);
        }

    };

    return (
        <>
            <Portal>
                <CuSuccessToast open={isSuccessOpen} onClose={closeSuccessToast} severity="success">
                    <Typography>제출에 성공하였습니다.</Typography>
                </CuSuccessToast>
                <CuFailedToast open={isFailedOpen} onClose={closeFailedToast} severity="error">
                    <Typography>제출에 실패하였습니다.</Typography>
                </CuFailedToast>
            </Portal>
            <ConfirmModal open={openConfirm} setOpen={setOpenConfirm} />
            <form onSubmit={handleSubmit(onSubmit)} id="myForm">

                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <Box bgcolor={"white"} padding={4} height={"90%"} sx={{ overflowY: "scroll" }}>
                        <Button onClick={() => setOpen(false)}>닫기</Button>
                        <Typography variant="h4">{`${role} 지원 하기`}</Typography>
                        {data?.map((v, idx) => (
                            <Box key={idx}>
                                <Typography>{idx + 1}번 질문</Typography>
                                <Typography>{v.question}</Typography>
                                {v.type === 'open' &&
                                    <Controller
                                        rules={{
                                            required: '답변을 입력해주세요',
                                        }}
                                        name={idx + ""}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => <TextField {...field} />}
                                    />
                                }
                                {v.type === 'close' && <CloseQuestionForm optionList={v?.optionList as CloseQuestionList} control={control} idx={idx} />}
                                {v.type === 'ratio' && <RatioQuestionForm optionList={v?.optionList as RatioQuestionList} control={control} idx={idx} />}
                                {v.type === 'check' && <CheckQuestionForm optionList={v?.optionList as CheckQuestionList} control={control} idx={idx} />}
                                {errors[idx] && <Typography color="error">{errors[idx]?.message as string}</Typography>}
                            </Box>
                        ))}
                        <Button onClick={() => setOpenConfirm(true)}>제출</Button>
                    </Box>
                </Modal>
            </form>
        </>
    )
}

export default RecruitFormModal;