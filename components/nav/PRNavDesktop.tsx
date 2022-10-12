import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
// import PRNavAppearance from './PRNavAppearance'
import PRNavMenu from './PRNavMenu'
import PRNavTitle from './PRNavTitle'

const PRNavDesktopStyled = styled.div`
  display: flex;

  .NavContent {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
`

const PRNavAppearance = dynamic(
  () => {
    return import('./PRNavAppearance')
  },
  { ssr: false },
)

export default function PRNavDesktop() {
  return (
    <PRNavDesktopStyled>
      {/* 标题部分，重要！移动端不消失 */}
      <PRNavTitle />

      {/* 导航栏内容部分 */}
      <div className="NavContent">
        {/* 链接部分 */}
        <PRNavMenu />
        {/* 暗/亮切换 */}
        <PRNavAppearance />
        {/* 额外空间 */}
        {/* <ASNavBarExtra /> */}
        {/* 汉堡 */}
        {/* <ASNavBarHamburger /> */}
      </div>
    </PRNavDesktopStyled>
  )
}
