import React from 'react';
import { Link } from 'react-router-dom';

import Styles from './footer.module.css';

const Footer = () => 
  <footer className={Styles.container}>
    <nav className={Styles.navigation}>
      <a className={Styles.navItem} href="https://personize.co.jp/">運営会社</a>
      <Link className={Styles.navItem} to="/terms">利用規約</Link>
      <Link className={Styles.navItem} to="/privacy-policy">プライバシーポリシー</Link>
      {/* <Link className={Styles.navItem} to="/faq">よくある質問</Link> */}
    </nav>
    <p className={Styles.copyright}>(C) { new Date().getFullYear() } React-GraphQL-Admin. All rights reserved.</p>
  </footer>


export default Footer;