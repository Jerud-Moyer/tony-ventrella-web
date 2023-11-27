import { Column } from '@/types'
import React, { useEffect, useState } from 'react'
import Accordian from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordianDetails from '@mui/material/AccordionDetails'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { deleteColumn } from '@/utils/api/api-utils'

type Props = {
  handleInitEdit: (id: number | null) => void
}

function EditColumn({ handleInitEdit } : Props) {
  const [columns, setColumns] = useState<Column[] | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)
  const [idForDelete, setIdForDelete] = useState<number | null>(null)

  const handleDeleteColumn = (id: number | null): void => {
    if(id) {
      deleteColumn(id)
      setShowDeleteConfirm(false)
    }
  }

  const handleOpenDeleteConfirm = (id: number | null): void => {
    setIdForDelete(id)
    setShowDeleteConfirm(true)
  }

  const handleCloseDeleteConfirm = (): void => {
    setShowDeleteConfirm(false)
  }

  useEffect(() => {
    fetch('api/blog/get-all/1')
      .then(res => res.json())
      .then(json => {
        console.log('all-posts => ', json)
        setColumns(json.posts)})
  }, [])


  return (
    <div className='p-24'>
        {columns ?
          columns.map((col, i) => (
            <Accordian key={`column-${col.created_at}-${i}`} >
              <AccordionSummary
                expandIcon={<ArrowForwardIosSharpIcon/>}
              >
                <p  
                  className='text-eerie_black text-2xl'
                   
                >
                  {new Date(col.created_at).toLocaleDateString()} {col.title ? ` - ${col.title}` : null}
                </p>
              </AccordionSummary>
              <AccordianDetails>
                <div className='relative pt-16'>
                  <div className='absolute top-2 left-0 mb-4'>
                    <Button 
                      variant='contained' 
                      sx={{'marginRight': '20px'}}
                      onClick={() => handleInitEdit(col.id)}  
                    >
                      edit
                    </Button>
                    <Button 
                      variant='contained'
                      onClick={() => handleOpenDeleteConfirm(col.id)}  
                    >
                      delete
                    </Button>
                  </div>
                  <p dangerouslySetInnerHTML={{__html: col.content}}/>
                </div>
              </AccordianDetails>
            </Accordian>
          ))
          : <p>no colums to display</p>
        }
      <Dialog
        open={showDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
      >
        <DialogTitle> 
          Are you sure you wish to delete this column?
        </DialogTitle>
        <DialogContent>
          This action will permanently delete thiss column!
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='warning'
            onClick={() => handleDeleteColumn(idForDelete)}
          >
            Delete
          </Button>
          <Button
            variant='outlined'
            onClick={handleCloseDeleteConfirm}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditColumn
