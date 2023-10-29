import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Controller } from "react-hook-form";

export type RatioQuestionList = {
    number: string;
    option1: string;
    option2: string;
}

const RatioQuestionForm = ({ optionList, control, idx }: { optionList: RatioQuestionList, control: any, idx: number }) => {
    const number = parseInt(optionList?.number);
    const listArray = Array.from({ length: number }, (_, index) => index.toString());
    return (
        <Controller
            name={idx.toString()}
            control={control}
            rules={{
                required: '답변을 선택해주세요',
            }}
            defaultValue={"0"}
            render={({ field }) => (
                <RadioGroup {...field}>
                    {
                        listArray?.map((label: string, index: number) => {
                            return (
                                <Box key={index}>
                                    <FormControlLabel control={<Radio />} label={label} value={index} />
                                </Box>
                            )
                        })
                    }
                </RadioGroup>
            )}
        />
    )
}

export default RatioQuestionForm;