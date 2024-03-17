"use client";

import { createTheme } from "@mantine/core";
import localFont from "next/font/local";

const font = localFont({
  src: [
    { path: "./app/fonts/Poppins-Regular.ttf", weight: "400" },
    { path: "./app/fonts/Poppins-Bold.ttf", weight: "700", style: "normal" },
  ],
});

export const theme = createTheme({
  fontFamily: font.style.fontFamily,
  primaryColor: "yellow",
});
