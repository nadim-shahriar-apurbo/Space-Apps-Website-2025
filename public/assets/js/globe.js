import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";

import getStarfield from "./getStarfield.js";
import { getFresnelMat } from "./getFresnelMat.js";

const wrap = document.querySelector(".globe");

// Check if globe element exists before initializing
if (!wrap) {
  console.warn("Globe container not found");
} else {
  const w = wrap.offsetWidth;
  const h = wrap.offsetWidth;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.5, 1000);
  camera.position.z = 1.8;
  
  // Optimize renderer settings for performance
  const renderer = new THREE.WebGLRenderer({ 
    antialias: false, // Disable antialiasing for better performance
    powerPreference: "high-performance",
    stencil: false,
    depth: true
  });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance

renderer.setClearColor(0x000000, 0); // Set background color to transparent
wrap.appendChild(renderer.domElement);
// THREE.ColorManagement.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enableRotate = true; // Enable mouse drag rotation

const stars = getStarfield({ numStars: 2000 }); // Increased star count for space environment
scene.add(stars);

// Add ambient light for general illumination
const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
scene.add(ambientLight);

// Add directional light for better model visibility
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Load sun.glb model
const loader = new GLTFLoader();
let sunModel = null;

loader.load(
  "./assets/img/sun.glb",
  function (gltf) {
    sunModel = gltf.scene;
    
    // Scale the model to appropriate size
    sunModel.scale.set(0.075, 0.075, 0.075);
    
    // Position the sun higher
    sunModel.position.y = 0.3;
    
    // Add the model to the scene
    scene.add(sunModel);
    
    // Start animation if model has animations
    if (gltf.animations && gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(sunModel);
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();
      
      // Update mixer in animation loop
      const clock = new THREE.Clock();
      function updateAnimation() {
        const delta = clock.getDelta();
        mixer.update(delta);
        requestAnimationFrame(updateAnimation);
      }
      updateAnimation();
    }
  },
  function (progress) {
    console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
  },
  function (error) {
    console.error('Error loading sun.glb:', error);
  }
);

let time = 0;

// Function to handle rotation and animation
function animate() {
  requestAnimationFrame(animate);
  
  time += 0.01;
  
  // Rotate the sun model if it's loaded
  if (sunModel) {
    sunModel.rotation.y += 0.005;
  }
  
  renderer.render(scene, camera);
}

animate();

function handleWindowResize() {
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener("resize", handleWindowResize, false);

} // Close the if (!wrap) else block
