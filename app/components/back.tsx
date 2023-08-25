import React from "react";
import FadingComponent from "./fading";
import { FaArrowLeft } from "react-icons/fa";

export default function Back() {
  return (
    <FadingComponent>
      <button className="btn btn-circle btn-outline fixed top-10">
        <FaArrowLeft />
      </button>
    </FadingComponent>
  )
}