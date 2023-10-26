import React, { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { requestUpload, uploadToS3 } from '@/utils/s3/s3-service'

type Props = {
  stateHandler: (string: string) => void,
  stringVal: string,
  date: Date | null
}

function TextEditor({
  stateHandler, 
  stringVal,
  date
}: Props) {
  const ReactQuill = useMemo(() => (
    dynamic(() => import('react-quill'), {ssr: false})
  ), []) 

  const theDate = date || new Date()

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color'
  ]

  const modules = {
    toolbar: [['bold', 'italic', 'list'], ['link', 'image']]
  }


  const handleChange = (
    content: string, 
    delta: any,
    source: any,
    editor: any
  ) => {
    const { ops } = delta
    console.log('delta? => ', delta)
    if(ops && ops.length) {
      ops.forEach((op: any, i: number) => {
        if(op.insert && op.insert.image) {
          const encoded = op.insert.image.split(',')[1]
          // const buffer = Buffer.from(encoded, 'base64')
          console.log('encoded => ', encoded)
          //console.log('buffer here => ', buffer)
          requestUpload(encoded, theDate)
            .then(res => res?.json())
            .then(url => {
              console.log('from S3 => ', url)
              editor.insertEmbed(null, 'image', url)
            })
          console.log(i, ' => ', op)
        }
      })
      console.log('doing stuff')
      console.log('ops? => ', ops)
    }
    stateHandler(content)
  }

  // useEffect(() => {
  //   console.log(value)
  // }, [value])
  
  return (
    <div className='text-eerie_black'>
      <ReactQuill 
        theme='snow'
        value={stringVal}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  )
}

export default TextEditor
