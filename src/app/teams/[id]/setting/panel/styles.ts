// Buttons

const closeButtonStyle = {
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  width: '1rem',
  height: '1rem',
  zIndex: '100',
  color: 'primary.main',
}

const comfirmModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.secondary',
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

const SaveButtonStyle = {
  width: '4rem',
  right: 0,
  bottom: 0,
}

export {
  closeButtonStyle,
  comfirmModalStyle,
  deleteModalStyle,
  SaveButtonStyle,
}
