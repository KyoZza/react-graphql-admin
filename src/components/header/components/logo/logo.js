import React from 'react';
import { Link } from 'react-router-dom';

import { link, title } from './logo.module.css';

const Logo = () => 
  <Link className={link} to="/">
    {/* <div className={logo}/> */}
    <div className={title}>アドミン</div>
  </Link>

export default Logo;