export const mobileViewer = {
  width: '100vw',
  boxSizing: 'border-box',
  gridTemplateRows: 'auto',
  gridTemplateColumns: 'auto',
  gridTemplateAreas: `
    "teamName"
    "img"
    "startEndDateViewer"
    "skillInput"
    "teamMembers"
    "linksViewer"
    "toastViewer"
  `,
  '@media screen and (min-width: 768px)': {
    gridTemplateAreas: `
      "img"
      "teamName"
      "startEndDateViewer"
      "skillInput"
      "teamMembers"
      "linksViewer"
      "toastViewer"
    `,
  },
}

export const pcViewer = {
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
}

export const InformationViewerBox = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
}

export const imageViewer = {
  maxWidth: '100%',
  width: '100%',
  height: '13.6rem',
  gridArea: 'img',
  borderRadius: '0.25rem',
  border: '1px solid #2C2E35',
  margin: '0 0 1rem 0',
}

export const InformationViewer = (isPc: boolean) => ({
  width: isPc ? '70%' : '100%',
  gap: '2rem',
  margin: '0 0 2rem 0',
})
