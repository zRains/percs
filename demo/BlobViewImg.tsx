import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import type { ReactElement } from 'react'

const BlobImgViewStyled = styled.div`
  display: flex;
  align-items: center;
  height: 120px;
  margin-bottom: 20px;
  padding: calc(var(--u-gap) * 1.5);
  border: 2px dotted var(--c-divider-light);
  border-radius: 5px;
  background-color: var(--c-bg-mute);
  transition: border-color var(--u-dur), background-color var(--u-dur);

  img {
    height: 100%;
    max-width: 60%;
    border-radius: 5px;
  }

  label[for='uploadImg'] {
    display: block;
    margin-left: 20px;

    span {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    input {
      display: none;
    }
  }
`

export default function BlobViewImg() {
  const [banner, setBanner] = useState('替换新的图片')
  const imageRef = useRef<HTMLImageElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current!.addEventListener('input', function () {
      const file = this.files![0]
      if (file && /^image\/(png|jpeg|svg|jpg)$/.test(file.type)) {
        const blobURL = window.URL.createObjectURL(file)
        imageRef.current!.src = blobURL
        imageRef.current!.onload = function () {
          setBanner('替换新的图片')
          window.URL.revokeObjectURL(blobURL)
        }
      } else setBanner('无效媒体文件！仅支持png/jpeg/svg/jpg格式文件，重新上传')
    })
  })

  return (
    <BlobImgViewStyled>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imageRef} src="/avatar.png" alt="blobViewImg" />
      <label htmlFor="uploadImg">
        <span>{banner}</span>
        <input id="uploadImg" ref={inputRef} type="file" />
      </label>
    </BlobImgViewStyled>
  )
}
