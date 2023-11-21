'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
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

  // allow configuration using `createTheme`
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
}

// Update the Typography's variant prop options
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

export const theme = createTheme({
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
})

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MuiThemeProvider
