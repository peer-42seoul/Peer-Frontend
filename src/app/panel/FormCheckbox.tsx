import { Box, Checkbox, Stack } from "@mui/material"
import { Controller } from "react-hook-form"

const FormCheckbox = ({ name, label, control }: { name: string, label: string, control: any }) => {
    return (<Stack direction={"row"} alignItems={"center"}>
        <Controller
            name={name}
            control={control}
            render={({ field: { value, ...field } }) => (
                <Checkbox {...field} checked={!!value} />
            )}
        />
        <Box>{label}</Box>
    </Stack>)
}

export default FormCheckbox;