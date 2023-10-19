import React, { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

type Props = {
  handler: (string: string) => void,
  stringVal: string
}

function TextEditor({handler, stringVal}: Props) {
  // const [value, setValue] = useState<string>('')

  const ReactQuill = useMemo(() => (
    dynamic(() => import('react-quill'), {ssr: false})
  ), []) 

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

  // useEffect(() => {
  //   console.log(value)
  // }, [value])
  
  return (
    <div className='text-eerie_black'>
      <ReactQuill 
        theme='snow'
        value={stringVal}
        onChange={(e) => handler(e)}
        modules={modules}
        formats={formats}
      />
    </div>
  )
}

export default TextEditor
