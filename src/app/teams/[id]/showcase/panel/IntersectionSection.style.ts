export const contentBox = (isPc: boolean) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  width: '100%',
  height: isPc ? 'auto' : '20.75rem',
  gap: '1rem',
  backgroundColor: 'background.secondary',
})

export const textInButton = {
  textAlign: 'center' as const,
  fontWeight: '600',
  fontSize: '0.75rem',
}

export const isPublishedButton = {
  width: 'auto',
  height: '2rem',
}
