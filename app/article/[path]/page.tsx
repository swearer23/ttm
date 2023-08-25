'use client';
import React, { useEffect, useState } from "react";
import { remark } from 'remark';
import html from 'remark-html';
import Back from "../../components/back";

export default function Page( { params }: { params: {path: string}}) {

  const modifyImagePath = (content: string, folderpath: string) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const matches = content.matchAll(imgRegex);
    const newContent = content.replace(imgRegex, (match, src) => {
      const newSrc = src.startsWith('/') ? src : `/output/${folderpath}/${src}`; // 确保路径以 / 开头
      return `<img src="${newSrc}"`;
    });
    return newContent;
  }

  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    async function fetchMarkdownContent() {
      const response = await fetch(`/output/${params.path}/thread.md`);
      const content = await response.text();
      const processedContent = await remark()
        .use(html)
        .process(content);
      const contentHtml = processedContent.toString();
      setMarkdownContent(modifyImagePath(contentHtml, params.path));
    }

    fetchMarkdownContent();
  }, []);

  return (
    <>
      <Back />
      <article className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
      </article>
      <div className="divider"></div>
    </>
    
  )
}