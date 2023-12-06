import React, { 
  useCallback, 
  useMemo, 
  useRef 
} from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { requestUpload, adjustUploadInsert } from '@/utils/s3/s3-service'

const QuillWrapper = dynamic(async() => {
  const { default: RQ } = await import('react-quill')
  const QuillWithRef = ({ forwardedRef, ...props}) => (
    <RQ ref={forwardedRef} {...props} />
  )
  return QuillWithRef
}, {  ssr: false })

function TextEditor ({
  stateHandler, 
  stringVal
})  {

  const quill = useRef(null)

  const handleUpload = useCallback(() => {
    const theDate = new Date()
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = () => {
      const file = input.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        adjustUploadInsert(reader.result, async(adjustedImage) => {
          const { url } = await requestUpload(adjustedImage, theDate)
          if(quill.current) {
            const methods = quill.current.getEditor()
            const range = methods.getSelection()
            methods.insertEmbed(range.index, 'image', url, 'user')
          }

        })
      }
    }
  }, [quill])

  const formats = useMemo(() => ([
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
  ]), [])

  const modules = useMemo(() => ({
    toolbar: {
      container: [
      ['bold', 'italic', 'list'], ['link', 'image'],
      ],
      handlers: {
        'image': handleUpload
      }
    },
  }), [handleUpload])

  const handleChange = useCallback((
    content, 
    delta,
    source,
    editor,
  ) => {
    stateHandler(content)
    console.log('content => ', content)
    console.log('delta after => ', delta)
  }, [stateHandler])
  
  return (
    <div className='text-eerie_black'>
      <QuillWrapper
        id='quill-editor'
        theme='snow'
        value={stringVal}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        forwardedRef={quill}
      />
    </div>
  )
}

export default TextEditor
