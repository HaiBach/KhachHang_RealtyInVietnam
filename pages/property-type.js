import Head from 'next/head'
import HeaderMini from '../components/header-mini'
import Footer from '../components/footer'
import NavAside from '../components/nav-aside'
import Topic from '../components/topic'
import TemplateColumns from '../components/template-columns'

// Biến chung
const isVertical = true

export default function PropertyType( props ) {
  console.log(props)

  // Lấy main data
  const maindata = props.maindata
  const pageContent = !!maindata.content && maindata.content.rendered

  // Lấy data ACF
  let acf = {};
  if (!!props && !!props.maindata) {
    acf = props.maindata.acf;
  }

  // Kiểm tra content nằm ở vị trí bottom
  const isContentBottom = acf.page_is_content_bottom
  const classContentMore = isContentBottom ? '--is-bottom' : '--is-top'


  // console.log(maindata);s
  return (
    <div id="page" className="site site-vertical">
      <Head>
        <title>Support - RealtyInVietnam</title>
      </Head>

      { /** HEADER **/ }
      { props.data && props.data.acf &&
        props.menuPrimary &&
        <HeaderMini
          isVertical={true}
          logo={props.data.acf.logo}
          menu={props.menuPrimary}
        />
      }

      <div id="main" className="site-main page-default">
        <main id="main-primary" className="container">

          {/** ASIDE NAVIGATION VERTICAL */}
          { props.menuPrimary &&
            <NavAside menu={props.menuPrimary} />
          }

          <div id="main-content">
            {/** BREADCRUMB */}
            <div id="breadcrumb"></div>

            {/** TOPIC */}
            <Topic title={maindata.title} acf={acf} />

            {/** FEATURED IMAGE */}


            {/** PAGE MAIN CONTENT */}
            <div className={'page-v-content ' + classContentMore}>
              {/** MAIN CONTENT  */}
              { !!pageContent &&
                <div className="v-content">
                  { pageContent }
                </div>
              }

              {/** TEMPLATE COLUMNS */}
              <TemplateColumns acf={acf} />
            </div>
            
          </div>
        </main>
      </div>

      { /** FOOTER */}
      { props.data && props.data.acf &&
        props.menuFooter &&
        <Footer
          logo={props.data.acf.logo_footer}
          menu={props.menuFooter}
        />
      }
    </div>
  )
}


export async function getStaticProps() {
  const apiRoute = process.env.apiRoute

  let data = null
  let dataMenuPrimary = null
  let dataMenuFooter = null
  let dataMain = {}


  /** Get data options */
  try {
    const res = await fetch(`${apiRoute}/wp-json/acf/v3/options/options`)
    data = await res.json()
  }
  catch (e) {
    console.log('Không fetch được data trên server.')
  }


  /** Get api Menu Primary */
  try {
    const resMenuPrimary = await fetch(`${apiRoute}/wp-json/menus/primary`)
    const resMenuFooter = await fetch(`${apiRoute}/wp-json/menus/footer`)
    dataMenuPrimary = await resMenuPrimary.json()
    dataMenuFooter = await resMenuFooter.json()
  }
  catch (e) {
    console.log('Không fetch được data trên server.')
  }
  dataMenuPrimary = (dataMenuPrimary.code !== 'rest_no_route') ? dataMenuPrimary : null
  dataMenuFooter = (dataMenuFooter.code !== 'rest_no_route') ? dataMenuFooter : null

  /** Main Content cua trang  */
  try {
    const slug = 'support'
    const resContent = await fetch(`${apiRoute}/wp-json/wp/v2/pages?slug=${slug}`)
    dataMain = await resContent.json()
  }
  catch (e) {
    console.log('Không fetch được data trên server.')
  }
  

  /** RETURN DATA */
  return {
    props: {
      data,
      menuPrimary: dataMenuPrimary,
      menuFooter: dataMenuFooter,
      maindata: dataMain['0']
    }
  }
}