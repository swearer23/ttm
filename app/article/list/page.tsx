import React from "react";
import Back from "../../components/back";
import { FaArrowCircleRight } from 'react-icons/fa';
import { listObjects, getObject } from '../../lib/s3client';

const findPictureInFolder = async (folder: string) => {
  const filelist = await listObjects(folder);
  const picture = filelist.find(name => name.endsWith('.jpg'));
  return `${process.env.AWS_BUCKET_HOST}/${picture}`;
}

const traverseAllThreads = async () => {

  const threadList = (await listObjects('')).filter(name => name.startsWith('thread') && name.endsWith('/'));
  const threadBriefList = []
  for (const thread of threadList) {
    const mdName = `${thread}thread.md`;
    const brief = (await (await getObject(mdName)).transformToString()).slice(0, 100);
    const cover = await findPictureInFolder(thread);
    threadBriefList.push({
      name: thread,
      cover: cover,
      brief: brief
    })
  }
  return threadBriefList.reverse().slice(0, 20);
}

export default async function Page() {
  const threadBriefList = await traverseAllThreads();

  return (
    <>
      <Back />
      {
        threadBriefList.map(thread => {
          const coverPath = `https://${thread.cover}` || null;
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