export default function Topic(props) {
  const title = props.title && props.title.rendered
  const acf = props.acf;
  const titleOption = acf['page_title_option']

  /** RENDER HTML */
  return (
    <div className="topic-h2 --style-b">
      <h1>{ !!titleOption ? titleOption : title }</h1>
    </div>
  )
}