export const StartEndDateViewerBox = (isPc: boolean) => ({
  display: isPc ? 'flex' : 'none',
  justifyContent: isPc ? 'space-between' : 'none',
  gap: '1rem',
  gridArea: 'startEndDateViewer',
  width: '100%',
  height: isPc ? '6.25rem' : '3.375rem',
})
