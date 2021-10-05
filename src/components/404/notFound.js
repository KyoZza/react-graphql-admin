import React from 'react'
import { LinkButton } from '../basicComponents/button';

import ErrorIcon from '@material-ui/icons/ErrorOutline';
import Styles from './notFound.module.css';

const NotFound = () => 
  <div className={Styles.container}>
    <h3 className={Styles.title}>ページが見つかりません<ErrorIcon/></h3>
    <p>ご指定のURLが間違っているか、お探しのページが削除された可能性があります</p>

    <LinkButton to="/">ホーム画面へ戻る</LinkButton>
  </div>

export default NotFound
