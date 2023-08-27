import React, { useState, useEffect } from 'react'
import { SiMarkdown } from 'react-icons/si'

export default function Mddl({ sourceDirectory }: { sourceDirectory: string }) {

  const [markdownUrl, setMarkdownUrl] = useState('');

  useEffect(() => {
    fetch(`/api/article/${sourceDirectory}/md-url`)
      .then(res => res.json())
      .then(data => setMarkdownUrl(data.url))
  }, [sourceDirectory])

  return (
    <>
      {
        markdownUrl ? 
        <a download={true} href={markdownUrl}><button className="btn mr-4 btn-accent">
            <SiMarkdown size={24} style={{display: "inline-block"}}/>
            Download as Markdown
          </button>
        </a>
        : null
      }
    </>
  )
}