import React from "react";
import LoadingImage from "./images/logo.png";

export default function Loading() {
  return (
    <div className="loading-box">
      <img src={LoadingImage} alt="Good Samaritan Finder" />
      <div>Loading...</div>
    </div>
  );
}
