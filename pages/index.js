import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.scss'
import Link from 'next/link'
import Header from '../components/header'
import HeaderMini from '../components/header-mini'
import Footer from '../components/footer'
import MV from '../components/mv'

// Biến chung
const isVertical = false


export default function Home(props) {
// console.log(props);
  return (
    <div id="page" className="site site-vertical">
      { /** HEAD **/ }
      <Head>
        <title>Home - NextJS</title>
      </Head>

      { /** HEADER **/ }
      { props.data && props.data.acf &&
        props.menuPrimary &&
        <Header
          logo={props.data.acf.logo}
          menu={props.menuPrimary}
        />
      }

      { /** MV **/ }
      {/* { props.mv && props.mv.acf &&
        <MV acf={props.mv.acf}  />
      } */}
      
      <Layout home></Layout>

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
  let dataMV = null


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


  /** Data ACF MV */
  try {
    const idPageHome = 2
    const resMV = await fetch(`${apiRoute}/wp-json/acf/v3/pages/${idPageHome}`)
    dataMV = await resMV.json()
  }
  catch (e) {
    console.log('Không fetch được data trên server.')
  }
  
  return {
    props: {
      data,
      menuPrimary: dataMenuPrimary,
      menuFooter: dataMenuFooter,
      mv: dataMV
    }
  }
}