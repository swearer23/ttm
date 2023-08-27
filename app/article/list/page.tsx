import fs from 'fs';
import React from "react";
import Back from "../../components/back";
import { FaArrowCircleRight } from 'react-icons/fa';

const findPictureInFolder = (folder: string) => {
  const filelist = fs.readdirSync(folder);
  const picture = filelist.find(name => name.endsWith('.jpg'));
  return picture;
}

const traverseAllThreads = () => {
  const threadList = fs.readdirSync(`${process.cwd()}/public/output`);
  const threadBriefList = threadList.map(thread => {
    const mdName = `${process.cwd()}/public/output/${thread}/thread.md`
    try {
      fs.accessSync(mdName);
      return {
        name: thread,
        cover: findPictureInFolder(`${process.cwd()}/public/output/${thread}`),
        brief: fs.readFileSync(mdName, 'utf-8').slice(0, 100)
      }
    } catch (err) {
      return null
    }
  }).filter(thread => thread !== null);
  return threadBriefList.reverse().slice(0, 20);
}

export default function Page() {
  const threadBriefList = traverseAllThreads();

  return (
    <>
      <Back />
      {
        threadBriefList.map(thread => {
          const coverPath = thread.cover ? `/output/${thread.name}/${thread.cover}` : null;
          const threadPath = `/article/${thread.name}`;
          return (
            <div className="card lg:card-side bg-base-100 shadow-xl mb-10">
              {
                coverPath ? 
                  <figure><img src={coverPath} alt="Album" /></figure>
                : null
              }
              <div className="card-body">
                <p>{thread.brief}</p>
                <div className="card-actions justify-end">
                  <a className="btn btn-circle" href={threadPath} target='_blank'>
                    <FaArrowCircleRight size={32} style={{display: "inline-block"}}/>
                  </a>
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}