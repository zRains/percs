import Head from 'next/head'
import type { ReactElement } from 'react'
import PRMainHeaderLayout from '../../layouts/PRMainHeaderLayout'
import { NextPageWithLayout } from '../_app'
import { SITE_CONFIG } from '../../config'
import PRPageBanner from '../../components/PRPageBanner'
import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'

const ProjectsIndexStyled = styled.ul`
  margin-top: calc(var(--u-gap) * 3);

  .ProjectCategoryName {
    margin-bottom: var(--u-gap);
  }

  .ProjectContainer {
    .ProjectItem {
      display: inline-flex;
      text-decoration: none;
      color: inherit;
      padding: calc(var(--u-gap) * 1.8);
      border-radius: 5px;

      .ProjectDetails {
        margin-left: var(--u-gap);

        .ProjectDesc {
          font-size: 0.9rem;
          color: var(--c-text-2);
        }
      }

      &:hover {
        background-color: var(--c-bg-mute);
      }
    }
  }
`

const ProjectsIndexPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>zRain | Projects</title>
      </Head>
      <PRPageBanner title="Projects" desc="Creation and fantasy when bored 🦢."></PRPageBanner>
      <ProjectsIndexStyled className="ResetList">
        {SITE_CONFIG.projects.map((categories) => (
          <li key={categories.category}>
            <h2 className="ProjectCategoryName ClearMP">{categories.category}</h2>
            <div className="ProjectContainer">
              {categories.items.map((project) => (
                <Link
                  className="ProjectItem"
                  href={project.preview || project.repo || ''}
                  target={'_blank'}
                  key={project.name}
                >
                  <Image className="ProjectIcon" src={project.icon} height={40} width={40} alt={project.name} />
                  <div className="ProjectDetails">
                    <div className="ProjectName">{project.name}</div>
                    <div className="ProjectDesc">{project.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ProjectsIndexStyled>
    </>
  )
}

ProjectsIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <PRMainHeaderLayout>{page}</PRMainHeaderLayout>
}

export default ProjectsIndexPage
