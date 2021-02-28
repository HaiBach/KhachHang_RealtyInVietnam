import NavFooter from './nav-footer'

/** VARIABLES */
const date = new Date()
const yearCurrent = date.getFullYear()

export default function Footer(props) {
  return (
    <footer id="colophon" className="site-footer">
      <div className="footer__top">
        <div className="container">
          <div className="__btn sp">
            <div className="btn btn--outline btn--light2 btn--icon btn--min150">
              <a href="#"><i className="icon-three-dots"></i></a>
            </div>
          </div>
					
					{ /** Menu Footer */}
					<NavFooter menu={props.menu} />

        </div>
      </div>
      <div className="footer__bottom">
			<div className="container --max-1110">
				<div className="__inner">

					<div className="__logo">
						<div className="__logo_wrap">
							<a href="#" data-goto-anchor="0">

								{ /** LOGO FOOTER */}
								<img src={props.logo.url} alt="Logo" />
								
							</a>
						</div>
					</div>

					<div className="__address">
						<div className="__address_inner">
							<div className="__address_text">
								<div className="__txt">
									<p><strong>Address</strong> : Floor 2, 237 Le Thanh Ton, Ben Thanh Ward, District 1, Ho Chi Minh City</p>
									<p><strong>Phone number</strong> : <a href="tel:0909123456">0909 123 456</a><br /><strong>Email</strong> : <a href="mailto:support@realtyvietnam.com">support@realtyvietnam.com</a><br /><strong>Facebook</strong> : <a href="#">@realtyvietnam</a></p>
								</div>
							</div>
							<div className="__address_map">
								<div className="__btn sp">
									<div className="btn btn--outline btn--light btn--min150">
										<a href="https://goo.gl/maps/Gt2e4DssCRpgKNZZ7" target="_blank">
											<span className="btn__text"><i className="icon-map2"></i>MAP</span>
										</a>
									</div>
								</div>
								<div className="__img pc">
									<a href="https://goo.gl/maps/Gt2e4DssCRpgKNZZ7" target="_blank">
										<img src="/_upload/img-footer-map.jpg" alt="Map" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				
			  <div className="__copyright">
					<div className="copyright"> © <strong>RealtyInVietnam</strong> { yearCurrent }. All rights reserved. <br className="br-sm" />Designed by Haibach.</div>
				</div>
				
			</div>
		  </div>
			
			{ /** SCRIPTS */}
			<script type="text/javascript"  dangerouslySetInnerHTML={{ __html: process.env.jquery }}></script>
			<script type="text/javascript"  dangerouslySetInnerHTML={{ __html: process.env.ruby01 }}></script>
			<script type="text/javascript"  dangerouslySetInnerHTML={{ __html: process.env.rubyslider }}></script>
	  </footer>
  )
}