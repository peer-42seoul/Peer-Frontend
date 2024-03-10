'use client'
import KakaoIcon from '../../../../../public/icons/public/kakaoIcon.svg'
import GoogleIcon from '../../../../../public/icons/public/googleIcon.svg'
import SlackIcon from '../../../../../public/icons/public/slackIcon.svg'
import DiscordIcon from '../../../../../public/icons/public/discordIcon.svg'

import React from 'react'
import {
  Button,
  SvgIcon,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from '@mui/material'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import * as style from './LinkButton.style'

interface IIconProps {
  link: string
  variant: 'text' | 'outlined' | 'contained'
}

const LinkTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: style.tooltip,
}))

const ResponsiveIcon = ({ link, variant }: IIconProps) => {
  const convertLink = (link: string) => {
    const httpPattern = /^https?:\/\//i
    if (!httpPattern.test(link)) {
      return `http://${link}`
    }
    return link
  }

  // 추가할 아이콘이 더 생기면 조건문을 더 추가하고, icon/public 폴더에 아이콘을 추가해주세요.
  const iconHnadler = (link: string) => {
    if (link.includes('kakao')) {
      return KakaoIcon
    } else if (link.includes('google')) {
      return GoogleIcon
    } else if (link.includes('slack')) {
      return SlackIcon
    } else if (link.includes('discord')) {
      return DiscordIcon
    } else {
      return InsertLinkOutlinedIcon
    }
  }
  const Icon = iconHnadler(link)

  return (
    <Button
      variant={variant}
      href={convertLink(link)}
      sx={style.button}
      disabled={!link}
    >
      <SvgIcon>
        <Icon />
      </SvgIcon>
    </Button>
  )
}

const LinkButton = ({
  href,
  variant,
}: {
  href: string
  variant: 'text' | 'outlined' | 'contained'
}) => {
  //@todo 이동불가능한 url 처리
  return (
    <LinkTooltip placement="bottom-start" title={href}>
      {/* 모집글 링크버튼 */}
      <ResponsiveIcon link={href} variant={variant} />
    </LinkTooltip>
  )
}

export default LinkButton
