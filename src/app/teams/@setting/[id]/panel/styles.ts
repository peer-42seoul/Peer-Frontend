// Buttons

const closeButtonStyle = {
  position: 'absolute',
  top: '0.3rem',
  right: '0.3rem',
  width: '1rem',
  height: '1rem',
  zIndex: '100',
}

const comfirmModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const deleteModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export { closeButtonStyle, comfirmModalStyle, deleteModalStyle }
