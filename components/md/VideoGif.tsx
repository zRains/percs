import styled from '@emotion/styled'

type Props = {
  src: string
}

const VideoGifStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

export default function VideoImage({ src }: Props) {
  return (
    <VideoGifStyled>
      <video style={{ width: '100%' }} src={src} muted={true} autoPlay={true} loop />
    </VideoGifStyled>
  )
}
