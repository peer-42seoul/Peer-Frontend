import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ProjectSort } from "../page";

interface SelectSortProps {
    sort: ProjectSort;
    setSort: React.Dispatch<React.SetStateAction<ProjectSort>>;
}

const SelectSort = ({ sort, setSort }: SelectSortProps) => {

    const handleChange = (event: SelectChangeEvent) => {
        setSort(event.target.value as ProjectSort);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
                value={sort}
                onChange={handleChange}
            >
                <MenuItem value={'recent'}>최신순</MenuItem>
                <MenuItem value={'old'}>오래된순</MenuItem>
                <MenuItem value={'popular'}>인기순</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectSort;