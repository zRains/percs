import styled from '@emotion/styled'

type Props = {
  title: string
  desc: string
}

const PRPageBannerStyled = styled.div`
  margin-bottom: calc(var(--u-gap) * 2);

  .BannerTitle {
    margin-bottom: calc(var(--u-gap) * 1.8);
    font-weight: 700;
    font-size: 2rem;
  }

  .BannerDesc {
    margin: 0;
    border-left: 0.25em solid var(--c-divider);
    padding-left: calc(var(--u-gap) * 2);
  }
`

export default function PRPageBanner({ title, desc }: Props) {
  return (
    <PRPageBannerStyled className="">
      <h1 className="BannerTitle ClearMP">{title}</h1>
      <blockquote className="BannerDesc">
        <p className="ClearMP">{desc}</p>
      </blockquote>
    </PRPageBannerStyled>
  )
}
