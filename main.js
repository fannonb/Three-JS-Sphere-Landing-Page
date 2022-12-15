import * as THREE from 'three';
import './style.css'
import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
const scene = new THREE.Scene();
const geometry = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshStandardMaterial({
  color: '#FFF816',
})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

//Sizes

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Add Light

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light)

//Add Camera 

const camera = new THREE.PerspectiveCamera(45, size.width / size.height);
camera.position.z = 20;
scene.add(camera)



//Renderer

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(size.width,size.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//Controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 4;

//Resize for different screens

window.addEventListener('resize', ()=>{
  //update sizes
  console.log(window.innerHeight)
  size.width = window.innerWidth
  size.height = window.innerHeight
  //update camera
  
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width/ size.height)
})

const loop =() =>{
 controls.update();
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}

loop();

//Timeline Edits

const tl = gsap.timeline({defaults: {duration:1}})
tl.fromTo(mesh.scale, {z:0,x:0, y:0}, {z:2,x:2,y:2})
tl.fromTo(".title", {y:"-100%"}, {y: "700%"});
tl.fromTo(".title", {opacity: 0.5}, {opacity: 1});

//Mouse Animation Color
let mouseDown = false;
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))