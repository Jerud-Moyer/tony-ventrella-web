import { Column } from '@/types'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Accordian from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordianDetails from '@mui/material/AccordionDetails'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Pagination } from '@mui/material'
import { deleteColumn, getColumns, getCount, getCountPublished } from '@/utils/api/column-utils'

type Props = {
  handleInitEdit: (id: number | null) => void,
  handleDeleteColumn: (id: number) => void
}

function EditColumn({ 
  handleInitEdit,
  handleDeleteColumn
} : Props) {
  const [columns, setColumns] = useState<Column[] | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)
  const [idForDelete, setIdForDelete] = useState<number | null>(null)
  const [pageCount, setPageCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const handleConfirmDelete = (id: number | null) => {
    setShowDeleteConfirm(false)
    if(id) {
      handleDeleteColumn(id)
      handleGetColumns(1)
    }
  }

  const handleOpenDeleteConfirm = (id: number | null): void => {
    setIdForDelete(id)
    setShowDeleteConfirm(true)
  }

  const handleCloseDeleteConfirm = (): void => {
    setShowDeleteConfirm(false)
  }

  const handleGetColumns = (page: number): void => {
    setLoading(true)
    getColumns(page)
      .then(res => setColumns(res))
      .finally(() => setLoading(false))
  }

  const handlePaginationChange = (event: ChangeEvent<unknown>, page: number): void => {
    handleGetColumns(page)
  }

  useEffect(() => {
    getCount()
      .then(count => setPageCount(Math.ceil(count.count / 10)))
    handleGetColumns(1)
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
                  {new Date(col.created_at).toLocaleDateString()} 
                  {col.title ? ` - ${col.title}` : null}
                  <span className={!col.published ? 'text-rose-700' : ''}>
                    {col.published ? ' - published' : ' - not published'}
                  </span>
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
          : <p>no columns to display</p>
        }
        {pageCount && 
          <div className='flex justify-center p-6'>
            <Pagination 
              count={pageCount} 
              shape="rounded" 
              onChange={handlePaginationChange}  
            />
          </div>
        }
        {loading &&
          <div>
            <LinearProgress />
          </div>        
        }
      <Dialog
        open={showDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
      >
        <DialogTitle> 
          Are you sure you wish to delete this column?
        </DialogTitle>
        <DialogContent>
          This action will permanently delete this column!
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='warning'
            onClick={() => handleConfirmDelete(idForDelete)}
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
