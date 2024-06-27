import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const selection = document.querySelectorAll('section')
selection.forEach((selectElement) => {
    // Создание скролл-триггерной анимации
    gsap.from(selectElement, {
      scrollTrigger: {
        trigger: selectElement,
        start: "top center",
      },
      duration: 4,
      opacity: 0,
    });
  });