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
      duration: 800,
      easing: "ease-in-out-back",
      // disable: window.innerWidth < 780,
    });
  }, []);
  return null;
}
