import { Snackbar } from '@mui/material'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'
import React, { useEffect, useState } from 'react'

interface Props {
  message: string | null;
  severity: AlertColor
}


function Alert({ message, severity }: Props) {
  const [showAlert, setShowAlert] = useState<boolean>(false)
  // eslint-disable-next-line react/display-name
  const AlertContent = React.forwardRef<HTMLDivElement, AlertProps>((
    props,
    ref
  ) => {
    return <MuiAlert
      elevation={6}
      ref={ref}
      variant='filled'
      {...props}
    />
  })

  const handleHideAlert = () => {
    setShowAlert(false)
  }

  useEffect(() => {
    if(message) {
      setShowAlert(true)
    }
  }, [message])

  return (
    <div>
      {showAlert && 
        <Snackbar
          open={showAlert}
          autoHideDuration={7000}
          onClose={handleHideAlert}
        >
          <AlertContent
            severity={severity}
            sx={{
              width: '100%'
            }}
          >
            { message }
          </AlertContent>
        </Snackbar>
      }
    </div>
  )
}

export default Alert
