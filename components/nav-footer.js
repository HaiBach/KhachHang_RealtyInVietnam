import Link from 'next/link'


/**
 * COMPONENT NAV
 * Render markup Navigation
 */
export default function NavFooter({ menu }) {
  let menuLv1Count = -1;
  
  const listMenuLv1 = menu.map((itemLv1) => {
    let menuLv2Count = -1;
    const listMenuLv2 = itemLv1['submenu'].map((itemLv2) => {

      /** HTML CHO LIST MENU LV 2 */
      return (
        <li key={menuLv2Count++} className="menu-item">
          <Link href={ removeLinkServerHost(itemLv2['url']) }>
            <a>{ itemLv2['post_title'] ? itemLv2['post_title'] : itemLv2['title'] }</a>
          </Link>
        </li>
      )
    })

    /** HTML CHO LIST MENU LV 1 */
    return (
      <li key={menuLv1Count++} className="menu-item">
        <Link href={ removeLinkServerHost(itemLv1['url']) }>
          <a>{ itemLv1['post_title'] }</a>
        </Link>
        { !!listMenuLv2 && listMenuLv2.length > 0 &&
          <ul className="sub-menu">{ listMenuLv2 }</ul>
        }
      </li>
    )
  })

  /** RENDER HTML */
  return (
    <nav className="menu-footer-top">
      { !!listMenuLv1 && listMenuLv1.length > 0 &&
        <ul className="menu">{ listMenuLv1 }</ul>
      }
    </nav>
  )
}

function removeLinkServerHost(link) {
  const newLink = link.replace(/https*:\/\/realtyinvietnam.com/g, '')
  return newLink + '/'
}