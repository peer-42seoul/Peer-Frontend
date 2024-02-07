export const StartEndDateViewerBox = (isPc?: boolean) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  gridArea: 'startEndDateViewer',
  width: '100%',
  height: isPc ? '6.25rem' : '3.375rem',
  marginTop: isPc ? '0' : '1.25rem',
})
