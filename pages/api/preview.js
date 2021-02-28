export default function handler(req, res) {
  res.setPreviewData({ logo: '1234', mainColor: '#ff0055' })
  res.end('Preview mode enabled')
}