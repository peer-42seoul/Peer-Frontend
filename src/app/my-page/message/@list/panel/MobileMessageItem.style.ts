const TRANSITION_DURATION = '800ms'

export const swappableWrapper = {
  width: '100%',
  height: '4.5rem',
  transition: `transform ${TRANSITION_DURATION}`,
}

export const removeButton = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: `opacity ${TRANSITION_DURATION}`,
  color: 'red.strong',
  backgroundColor: 'red.tinted',
  borderRadius: '0',
  padding: '0rem 0.25rem',
}
