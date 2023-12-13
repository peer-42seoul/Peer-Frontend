'use client'

// import { useDarkMode } from '@/states/useDarkMode'
import { ThemeProvider, createTheme } from '@mui/material/styles'

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
  }

  interface SimplePaletteColorOptions {
    strong?: string
    normal?: string
    alternative?: string
    tinted?: string
    base?: string
    assistive?: string
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
  }
}

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // const mode = useDarkMode().darkMode

  let theme = createTheme()

  theme = createTheme(theme, {
    breakpoints: {
      values: {
        xs: 0,
        sm: 480, // mobile과 pc를 구분하기 위해 테마 설정을 하였습니다.
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            '@media (min-width: 1200px)': {
              maxWidth: '1280px',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            minWidth: '20px',
            minHeight: '20px',
          },
        },
      },
      MuiBox: {
        styleOverrides: {
          root: {
            minWidth: '40px',
          },
        },
      },
      MuiTypography: {
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
      },
    },
    typography: {
      fontFamily: 'Pretendard Variable, sans-serif',
      HeadlineEmphasis: {
        fontSize: '32px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '150%',
      },
      Headline: {
        fontSize: '32px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '150%',
      },
      Title1Emphasis: {
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '150%',
      },
      Title1: {
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '150%',
      },
      Title2Emphasis: {
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '150%',
      },
      Title2: {
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '150%',
      },
      Title3Emphasis: {
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '150%',
      },
      Title3: {
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '150%',
      },
      Body1Emphasis: {
        fontSize: '15px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '150%',
      },
      Body1: {
        fontSize: '15px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '150%',
      },
      Body2Emphasis: {
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '150%',
      },
      Body2: {
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '150%',
      },
      CaptionEmphasis: {
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
      },
      Caption: {
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
      },
      Tag: {
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '150%',
      },
    },
    palette: {
      mode: 'dark',
      red: theme.palette.augmentColor({
        color: {
          main: '#FF5833',
          strong: '#FF5833',
          normal: '#FF6D4D',
          alternative: '#FF7D61',
          tinted: '#FF6D4D33',
        },
        name: 'red',
      }),
      blue: theme.palette.augmentColor({
        color: {
          main: '#3A5DCF',
          strong: '#3A5DCF',
          normal: '#4E6ED4',
          alternative: '#6681DB',
          tinted: '#4E6ED433',
        },
        name: 'blue',
      }),
      purple: theme.palette.augmentColor({
        color: {
          main: '#6F62FE',
          strong: '#6F62FE',
          normal: '#877CFE',
          alternative: '#A39BFD',
          tinted: '#877CFE33',
        },
        name: 'purple',
      }),
      green: theme.palette.augmentColor({
        color: {
          main: '#489B08',
          strong: '#489B08',
          normal: '#53B309',
          alternative: '#61CD0E',
          tinted: '#53B30933',
        },
        name: 'green',
      }),
      yellow: theme.palette.augmentColor({
        color: {
          main: '#FFA805',
          strong: '#FFA805',
          normal: '#FFB01F',
          alternative: '#FDBC44',
          tinted: '#FFB01F33',
        },
        name: 'yellow',
      }),
      pink: theme.palette.augmentColor({
        color: {
          main: '#C44ECA',
          strong: '#C44ECA',
          normal: '#CB62D0',
          alternative: '#D581D9',
          tinted: '#CB62D033',
        },
        name: 'pink',
      }),
      background: {
        primary: '#060623',
        secondary: '#18182B',
        tertiary: '#22223A',
        paper: '#060623',
        default: '#060623',
      },
      line: {
        base: '#35373E',
        alternative: '#2C2E35',
      },
      text: {
        strong: '#FFFFFF',
        primary: '#F6F6F6',
        normal: '#F6F6F6',
        alternative: '#9B9B9B',
        secondary: '#9B9B9B',
        assistive: '#42444C',
        disable: '#292C32',
        disabled: '#292C32',
      },
      primary: {
        main: '#6F62FE',
        light: '#A39BFD',
        dark: '#877CFE',
      },
    },
  })

  theme = createTheme(theme, {
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            '@media (min-width: 1200px)': {
              maxWidth: '1280px',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            minWidth: '40px',
          },
        },
      },
      MuiBox: {
        styleOverrides: {
          root: {
            minWidth: '40px',
          },
        },
      },
      MuiTypography: {
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
      },
      MuiTextField: {
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
            },
            '& .MuiInputBase-inputMultiline': {
              height: 'auto',
              padding: '12px',
            },
          },
        },
      },
      MuiAutocomplete: {
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
      },
    },
  })

  theme = createTheme(theme, {
    typography: {
      fontFamily: 'Pretendard Variable, sans-serif',
      HeadlineEmphasis: {
        color: theme.palette.text.normal,
      },
      Headline: {
        color: theme.palette.text.normal,
      },
      Title1Emphasis: {
        color: theme.palette.text.normal,
      },
      Title1: {
        color: theme.palette.text.normal,
      },
      Title2Emphasis: {
        color: theme.palette.text.normal,
      },
      Title2: {
        color: theme.palette.text.normal,
      },
      Title3Emphasis: {
        color: theme.palette.text.normal,
      },
      Title3: {
        color: theme.palette.text.normal,
      },
      Body1Emphasis: {
        color: theme.palette.text.normal,
      },
      Body1: {
        color: theme.palette.text.normal,
      },
      Body2Emphasis: {
        color: theme.palette.text.normal,
      },
      Body2: {
        color: theme.palette.text.normal,
      },
      CaptionEmphasis: {
        color: theme.palette.text.normal,
      },
      Caption: {
        color: theme.palette.text.normal,
      },
      Tag: {
        color: theme.palette.text.normal,
      },
      h1: {
        color: theme.palette.text.normal,
      },
      h2: {
        color: theme.palette.text.normal,
      },
      h3: {
        color: theme.palette.text.normal,
      },
      h4: {
        color: theme.palette.text.normal,
      },
      h5: {
        color: theme.palette.text.normal,
      },
      h6: {
        color: theme.palette.text.normal,
      },
      subtitle1: {
        color: theme.palette.text.normal,
      },
      subtitle2: {
        color: theme.palette.text.normal,
      },
      body1: {
        color: theme.palette.text.normal,
      },
      body2: {
        color: theme.palette.text.normal,
      },
      button: {
        color: theme.palette.text.normal,
      },
      caption: {
        color: theme.palette.text.normal,
      },
      overline: {
        color: theme.palette.text.normal,
      },
    },
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MuiThemeProvider
