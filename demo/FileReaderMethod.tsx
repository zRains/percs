import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

const FileReaderMethodStyled = styled.div`
  padding: 10px;
  margin-bottom: 16px;
  border: 2px dotted var(--c-divider);
  border-radius: 5px;
  background: var(--c-bg-mute);
  transition: border-color var(--u-dur), background-color var(--u-dur);

  .inputSec {
    margin-bottom: 10px;
    input {
      margin: 0 10px;
      padding: 4px 8px;
      width: 15ch;
      outline: none;
      border: 2px solid var(--c-divider);
      border-radius: 3px;
      font-family: var(--f-slab);
    }
  }

  .resultSec {
    .readAsText,
    .readAsArrayBuffer {
      margin-bottom: 10px;
    }
  }
`

export default function FileReaderMethod() {
  const [inputVal, setInputVal] = useState('')
  const [textRef, setTextRef] = useState('')
  const [arrayBufferRef, setArrayBufferRef] = useState('[]')
  const [dataURLRef, setDataURLRef] = useState('data:')

  function inputHandle(e: FormEvent<HTMLInputElement>) {
    const n = (e.target as HTMLInputElement).value
    const blob = new Blob([n])
    const textReader = new FileReader()
    const arrayBufferReader = new FileReader()
    const dataURLReader = new FileReader()

    textReader.readAsText(blob)
    textReader.onload = function () {
      setTextRef(this.result as string)
    }

    arrayBufferReader.readAsArrayBuffer(blob)
    arrayBufferReader.onload = function () {
      setArrayBufferRef(JSON.stringify(Array.from(new Uint8Array(this.result as ArrayBuffer))))
    }

    dataURLReader.readAsDataURL(blob)
    dataURLReader.onload = function () {
      setDataURLRef(this.result as string)
    }

    setInputVal(n)
  }

  return (
    <FileReaderMethodStyled className="FileReaderMethod">
      <section className="inputSec">
        <span>输入</span>
        <input value={inputVal} type="text" maxLength={10} onInput={inputHandle} />
        <span>以构造Blob对象 🙌</span>
      </section>
      <section className="resultSec">
        <div className="readAsText">readAsText: {textRef}</div>
        <div className="readAsArrayBuffer">readAsArrayBuffer: {arrayBufferRef}</div>
        <div className="readAsDataURL">readAsDataURL: {dataURLRef}</div>
      </section>
    </FileReaderMethodStyled>
  )
}
