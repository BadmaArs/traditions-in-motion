import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { kibitka, kibitkaMobile } from "./transform";
import gsap from "gsap";
import "../style.css";

// Инициализация и создание сцены и 3д модели
const canvas = document.querySelector("canvas.webgl");
let objectPosition = window.innerWidth < 600 ? kibitkaMobile : kibitka;
const modelThree = "../kibitka.glb";
// Scene
const scene = new THREE.Scene();
// Sizes
// Размеры камеры
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize", function () {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
});

// GLTF Loader
let pokeball = null;
const gltfLoader = new GLTFLoader();

gltfLoader.load(
  modelThree,
  (gltf) => {
    pokeball = gltf.scene;
    pokeball.rotation.y = objectPosition[0].rotationY;
    pokeball.rotation.x = objectPosition[0].rotationX;
    pokeball.rotation.z = objectPosition[0].rotationZ;
    pokeball.position.x = objectPosition[0].positionX;
    pokeball.position.y = objectPosition[0].positionY;
    pokeball.position.z = 3;

    pokeball.scale.set(
      objectPosition[0].scale.x,
      objectPosition[0].scale.x,
      objectPosition[0].scale.x
    );
    scene.add(pokeball);
  },
  (xhr) => {
    // Этот код будет выполнен
    // в процессе загрузки
    const totalSized = 19896608; // При каждой новой модели занести количество байтов
    // console.log(xhr.loaded, xhr.total, xhr.loaded / totalSized);
    let preload = (xhr.loaded / totalSized) * 100 + "";
    let preloadSplit = preload.split(".");
    const loaderDiv = document.querySelector(".loader");
    loaderDiv.innerHTML = `
    <div class="lineLoader">
      <div class="inLineLoader" style="width: ${preloadSplit[0]}%"></div>
    </div>
    <h3>
      Пожалуйста подождите <br />
      Идет загрузка <br />
      ${preloadSplit[0]}%
    </h3>
    `;
    if (preloadSplit[0] == "100") {
      loaderDiv.classList.add("noActive");
    }
  },
  (error) => {
    console.error(error);
  }
);

// Camera
// Настройка камеры для десктопа и мобильных устройств
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 5;
camera.position.y = 0.5;

scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);
// Scroll
// Координаты для секций

// Анимация и формула нахождения секции
let scrollY = window.scrollY;
let currentSection = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  const newSection = Math.round(scrollY / sizes.height);

  if (newSection != currentSection) {
    currentSection = newSection;

    if (!!pokeball) {
      gsap.to(pokeball.rotation, {
        duration: 4.5,
        ease: "power2.inOut",
        y: objectPosition[currentSection].rotationY,
        x: objectPosition[currentSection].rotationX,
        z: objectPosition[currentSection].rotationZ,
      });
      gsap.to(pokeball.position, {
        duration: 4.5,
        ease: "power2.inOut",
        x: objectPosition[currentSection].positionX,
        y: objectPosition[currentSection].positionY,
      });
      gsap.to(pokeball.scale, {
        duration: 4.5,
        ease: "power2.inOut",
        ...objectPosition[currentSection].scale,
      });
    }
  }
});

// Light
// Настройка света
const ambientLight = new THREE.AmbientLight(0xffffff, 5.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(1, 2, 0);
scene.add(directionalLight);

// Animate
const clock = new THREE.Clock();
let lastElapsetTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - lastElapsetTime;
  lastElapsetTime = elapsedTime;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
