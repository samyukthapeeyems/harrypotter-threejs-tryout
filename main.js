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


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x012c33 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// //Helpers

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

// // Background

// const skyTexture = new THREE.TextureLoader().load('smokeysky.jpg');
// scene.background = skyTexture;


// Avatar

const harryTexture = new THREE.TextureLoader().load('harrypotter.jpg');
const harry = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: harryTexture }));

scene.add(harry);

const hogwartsTexture = new THREE.TextureLoader().load('hogwarts.avif');
const hogwarts = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: hogwartsTexture }));

scene.add(hogwarts);

//bludger
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
bludger2.position.z = 60;
bludger2.position.setX(-30);

harry.position.z = -5;
harry.position.x = 2;

hogwarts.position.y = 10;
hogwarts.position.x = -20;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  bludger1.rotation.x += 0.05;
  bludger1.rotation.y += 0.075;
  bludger1.rotation.z += 0.05;
  bludger2.rotation.x += 0.05;
  bludger2.rotation.y += 0.075;
  bludger2.rotation.z += 0.05;

  harry.rotation.y += 0.01;
  harry.rotation.z += 0.01;

  hogwarts.rotation.y += 0.01;
  hogwarts.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;



function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  // controls.update();

  renderer.render(scene, camera);

}

animate()