import React, { useState, useEffect } from 'react';
import { FaFilePdf } from 'react-icons/fa';

export default function Pdfdl({path}: {path: string}) {

  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    fetch(`/api/article/${path}/pdf-url`)
      .then(res => res.json())
      .then(data => setPdfUrl(data.url))
  }, [])

  return (
    <>
      {
        pdfUrl ? <a download={true} href={pdfUrl}>
          <button className="btn">
            <FaFilePdf size={24} style={{display: "inline-block"}}/>
            as PDF
          </button>
        </a> : null
      }
    </>
  )
}