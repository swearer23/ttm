import fs from 'fs';
import React from "react";
import { remark } from 'remark';
import html from 'remark-html';
import Back from "../../components/back";
import Mddl from "../../components/mddl";

export default async function Page( { params }: { params: {path: string}}) {

  const modifyImagePath = (content: string, folderpath: string) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const matches = content.matchAll(imgRegex);
    const newContent = content.replace(imgRegex, (match, src) => {
      const newSrc = src.startsWith('/') ? src : `/output/${folderpath}/${src}`; // 确保路径以 / 开头
      return `<img src="${newSrc}"`;
    });
    return newContent;
  }

  const path = params.path;
  const content = fs.readFileSync(`${process.cwd()}/public/output/${path}/thread.md`);
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  const markdownContent = modifyImagePath(contentHtml, params.path);

  return (
    <>
      <Back />
      <Mddl sourceDirectory={params.path} />
      <article className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
      </article>
      <div className="divider"></div>
    </>
  )
}