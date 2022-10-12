/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from 'react'

export default function MdImage({ src = '', alt = '' }: JSX.IntrinsicElements['img']) {
  const imgPropertiesMatch = alt.match(/.*#([\d\D]*)#$/)
  const [imagePos, setImagePos] = useState('flex-start')
  let _imagePos = 'flex-start'
  let imgElement: ReactElement = (
    <img style={{ display: 'block', imageRendering: '-webkit-optimize-contrast' }} src={src} alt={alt} />
  )

  if (imgPropertiesMatch) {
    const [pos = _imagePos, zoom = '100', invert = 'false'] = imgPropertiesMatch[1].split(';')

    _imagePos = pos

    imgElement = (
      <img
        style={{
          display: 'block',
          zoom: `${zoom}%`,
          imageRendering: '-webkit-optimize-contrast',
          filter: invert === 'true' ? `invert(var(--md-image-invert))` : undefined,
          transition: 'filter var(--u-dur)',
        }}
        src={src}
        alt={alt.replace(`#${imgPropertiesMatch[1]}#`, '')}
      />
    )
  }

  useEffect(() => setImagePos(_imagePos), [_imagePos])

  return (
    <picture
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: imagePos,
      }}
    >
      <source srcSet={src} type={`image/${src?.split('.').pop()}`} />
      {imgElement}
    </picture>
  )
}
