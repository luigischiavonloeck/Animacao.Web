import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { createSkyBox } from './skybox';

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.z = 2

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}, false)

const controls = new OrbitControls(camera, renderer.domElement)

const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)

const light2 = new THREE.PointLight(0xffffff, 0.5)
light2.position.set(0, 25, -10)
scene.add(light2)

const skybox = await createSkyBox('space',200)
skybox.position.set(0,0,0)
scene.add(skybox)

// const hoverPath = 'models/hoverSparrow/'
// const mtlFile = 'materials.mtl'
// const objFile = 'model.obj'
// const hoverPath = 'models/f15c/'
// const mtlFile = 'f15c.mtl'
// const objFile = 'f15c.obj'

const manager = new THREE.LoadingManager();
manager.onProgress = (item, loaded, total) => {
  console.log(item, loaded, total);
};

const mtlLoader = new MTLLoader(manager);
mtlLoader.setPath(hoverPath);

const objLoader = new OBJLoader();
objLoader.setPath(hoverPath);

objLoader.setMaterials(await mtlLoader.loadAsync(mtlFile))
const object = await objLoader.loadAsync(objFile)
const objectJoystick = { x: null, y: null }
object.position.set(0, 0, 0)
object.rotation.set(0, 0, 0)
object.scale.set(0.1, 0.1, 0.1)
scene.add(object)

animate()

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
  moveJet()
}

function updateJoystick(event) {
  if (!event.buttons) {
    objectJoystick.x = event.clientX
    objectJoystick.y = event.clientY
    console.log(objectJoystick)
  } else {
    objectJoystick.x = null
    objectJoystick.y = null
  }
}

function moveJet() {
  if (object
    && objectJoystick.x
    && objectJoystick.y) {

    let wh = window.innerHeight
    let ww = window.innerWidth

    object.rotation.x += (objectJoystick.y - wh / 2) / wh / 100

    if (Math.abs(object.position.x) > 1) {
      object.position.x = 1 * (object.position.x / Math.abs(object.position.x))
    } else {
      object.rotation.z -= (objectJoystick.x - ww / 2) / ww / 10
    }

    if (Math.abs(object.rotation.z) != 0) {
      object.position.x += (objectJoystick.x - ww / 2) / ww / 10
      object.rotation.y = object.rotation.z / 2.5
    }

    if (Math.abs(object.rotation.y) > .5)
      object.rotation.y = .5 * (object.rotation.y / Math.abs(object.rotation.y))
  }
}
