export default function HeaderSocial() {
  return (
    <div id="masthead-top" className="header-top">
      <div className="container">
        <div className="__header_inner">
          <div className="__search">
            <div className="btn btn--sm">
              <a href="#">
                <span className="btn__text"><i className="icon-search2"></i>Search</span>
              </a>
            </div>
          </div>
          <div className="__social">
            <ul>
              <li><a href="#" target="_blank"><i className="icon-facebook"></i></a></li>
              <li><a href="#" target="_blank"><i className="icon-viber"></i></a></li>
              <li><a href="#" target="_blank"><i className="icon-line"></i></a></li>
              <li><a href="#" target="_blank"><i className="icon-wechat"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}