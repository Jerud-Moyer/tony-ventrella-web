import { AlertProps, Slide, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import React, { forwardRef, useEffect, useState } from 'react'

interface Props {
  severity: 'success' | 'warning';
  message: string | null;
}

function Notification({severity, message}: Props) {
  const [show, setShow] = useState<boolean>(false)

  const slide = (props: any) => {
    return <Slide {...props} direction='up' />
  }

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  })

  const handleClose = () => {
    setShow(false)
  }

  useEffect(() => {
    if(message && message.length) {
      setShow(true)
    }
  }, [message])


  return (
    <div>
      <Snackbar
        open={show}
        autoHideDuration={7000}
        onClose={handleClose}
        TransitionComponent={slide}
      >
        <Alert
          severity={severity}
          onClose={handleClose}
          sx={{width: '100%'}}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Notification
