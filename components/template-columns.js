import Link from 'next/link'

export default function TemplateColumns(props) {
  const acf = !!props && props.acf || {}
  const columns = acf['vertical_columns']
  const columnsNumber = acf['columns_number']
  const classMore = columnsNumber == 2 ? '--columns-2' : '--columns-3'

  const itemsHTML = columns.map((column, i) => {
    const title = column['title']
    const icon = column['icon']
    const text = column['text']
    const link = column['link']
    let linkHref = '';
    let isLink = !!link && !!link['url'] && link['url'] != '#'

    /** Thiết lập giá trị mặc định */
    if (!!link && !!link['url'] && link['url'] != '#') {
      linkHref = `href="${link['url']}"`
    }

    const itemHTML = 
      <div>
        {/** Title */}
        { !!title &&
          <div className="__title">
            <h3>{title}</h3>
          </div>
        }

        {/** Icon */}
        { !!icon &&
          <div className="__icon">
            <img src={icon['url']} alt={icon['title']} />
          </div>
        }

        {/** Text */}
        { !!text &&
          <div className="__text">
            {text}
          </div>
        }
      </div>

    /** RENDER ITEM */
    return (
      <div className="__item" key={ i }>
        { !!isLink
          ?
            <Link href={ removeLinkServerHost(link['url']) }>
              <a className="__item_link" title={title}>
                {itemHTML}
              </a>
            </Link>
          :
            <div className="__item_link">
              {itemHTML}
            </div>
        }
      </div>
    )
  })

  /** RENDER HTML */
  return (
    <section className={'template-columns ' + classMore}>
      <div className="__inner">
        { itemsHTML }
      </div>
    </section>
  )
}

function removeLinkServerHost(link) {
  const newLink = link.replace(/https:\/\/realtyinvietnam.com/g, '')
  return newLink + '/'
}