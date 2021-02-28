import Link from 'next/link'
import Nav from './nav'
import HeaderSocial from './header-social'

export default function Header( props ) {
  return (
    <header id="masthead" className="site-header header-page">

      { /** Header Social */}
      <HeaderSocial />

      <div className="header-scroll-fixed scroll-fixed-0" data-fixed-bottomout=".anchor-first">
        <div className="scroll-holder"></div>
        <div className="site-branding scroll-inner">
          <div className="site-branding-inner container">

            <div className="header-logo">
              {/** Logo */}
              <Link href="/">
                <a>
                  <img src={props.logo.url} alt="Logo" />
                </a>
              </Link>
            </div>

            <nav className="main-navigation">
              <div className="nav__inner">

                <div className="sp">
                  <div className="menu-mini">
                    <div className="btn --search-sp btn--icon">
                      <a href="#">
                        <span className="btn__text"><i className="icon-search2"></i></span>
                      </a>
                    </div>
                    <div className="btn --hamburger btn--icon">
                      <a className="hamburger" href="#">
                        <span className="hamburger__deco">
                          <span></span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                { /** MENU HEADER */}
                <Nav menu={props.menu} />
              </div>
            </nav>

          </div>
        </div>
      </div>
    </header>
  )
}