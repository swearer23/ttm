"use client";
import React from "react";
import { useRouter } from "next/navigation";
import FadingComponent from "./fading";
import { FaArrowLeft, FaHome } from "react-icons/fa";

export default function Back() {

  const router = useRouter();

  const goback = () => {
    router.back();
  }

  const gohome = () => {
    router.push('/');
  }

  return (
    <FadingComponent>
      <div className="join fixed top-10">
        <button className="btn btn-circle btn-outline join-item" onClick={goback}>
          <FaArrowLeft />
        </button>
        <button className="btn btn-circle btn-outline join-item" onClick={gohome}>
          <FaHome />
        </button>
      </div>
    </FadingComponent>
  )
}