import Link from 'next/link'


/**
 * COMPONENT NAV
 * Render markup Navigation
 */
export default function NavDrawer({ menu }) {
  const menuOptions = {
    'selectorToggle': '.hamburber',
    'widthOffCanvas': [0, 10000]
  };
  let menuLv1Count = -1;
  
  
  const listMenuLv1 = menu.map((itemLv1) => {
    let menuLv2Count = -1;
    const listMenuLv2 = itemLv1['submenu'].map((itemLv2) => {
      return (
        <li key={menuLv2Count++} className="rm01list rm01list-lv2">
          <div className="rm01link">
            <Link href={ removeLinkServerHost(itemLv2['url']) }>
              <a>{ itemLv2['post_title'] ? itemLv2['post_title'] : itemLv2['title'] }</a>
            </Link>
          </div>
        </li>
      )
    })

    /** HTML CHO LIST MENU LV 1 */
    return (
      <li key={menuLv1Count++} className="rm01list rm01list-lv1">
        <div className="rm01link">
          <Link href={ removeLinkServerHost(itemLv1['url']) }>
            <a>{ itemLv1['post_title'] }</a>
          </Link>
        </div>
        { !!listMenuLv2 && listMenuLv2.length > 0 &&
          <ul className="sub-menu rm01menu rm01menu-lv2">{ listMenuLv2 }</ul>
        }
      </li>
    )
  })

  /** RENDER HTML */
  return (
    <nav className="rm01" data-menu={ JSON.stringify({
      selectorToggle: '.hamburger',
      widthOffCanvas: [0, 10000]
    }) }>
      <div className="menu__inner">
        { !!listMenuLv1 && listMenuLv1.length > 0 &&
          <ul className="rm01menu rm01menu-lv1">{ listMenuLv1 }</ul>
        }
      </div>
    </nav>
  )
}

function removeLinkServerHost(link) {
  const newLink = link.replace(/https:\/\/realtyinvietnam.com/g, '')
  return newLink + '/'
}