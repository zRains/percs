import Head from 'next/head'
import type { ReactElement } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import PRMainHeaderLayout from '../../../layouts/PRMainHeaderLayout'
import { NextPageWithLayout } from '../../_app'
import { mdx } from '../../../utils/mdx'
import cn from 'classnames'
import Link from 'next/link'

type Props = {
  challenges: {
    slug: string
    path: string
    frontmatter: Record<string, any>
  }[]
}

type DifficultyProps = {
  difficulty: 'warmup' | 'easy' | 'medium' | 'hard' | 'extreme'
  color: string
  challenges: {
    slug: string
    path: string
    frontmatter: Record<string, any>
  }[]
}

const WrapContentBoxStyled = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--c-divider-light);

  .Difficulty {
    .ContentBanner {
      margin-bottom: calc(var(--u-gap) * 2);
      font-size: 1.2rem;
      font-weight: 700;

      svg {
        margin-right: calc(var(--u-gap) * 0.5);
        vertical-align: -0.125em;
        width: 1.2rem;
        height: 1.2rem;
      }
    }

    .ChallengesBox {
      a {
        display: inline-block;
        margin: 0 var(--u-gap) var(--u-gap) 0;
        padding: calc(var(--u-gap) * 0.3) calc(var(--u-gap) * 1.5);
        text-decoration: none;
        color: var(--c-white);
        border-radius: 3px;
        font-size: 0.85rem;
      }
    }

    &:not(:last-child) {
      margin-bottom: calc(var(--u-gap) * 4);
    }
  }
`

function Difficulty({ difficulty, color, challenges }: DifficultyProps) {
  return challenges.length ? (
    <div className={cn('Difficulty', difficulty.toLocaleUpperCase())}>
      <div className="ContentBanner" style={{ color }}>
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="m12 3l8 4.5v9L12 21l-8-4.5v-9L12 3m0 9l8-4.5M12 12v9m0-9L4 7.5"
          />
        </svg>
        {difficulty.toLocaleUpperCase()}
      </div>
      <div className="ChallengesBox">
        {challenges.map((challenge) => (
          <Link
            href={`/wraps/type_challenge/${challenge.slug}`}
            key={challenge.slug}
            style={{ backgroundColor: color }}
          >
            {challenge.frontmatter.order}. {challenge.frontmatter.title}
          </Link>
        ))}
      </div>
    </div>
  ) : null
}

const TypeChallengesIndexPage: NextPageWithLayout<Props> = ({ challenges }) => {
  return (
    <>
      <Head>
        <title>zRain | Wraps | Type Challenge</title>
      </Head>
      <div className="WrapBannerImage FlexCenter">
        <Image
          src={'https://res.zrain.fun/images/2022/10/type_challenges_banner.svg'}
          style={{ filter: `invert(var(--md-image-invert))` }}
          height={85}
          width={400}
          alt={'type_challenges'}
        />
      </div>
      <div className="WrapDesc">
        <p style={{ textAlign: 'center' }}>Collection of TypeScript type challenges</p>
        <p>
          This project is aimed at helping you better understand how the type system works, writing your own utilities,
          or just having fun with the challenges. We are also trying to form a community where you can ask questions and
          get answers you have faced in the real world - they may become part of the challenges!
        </p>
      </div>
      <WrapContentBoxStyled className="WrapContentBox">
        <Difficulty
          difficulty={'warmup'}
          color={'#1E8181'}
          challenges={challenges.filter((challenge) => challenge.frontmatter.difficulty === 'warmup')}
        />

        <Difficulty
          difficulty={'easy'}
          color={'#7AA924'}
          challenges={challenges.filter((challenge) => challenge.frontmatter.difficulty === 'easy')}
        />

        <Difficulty
          difficulty={'medium'}
          color={'#D1912E'}
          challenges={challenges.filter((challenge) => challenge.frontmatter.difficulty === 'medium')}
        />

        <Difficulty
          difficulty={'hard'}
          color={'#D64641'}
          challenges={challenges.filter((challenge) => challenge.frontmatter.difficulty === 'hard')}
        />

        <Difficulty
          difficulty={'extreme'}
          color={'#AD2C8E'}
          challenges={challenges.filter((challenge) => challenge.frontmatter.difficulty === 'extreme')}
        />
      </WrapContentBoxStyled>
    </>
  )
}

TypeChallengesIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <PRMainHeaderLayout>{page}</PRMainHeaderLayout>
}

export default TypeChallengesIndexPage

export async function getStaticProps() {
  const { getAllMdx } = mdx('wraps/type_challenge')
  const challenges = getAllMdx()

  return {
    props: {
      challenges,
    },
  }
}
