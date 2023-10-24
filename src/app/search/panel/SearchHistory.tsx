import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { cloneElement, ReactElement } from 'react'

function generate(element: ReactElement) {
  return [0, 1, 2, 3].map((value) =>
    cloneElement(element, {
      key: value,
    }),
  )
}

export default function SearchHistory() {
  return (
    <>
      <List>
        <Typography padding={1} fontSize={'small'} color={'grey'}>
          최근 검색어
        </Typography>
        {generate(
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary="Single-line item" />
          </ListItem>,
        )}
      </List>
    </>
  )
}
