import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay } from '../overlay';
import { OverlayLoad } from '../loading';

import Styles from './pdfViewer.module.css';

const PdfViewer = ({ docDefinition, title = 'download', onClose }) => {
  const [loading, setLoading] = useState(true);
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    fetch(`data:application/pdf;base64,${docDefinition}`)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `${title}.pdf`, { type: 'application/pdf' });
        setIframeUrl(URL.createObjectURL(file));
        
      })
    
  }, [docDefinition, title]);

  const onLoad = () => setLoading(false)

  useEffect(() => {
    if(iframeUrl) {
      const checkLoadingTimeout = setTimeout(() => {
        const pdfViewer = document.getElementById('pdfViewer');
        
        /**
         * If the pdf hasn't been loading on the viewer ( happens for example on mobile device)
         * then the PDF will be downloaded instead
         */
        if(pdfViewer.contentDocument && !pdfViewer.contentDocument.querySelector('embed')) {
          const link = document.createElement('a');

          link.href = iframeUrl;
          link.download = title;
      
          pdfViewer.append(link);
          link.click();

          onClose();
        }
      }, 1000)
      return () => clearTimeout(checkLoadingTimeout)
    }
  }, [iframeUrl, docDefinition, title, onClose])

  return (
    <Overlay
      onClose={onClose}
      visible
      center
      isModal
      padding
    >
      { loading && <OverlayLoad/> }

      <div 
        className={Styles.container}
        style={{display: loading ? 'none' : 'flex'}}
      >
        {
          iframeUrl && 
          <iframe 
            src={iframeUrl} 
            className={Styles.viewer}
            name="pdfViewer"
            id="pdfViewer"
            title={title}
            onLoad={onLoad}
          >
          </iframe>
        }
      </div>
    </Overlay>
  )
}

PdfViewer.propTypes = {
  docDefinition: PropTypes.string.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired
}

export default PdfViewer;