import React from 'react';
import PropTypes from 'prop-types';
import { Overlay } from '../overlay';

import Styles from './prompt.module.css';
import { ButtonWrapper, Button } from '../button';

const Prompt = ({title, onCancel, onConfirm, loading, children}) => 
  <Overlay
    onClose={onCancel} 
    visible 
    center
  >
    <div className={Styles.container}>
      <h3>{ title || 'ご確認ください' }</h3>
      
      { children }

      <ButtonWrapper tight>
        <Button onClick={onCancel}>キャンセル</Button>
        <Button onClick={onConfirm} loading={loading} main>確認</Button>
      </ButtonWrapper>
    </div>
  </Overlay>

Prompt.propTypes = {
  title: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default Prompt;