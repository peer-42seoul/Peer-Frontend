const TRANSITION_DURATION = '800ms'

export const messageItem = {
  marginBottom: '1rem',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'line.alternative',
}

export const swappableWrapper = {
  boxSizing: 'border-box',
  width: '100%',
  height: '4.5rem',
  transition: `transform ${TRANSITION_DURATION}`,
}

export const removeButton = {
  boxSizing: 'border-box',
  // width: '2.5rem',
  minWidth: '2.5rem',
  maxWidth: '2.5rem',
  height: '4.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: `opacity ${TRANSITION_DURATION}`,
  backgroundColor: 'red.tinted',
  borderRadius: '0',
  padding: '0rem 0.25rem',
  marginLeft: '0.5rem',
}

export const listItemButton = {
  flex: '1 0 100%',
}
