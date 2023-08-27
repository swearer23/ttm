import React from 'react'
import { SiMarkdown } from 'react-icons/si'
import { getDownloadPath } from '../api/article/[path]/md-url/route'

export default function Mddl({ sourceDirectory }: { sourceDirectory: string }) {

  const markdownUrl = getDownloadPath(sourceDirectory)

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