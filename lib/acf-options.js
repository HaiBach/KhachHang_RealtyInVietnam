export async function Options() {
  const res = await fetch('http://realtyinvietnam.com/wp-json/acf/v3/options/options')
  const data = await res.json()

  if (!data) {
    return {
      nofound : true
    }
  }

  return {
    props: data.acf
  }
}