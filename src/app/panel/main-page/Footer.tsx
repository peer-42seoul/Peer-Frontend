import React from 'react'
import * as style from './Footer.style'
import { Box, List, ListItem, Typography } from '@mui/material'
import Link from 'next/link'
import useMedia from '@/hook/useMedia'

const PcList = () => {
  return (
    <List sx={style.ItemContainer}>
      <Link href={'/about'} style={{ textDecoration: 'none' }}>
        <ListItem style={style.ListItem} title="피어소개">
          피어소개
        </ListItem>
      </Link>
      <Link href={'/about/announce'} style={{ textDecoration: 'none' }}>
        <ListItem style={style.ListItem} title="공지사항">
          공지사항
        </ListItem>
      </Link>
      <Link href={'/about/dictionary'} style={{ textDecoration: 'none' }}>
        <ListItem style={style.ListItem} title="이용약관">
          PEER 개발백서
        </ListItem>
      </Link>
      <Link
        href={'/about/personal'}
        style={{ textDecoration: 'none' }}
        title="개인정보 보호방침"
      >
        <ListItem style={style.ListItem}>개인정보 보호 방침</ListItem>
      </Link>
      <Link href={'/about/service'} style={{ textDecoration: 'none' }}>
        <ListItem style={style.ListItem} title="이용약관">
          이용약관
        </ListItem>
      </Link>
      <Link href={'/about/contact'} style={{ textDecoration: 'none' }}>
        <ListItem style={style.ListItem} title="CONTACT US">
          CONTACT US
        </ListItem>
      </Link>
    </List>
  )
}

const MobileList = () => {
  return (
    <>
      <List sx={style.ItemContainer}>
        <Link href={'/about'} style={{ textDecoration: 'none' }}>
          <ListItem style={style.ListItem} title="피어소개">
            피어소개
          </ListItem>
        </Link>
        <Link href={'/about/announce'} style={{ textDecoration: 'none' }}>
          <ListItem style={style.ListItem} title="공지사항">
            공지사항
          </ListItem>
        </Link>
        <Link href={'/about/dictionary'} style={{ textDecoration: 'none' }}>
          <ListItem style={style.ListItem} title="이용약관">
            PEER 개발백서
          </ListItem>
        </Link>
      </List>
      <List sx={style.ItemContainer}>
        <Link
          href={'/about/personal'}
          style={{ textDecoration: 'none' }}
          title="개인정보 보호방침"
        >
          <ListItem style={style.ListItem}>개인정보 보호 방침</ListItem>
        </Link>
        <Link href={'/about/service'} style={{ textDecoration: 'none' }}>
          <ListItem style={style.ListItem} title="이용약관">
            이용약관
          </ListItem>
        </Link>
        <Link href={'/about/contact'} style={{ textDecoration: 'none' }}>
          <ListItem style={style.ListItem} title="CONTACT US">
            CONTACT US
          </ListItem>
        </Link>
      </List>
    </>
  )
}
const Footer = () => {
  const { isPc } = useMedia()

  return (
    <Box component={'footer'} sx={style.StyledFooter}>
      <Box
        sx={{
          ...style.ContainerWrapper,
          flexDirection: isPc ? 'row' : 'column',
        }}
      >
        {isPc ? <PcList /> : <MobileList />}
      </Box>
      <Box>
        <Typography style={{ color: '#9B9B9B', padding: '1rem' }}>
          2024 PeerStudy All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer
