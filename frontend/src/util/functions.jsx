import React from "react";

export function hexToRgba(hex) {
  if (typeof hex !== "string") {
    throw new Error("Invalid hex value");
  }

  // Remove the hash symbol if it exists
  hex = hex.replace(/^#/, "");

  // Parse the r, g, b values
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, 0.95)`;
}
