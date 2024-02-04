'use client'
import { useDarkMode } from '@/states/useDarkMode'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { useEffect } from 'react'

declare module '@mui/material/styles' {
  // typography variant 추가
  interface TypographyVariants {
    HeadlineEmphasis: React.CSSProperties
    Headline: React.CSSProperties
    Title1Emphasis: React.CSSProperties
    Title1: React.CSSProperties
    Title2Emphasis: React.CSSProperties
    Title2: React.CSSProperties
    Title3Emphasis: React.CSSProperties
    Title3: React.CSSProperties
    Body1Emphasis: React.CSSProperties
    Body1: React.CSSProperties
    Body2Emphasis: React.CSSProperties
    Body2: React.CSSProperties
    CaptionEmphasis: React.CSSProperties
    Caption: React.CSSProperties
    Tag: React.CSSProperties
  }

  // typography 추가된 variant 커스텀 할 수 있도록 설정
  interface TypographyVariantsOptions {
    HeadlineEmphasis?: React.CSSProperties
    Headline?: React.CSSProperties
    Title1Emphasis?: React.CSSProperties
    Title1?: React.CSSProperties
    Title2Emphasis?: React.CSSProperties
    Title2?: React.CSSProperties
    Title3Emphasis?: React.CSSProperties
    Title3?: React.CSSProperties
    Body1Emphasis?: React.CSSProperties
    Body1?: React.CSSProperties
    Body2Emphasis?: React.CSSProperties
    Body2?: React.CSSProperties
    CaptionEmphasis?: React.CSSProperties
    Caption?: React.CSSProperties
    Tag?: React.CSSProperties
  }

  interface PaletteColor {
    strong?: string
    normal?: string
    alternative?: string
    tinted?: string
    base?: string
    assistive?: string
    disable?: string
    // 컬러 팔레트에 없는 컬러를 추가함.
    mobileNavTab?: string
  }

  interface SimplePaletteColorOptions {
    strong?: string
    normal?: string
    alternative?: string
    tinted?: string
    base?: string
    assistive?: string
    mobileNavTab?: string
  }

  interface TypeBackground {
    primary: string
    secondary: string
    tertiary: string
  }

  interface LineColors {
    base?: string
    alternative?: string
  }

  interface Palette {
    // common: CommonColors
    red: Palette['primary']
    blue: Palette['primary']
    purple: Palette['primary']
    green: Palette['primary']
    yellow: Palette['primary']
    pink: Palette['primary']
    line: Palette['primary']
    custom: Palette['primary']
  }

  interface PaletteOptions {
    // common?: CommonColorsOptions
    red?: PaletteOptions['primary']
    blue?: PaletteOptions['primary']
    purple?: PaletteOptions['primary']
    green?: PaletteOptions['primary']
    yellow?: PaletteOptions['primary']
    pink?: PaletteOptions['primary']
    line?: PaletteOptions['primary']
    custom?: PaletteOptions['primary']
  }

  interface TypeText {
    strong: string
    normal: string
    alternative: string
    assistive: string
    disable: string
  }

  interface TypeTextOptions {
    strong?: string
    normal?: string
    alternative?: string
    assistive?: string
    disable?: string
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom?: string
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom?: string
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    HeadlineEmphasis: true
    Headline: true
    Title1Emphasis: true
    Title1: true
    Title2Emphasis: true
    Title2: true
    Title3Emphasis: true
    Title3: true
    Body1Emphasis: true
    Body1: true
    Body2Emphasis: true
    Body2: true
    CaptionEmphasis: true
    Caption: true
    Tag: true
  }

  interface TypographyPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    text: true
    custom: true
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom: true
  }
}

declare module '@mui/material/OutlinedInput' {
  interface OutlinedInputPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom: true
  }
}

declare module '@mui/material/InputLabel' {
  interface InputLabelPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom: true
  }
}

declare module '@mui/material/Select' {
  interface SelectPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom: true
  }
}

declare module '@mui/material/Checkbox' {
  interface CheckboxPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom: true
  }
}

declare module '@mui/material/Radio' {
  interface RadioPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom: true
  }
}

declare module '@mui/material/Switch' {
  interface SwitchPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom: true
  }
}

declare module '@mui/material/Slider' {
  interface SliderPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom: true
  }
}

declare module '@mui/material/Alert' {
  interface AlertPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom: true
  }
}

declare module '@mui/material/AlertTitle' {
  interface AlertTitlePropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom: true
  }
}

declare module '@mui/material/Avatar' {
  interface AvatarPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom: true
  }
}

declare module '@mui/material/Badge' {
  interface BadgePropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom: true
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom: true
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    red: true
    blue: true
    purple: true
    green: true
    yellow: true
    pink: true
    line: true
    custom: true
  }
}

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, getModeFromLocalStorage } = useDarkMode()

  useEffect(() => {
    getModeFromLocalStorage()
  }, [])

  if (theme.palette) {
    theme.palette.red = theme.palette.augmentColor({
      color: {
        main: '#FF5833',
        strong: '#FF5833',
        normal: '#FF6D4D',
        alternative: '#FF7D61',
        tinted: '#FF6D4D33',
      },
      name: 'red',
    })
    theme.palette.blue = theme.palette.augmentColor({
      color: {
        main: '#3A5DCF',
        strong: '#3A5DCF',
        normal: '#4E6ED4',
        alternative: '#6681DB',
        tinted: '#4E6ED433',
      },
      name: 'blue',
    })
    theme.palette.purple = theme.palette.augmentColor({
      color: {
        main: '#6F62FE',
        strong: '#6F62FE',
        normal: '#877CFE',
        alternative: '#A39BFD',
        tinted: '#877CFE33',
      },
      name: 'purple',
    })
    theme.palette.green = theme.palette.augmentColor({
      color: {
        main: '#489B08',
        strong: '#489B08',
        normal: '#53B309',
        alternative: '#61CD0E',
        tinted: '#53B30933',
      },
      name: 'green',
    })
    theme.palette.yellow = theme.palette.augmentColor({
      color: {
        main: '#FFA805',
        strong: '#FFA805',
        normal: '#FFB01F',
        alternative: '#FDBC44',
        tinted: '#FFB01F33',
      },
      name: 'yellow',
    })
    theme.palette.pink = theme.palette.augmentColor({
      color: {
        main: '#C44ECA',
        strong: '#C44ECA',
        normal: '#CB62D0',
        alternative: '#D581D9',
        tinted: '#CB62D033',
      },
      name: 'pink',
    })

    theme.palette.primary = theme.palette.purple
  }

  if (theme.components) {
    theme.components.MuiContainer = {
      styleOverrides: {
        root: {
          '@media (min-width: 1200px)': {
            maxWidth: '1280px',
          },
        },
      },
    }

    theme.components.MuiButton = {
      styleOverrides: {
        root: {
          minWidth: '20px',
          minHeight: '20px',
        },
      },
    }

    theme.components.MuiSnackbar = {
      styleOverrides: {
        root: {
          left: 0,
          right: 0,
        },
      },
    }

    theme.components.MuiTypography = {
      defaultProps: {
        variantMapping: {
          HeadlineEmphasis: 'h1',
          Headline: 'h1',
          Title1Emphasis: 'h2',
          Title1: 'h2',
          Title2Emphasis: 'h3',
          Title2: 'h3',
          Title3Emphasis: 'h4',
          Title3: 'h4',
          Body1Emphasis: 'p',
          Body1: 'p',
          Body2Emphasis: 'p',
          Body2: 'p',
          CaptionEmphasis: 'span',
          Caption: 'span',
          Tag: 'span',
        },
      },
    }

    theme.components.MuiTextField = {
      styleOverrides: {
        root: {
          '& textarea': {
            rows: '1',
          },
          '& input': {
            height: '32px',
            padding: '0px 12px',
            '&::placeholder': {
              color: theme.palette.text.alternative,
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: '150%',
            },
            ':-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 50px ${theme.palette.background.tertiary} inset`,
            },
          },
          '& .MuiOutlinedInput-root': {
            padding: '0px',
            borderRadius: '4px',
            height: 'auto',
            backgroundColor: theme.palette.background.tertiary,
            fontSize: '12px',
            fontWeight: 400,
            color: theme.palette.text.normal,
            lineHeight: '150%',
            '& fieldset': {
              height: '100%',
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.purple.normal,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.purple.normal,
            },
            '&.Mui-disabled': {
              backgroundColor: theme.palette.background.tertiary,
              opacity: 0.5,
            },
            '&.Mui-error fieldset': {
              borderColor: theme.palette.red.strong,
            },
          },
          '& .MuiInputBase-inputMultiline': {
            height: 'auto',
            padding: '12px',
          },
          '.MuiFormHelperText-filled': {
            margin: 0,
            marginTop: '0.5rem',
          },
          '.MuiFormHelperText-root': {
            margin: 0,
            marginTop: '0.5rem',
          },
          '.MuiInputBase-inputMultiline': {
            padding: '1rem',
          },
        },
      },
    }

    theme.components.MuiSelect = {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          '.MuiSelect-outlined': {
            backgroundColor: theme.palette.background.tertiary,
          },
        },
      },
    }

    theme.components.MuiAutocomplete = {
      styleOverrides: {
        root: {
          '& .MuiFormControl-root': {
            '& .MuiInputBase-root': {
              '& input': {
                height: '100%',
                width: '100%',
                padding: '0 ',
              },
            },
          },
        },
      },
    }
  }

  if (theme.typography) {
    theme.typography.fontFamily = 'Pretendard Variable, sans-serif'
    theme.typography.HeadlineEmphasis = {
      fontSize: '32px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '150%',
      color: theme.palette.text.normal,
    }

    theme.typography.Headline = {
      fontSize: '32px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '150%',
      color: theme.palette.text.normal,
    }
    theme.typography.Title1Emphasis = {
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '150%',
      color: theme.palette.text.normal,
    }
    theme.typography.Title1 = {
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '150%',
      color: theme.palette.text.normal,
    }
    theme.typography.Title2Emphasis = {
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '150%',
      color: theme.palette.text.normal,
    }
    theme.typography.Title2 = {
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '150%',
      color: theme.palette.text.normal,
    }
    theme.typography.Title3Emphasis = {
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '150%',
      color: theme.palette.text.normal,
    }
    theme.typography.Title3 = {
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '150%',
      color: theme.palette.text.normal,
    }
    theme.typography.Body1Emphasis = {
      fontSize: '15px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '150%',
      color: theme.palette.text.normal,
    }
    theme.typography.Body1 = {
      fontSize: '15px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '150%',
      color: theme.palette.text.normal,
    }
    theme.typography.Body2Emphasis = {
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '150%',
      color: theme.palette.text.normal,
    }
    theme.typography.Body2 = {
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '150%',
      color: theme.palette.text.normal,
    }
    theme.typography.CaptionEmphasis = {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 'normal',
      color: theme.palette.text.normal,
    }
    theme.typography.Caption = {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 'normal',
      color: theme.palette.text.normal,
    }
    theme.typography.Tag = {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '150%',
      color: theme.palette.text.normal,
    }
    theme.typography.h1 = {
      ...theme.typography.h1,
      color: theme.palette.text.normal,
    }
    theme.typography.h2 = {
      ...theme.typography.h2,
      color: theme.palette.text.normal,
    }
    theme.typography.h3 = {
      ...theme.typography.h3,
      color: theme.palette.text.normal,
    }
    theme.typography.h4 = {
      ...theme.typography.h4,
      color: theme.palette.text.normal,
    }
    theme.typography.h5 = {
      ...theme.typography.h5,
      color: theme.palette.text.normal,
    }
    theme.typography.h6 = {
      ...theme.typography.h6,
      color: theme.palette.text.normal,
    }
    theme.typography.subtitle1 = {
      ...theme.typography.subtitle1,
      color: theme.palette.text.normal,
    }
    theme.typography.subtitle2 = {
      ...theme.typography.subtitle2,
      color: theme.palette.text.normal,
    }
    theme.typography.body1 = {
      ...theme.typography.body1,
      color: theme.palette.text.normal,
    }
    theme.typography.body2 = {
      ...theme.typography.body2,
      color: theme.palette.text.normal,
    }
    theme.typography.button = {
      ...theme.typography.button,
      color: theme.palette.text.normal,
    }
    theme.typography.caption = {
      ...theme.typography.caption,
      color: theme.palette.text.normal,
    }
    theme.typography.overline = {
      ...theme.typography.overline,
      color: theme.palette.text.normal,
    }
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  )
}

export default MuiThemeProvider
