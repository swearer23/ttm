import React from "react";
import { SiTwitter, SiNextdotjs, SiReact, SiPlaywright } from "react-icons/si";
import { BiLogoTailwindCss, BiLogoNodejs } from "react-icons/bi";
import UserInput from "./components/userInput";

export default function Page() {
  return (
    <>
      <article className="prose max-w-none">
        <h2>Save Valuable Twitter (X)  Thread to Markdown File</h2>
        <p>
          <span className="mr-2"><SiTwitter size={24} style={{display: "inline-block"}}/></span>
          It's been too more expensive to save a valuable twitter thread to markdown file since <i>Elon Musk</i> changed the api usage policy.
        </p>
        <p>
          Here is a simple tool to save a twitter thread to markdown file without calling twitter v2 elevated auth api.
        </p>
        <p>
          If you are interested in the history archives I have collected, please visit <a href="/article/list">Thread Archiver</a>.
        </p>
      </article>
      <div className="divider"></div>
      <div className="flex flex-row justify-center mb-10">
        <span className="mr-4 stack"><BiLogoTailwindCss size={24} style={{display: "inline-block"}}/> Tailwindcss </span>
        <span className="mr-4 stack"><SiNextdotjs size={24} style={{display: "inline-block"}}/> NextJS </span>
        <span className="mr-4 stack"><SiReact size={24} style={{display: "inline-block"}}/> ReactJS </span>
        <span className="mr-4 stack"><BiLogoNodejs size={24} style={{display: "inline-block"}}/> NodeJS </span>
        <span className="mr-4 stack"><SiPlaywright size={24} style={{display: "inline-block"}}/> Playwright </span>
      </div>
      <UserInput />
    </>
  )
}
