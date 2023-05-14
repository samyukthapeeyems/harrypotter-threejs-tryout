import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//torus geometry
const numTorus = Math.floor(Math.random() * 20) + 1;
for (let i = 0; i < numTorus; i++) {
  const geometry = new THREE.TorusGeometry(4, 2, 16, 100);
  const material = new THREE.MeshStandardMaterial({ color: 0x012c33 });
  const torus = new THREE.Mesh(geometry, material);
  torus.position.set(Math.random() * 70 - 20, Math.random() * 70 - 20, Math.random() * 70 - 20);
  torus.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
  scene.add(torus);
}





const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0x5e7175 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(250));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);

// Background
// const skyTexture = new THREE.TextureLoader().load('smokeysky.jpg');
// scene.background = skyTexture;

const avatarArray = ['harrypotter.jpg', 'hogwarts.avif', 'hermione.jpg', 'ronald.webp', 'dubmledore1.jpg', 'snape.jpg'];
// Avatar
for (let i = 0; i < avatarArray.length; i++) {
  const avatarTexture = new THREE.TextureLoader().load(avatarArray[i]);
  const avatar = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: avatarTexture }));
  avatar.position.set(Math.random() * 70 - 20, Math.random() * 70 - 20, Math.random() * 70 - 20);
  avatar.rotation.x += 0.1;
  avatar.rotation.y += 0.1;
  avatar.rotation.z += 0.1;
  scene.add(avatar);
}

//bludger
// const numBludger = Math.floor(Math.random() * 20) + 1;
// for (let i=0;i<numBludger;i++){
//   const bludgerTexture = new THREE.TextureLoader().load('bludger.jpeg');
//   const normalTexture = new THREE.TextureLoader().load('red.png');
//   const bludger = new THREE.Mesh(
//     new THREE.SphereGeometry(3, 32, 32),
//     new THREE.MeshStandardMaterial({
//       map: bludgerTexture,
//       normalMap: normalTexture,
//       color: 0x45331d
//     })
//   );
//   bludger.position.set(Math.random() * 70 - 20, Math.random() * 70 - 20, Math.random() * 70 - 20);

//   scene.add(bludger);
// }
const bludgerTexture = new THREE.TextureLoader().load('bludger.jpeg');
const normalTexture = new THREE.TextureLoader().load('red.png');


const bludger1 = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: bludgerTexture,
    normalMap: normalTexture,
    color: 0x45331d
  })
);

scene.add(bludger1);

const bludger2 = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: bludgerTexture,
    normalMap: normalTexture,
    color: 0x242740
  })
);

scene.add(bludger2);

bludger1.position.z = 30;
bludger1.position.setX(-10);
bludger2.position.y = 20;
bludger2.position.setX(-30);


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  bludger1.rotation.x += 0.05;
  bludger1.rotation.y += 0.075;
  bludger1.rotation.z += 0.05;
  bludger2.rotation.x += 0.05;
  bludger2.rotation.y += 0.075;
  bludger2.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;



function animate() {
  requestAnimationFrame(animate);
  scene.rotation.x += 0.002;
  scene.rotation.y += 0.002;
  scene.rotation.y += 0.002;

  // controls.update();

  renderer.render(scene, camera);

}

animate()