"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      duration: 600,
      easing: "ease-in-out-back",
      anchorPlacement: "bottom-bottom",

      // disable: window.innerWidth < 780,
    });
  }, []);
  return null;
}
