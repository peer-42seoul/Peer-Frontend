import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

interface SelectSortProps {
    sort: 'recent' | 'old' | 'popular';
    setSort: React.Dispatch<React.SetStateAction<'recent' | 'old' | 'popular'>>;
}

const SelectSort = ({ sort, setSort }: SelectSortProps) => {
    const [sort, setSort] = useState<'recent' | 'old' | 'popular'>('recent');

    const handleChange = (event: SelectChangeEvent) => {
        setSort(event.target.value as 'recent' | 'old' | 'popular');
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