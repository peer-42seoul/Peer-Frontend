import FormCheckbox from "@/app/panel/FormCheckbox";
import { FormControl, FormGroup } from "@mui/material";

export type CheckQuestionList = string[];

const CheckQuestionForm = ({ optionList, control, idx }: { optionList: CheckQuestionList, control: any, idx: number }) => {

    return (
        <FormControl component='fieldset'>
            <FormGroup>
                {optionList?.map((label: string, index: number) => {
                    return (
                        <FormCheckbox
                            name={`${idx}[${index}]`}
                            label={label}
                            control={control}
                            key={index}
                        />
                    )
                })}
            </FormGroup>
        </FormControl>
    );
}

export default CheckQuestionForm;