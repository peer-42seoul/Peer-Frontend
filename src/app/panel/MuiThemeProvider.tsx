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

  interface PaletteColorType {
    strong?: string
    normal?: string
    alternative?: string
    tinted?: string
    base?: string
    assistive?: string
  }

  interface CommonColors {
    red: PaletteColorType
    blue: PaletteColorType
    purple: PaletteColorType
    green: PaletteColorType
    yellow: PaletteColorType
    pink: PaletteColorType
  }

  interface CommonColorsOptions {
    red?: PaletteColorType
    blue?: PaletteColorType
    purple?: PaletteColorType
    green?: PaletteColorType
    yellow?: PaletteColorType
    pink?: PaletteColorType
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

  interface PaletteColors {
    common: CommonColors
  }

  interface PaletteColorsOptions {
    common?: CommonColorsOptions
  }

  interface Palette {
    line: LineColors
  }
  interface PaletteOptions {
    line?: LineColors
  }

  interface TypeText {
    strong: string
    normal: string
    alternative: string
    assistive: string
    disable: string
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
}

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // const mode = useDarkMode().darkMode

  const theme = createTheme({
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
        '@media (max-width: 480px)': {
          fontSize: '15px',
          fontWeight: 600,
        },
      } as React.CSSProperties,
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
      common: {
        red: {
          strong: '#FF5833',
          normal: '#FF6D4D',
          alternative: '#FF7D61',
          tinted: '#FF6D4D33',
        },
        blue: {
          strong: '#3A5DCF',
          normal: '#4E6ED4',
          alternative: '#6681DB',
          tinted: '#4E6ED433',
        },
        purple: {
          strong: '#6F62FE',
          normal: '#877CFE',
          alternative: '#A39BFD',
          tinted: '#877CFE33',
        },
        green: {
          strong: '#489B08',
          normal: '#53B309',
          alternative: '#61CD0E',
          tinted: '#53B30933',
        },
        yellow: {
          strong: '#FFA805',
          normal: '#FFB01F',
          alternative: '#FDBC44',
          tinted: '#FFB01F33',
        },
        pink: {
          strong: '#C44ECA',
          normal: '#CB62D0',
          alternative: '#D581D9',
          tinted: '#CB62D033',
        },
      },
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

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MuiThemeProvider
