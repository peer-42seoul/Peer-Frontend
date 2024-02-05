'use client'

import React from 'react'
import {
  Button,
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
      <Button
        variant={variant}
        href={convertLink(href)}
        sx={style.button}
        disabled={!href}
      >
        <InsertLinkOutlinedIcon />
      </Button>
    </LinkTooltip>
  )
}

export default LinkButton
