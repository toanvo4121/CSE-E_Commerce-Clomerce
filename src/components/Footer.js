import React from 'react'
import { Link } from 'react-router-dom'

import style from './footer.module.css'

function Footer() {
  // console.log(props)

  return (
    <footer className={`pt-4 pb-2 ${style.Footer} gradient_bg`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 row">
            <div className={`my-4 ${style.FooterSection}`}>
              <h2 className={style.H2}>
                Company
              </h2>
              <div className={style.LinksContainer}>
                <Link className={`${style.Link} ${style.TextLink}`} to="/about">
                  About Us
                </Link>
                <a className={`${style.Link} ${style.TextLink}`} href="mailto:no-mail@email.com">
                  Contact Us
                </a>
              </div>
            </div>

            <div className={`my-4 ${style.FooterSection}`}>
              <h2 className={style.H2}>
                Legal
              </h2>
              <div className={style.LinksContainer}>
                <Link className={`${style.Link} ${style.TextLink}`} to="/terms-and-conditions">
                  Terms & Conditions
                </Link>
                <Link className={`${style.Link} ${style.TextLink}`} to="/privacy-policy">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 my-4">
            <h2 className={`text-center ${style.H2}`}>
              Social Media
            </h2>
            <div className={style.Row}>
              <a className={style.Link} href="https://www.facebook.com/100005291674208/videos/3152933761631939/" target="_blank" rel="noopener noreferrer">
                <div className={`${style.SocialMediaBtn} ${style.FaceBook} `}>
                  <i className="fa fa-facebook" aria-hidden="true" />
                </div>
              </a>
              <a className={style.Link} href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <div className={`${style.SocialMediaBtn} ${style.Twitter}`}>
                  <i className="fa fa-twitter" aria-hidden="true" />
                </div>
              </a>
              <a className={style.Link} href="https://www.youtube.com/watch?v=oEGWSXrXTrA&t=3s" target="_blank" rel="noopener noreferrer">
                <div className={`${style.SocialMediaBtn} ${style.Youtube}`}>
                  <i className="fa fa-youtube-play" aria-hidden="true" />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className={`mb-2 ${style.Row}`}>
          <span
            className={`${style.Copyright}`}>
            Copyright © {new Date().getFullYear()} Akatsuki Ltd. | All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
