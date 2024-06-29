import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import { IJob } from '@/types/IJob'

const JobCard = ({ title, writerName, createdAt, id }: IJob) => {
  return (
    <Card
      sx={{
        borderRadius: '0.75rem',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'background.tertiary',
        boxShadow: 'none',
      }}
    >
      <Link href={`/job/${id}`} style={{ textDecoration: 'none' }}>
        {/*<Box sx={{ position: 'relative' }}>*/}
        {/*  <CuPhotoBox*/}
        {/*    style={{*/}
        {/*      width: '100%',*/}
        {/*      height: '160px',*/}
        {/*      position: 'relative',*/}
        {/*      left: '-2px',*/}
        {/*      top: '-2px',*/}
        {/*      border: '2px solid',*/}
        {/*      borderBottom: 'none',*/}
        {/*      borderColor: 'background.tertiary',*/}
        {/*      borderBottomLeftRadius: '0.75rem',*/}
        {/*      borderBottomRightRadius: '0.75rem',*/}
        {/*    }}*/}
        {/*    src={undefined}*/}
        {/*    alt="userImage"*/}
        {/*  />*/}
        {/*</Box>*/}
      </Link>
      <CardHeader
        title={
          <Typography
            variant="Body2"
            color="text.alternative"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {writerName}
          </Typography>
        }
      />
      <Link href={`/job/${id}`} style={{ textDecoration: 'none' }}>
        <CardContent
          sx={{
            '&:last-child': {
              paddingBottom: '1rem !important',
            },
            paddingY: 0,
          }}
        >
          <Stack>
            <Typography
              variant="Body1"
              color="text.normal"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </Typography>
            <Typography variant="Body2" color="text.alternative">
              {createdAt}
            </Typography>
          </Stack>
        </CardContent>
      </Link>
    </Card>
  )
}

export default JobCard
