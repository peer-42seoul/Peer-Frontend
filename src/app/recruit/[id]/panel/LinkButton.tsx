'use client'
import KakaoIcon from '../../../../../public/icons/public/kakaoIcon.svg'
import GoogleIcon from '../../../../../public/icons/public/googleIcon.svg'
import SlackIcon from '../../../../../public/icons/public/slackIcon.svg'
import InstagramIcon from '../../../../../public/icons/public/instagramIcon.svg'

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

const LinkTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: style.tooltip,
}))

const LinkButton = ({
  href,
  variant,
}: {
  href: string
  variant: 'text' | 'outlined' | 'contained'
}) => {
  const getIcon = (link: string) => {
    convertLink(link)

    if (link.includes('kakao')) {
      return (
        <Button
          variant={variant}
          href={convertLink(href)}
          sx={style.button}
          style={{ padding: 0 }}
          disabled={!href}
        >
          <SvgIcon>
            <KakaoIcon />
          </SvgIcon>
        </Button>
      )
    } else if (link.includes('google')) {
      return (
        <Button
          variant={variant}
          href={convertLink(href)}
          sx={style.button}
          disabled={!href}
        >
          <SvgIcon>
            <GoogleIcon />
          </SvgIcon>
        </Button>
      )
    } else if (link.includes('slack')) {
      return (
        <Button
          variant={variant}
          href={convertLink(href)}
          sx={style.button}
          disabled={!href}
        >
          <SvgIcon>
            <SlackIcon />
          </SvgIcon>
        </Button>
      )
    } else if (link.includes('instagram')) {
      return (
        <Button
          variant={variant}
          href={convertLink(href)}
          sx={style.button}
          disabled={!href}
        >
          <SvgIcon>
            <InstagramIcon />
          </SvgIcon>
        </Button>
      )
    } else {
      return (
        <Button
          variant={variant}
          href={convertLink(href)}
          sx={style.button}
          disabled={!href}
        >
          <InsertLinkOutlinedIcon />
        </Button>
      )
    }
  }

  const convertLink = (link: string) => {
    const httpPattern = /^https?:\/\//i
    if (!httpPattern.test(link)) {
      return `http://${link}`
    }
    return link
  }
  //@todo 이동불가능한 url 처리
  return (
    <LinkTooltip placement="bottom-start" title={href}>
      {getIcon(href)}
    </LinkTooltip>
  )
}

export default LinkButton
