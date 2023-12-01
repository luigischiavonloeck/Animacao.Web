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

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.z = 20

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}, false)

const controls = new OrbitControls(camera, renderer.domElement)

const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)

const light2 = new THREE.PointLight(0x00ffff, 1000)
light2.position.set(0, 25, -10)
scene.add(light2)

const light3 = new THREE.PointLight(0xff00ff, 1000)
light3.position.set(0, -15, 10)
scene.add(light3)

const skybox = await createSkyBox('space',1000)
skybox.position.y = 1
scene.add(skybox)

const hoverPath = 'assets/models/ISS/'
const mtlFile = 'InternationalSpaceStation.mtl'
const objFile = 'InternationalSpaceStation.obj'
// const hoverPath = 'assets/models/t65/'
// const mtlFile = 'materials.mtl'
// const objFile = 'model.obj'
// const hoverPath = 'assets/models/f15c/'
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
object.scale.setScalar(.5)
object.position.y = -.2
scene.add(object)

const keys = []

window.addEventListener('keydown', event => {
  console.log(event.key)
  if (
    (event.key === 's' ||
      event.key === 'w' ||
      event.key === 'a' ||
      event.key === 'd' ||
      event.key === ' ' ||
      event.key === 'c'
      ) &&
    keys.indexOf(event.key) === -1
  ) {
    keys.push(event.key)
  }
})

window.addEventListener('keyup', event => {
  const index = keys.indexOf(event.key)
  if (index !== -1) {
    keys.splice(index, 1)
  }
})

animate()

function animate() {
  controls.update()
  moveJet()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)

  if (keys.indexOf('w') !== -1) {
    object.position.z -= .1
    object.rotation.x -= .01
  }
  if (keys.indexOf('s') !== -1) {
    object.position.z += .1
    object.rotation.x += .01
  }
  if (keys.indexOf('a') !== -1) {
    object.position.x -= .1
    object.rotation.z += .01
  }
  if (keys.indexOf('d') !== -1) {
    object.position.x += .1
    object.rotation.z -= .01
  }
  if (keys.indexOf(' ') !== -1) {
    object.position.y += .1
    object.rotation.y += .01
  }
  if (keys.indexOf('c') !== -1) {
    object.position.y -= .1
    object.rotation.y -= .01
  }
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

    object.rotation.x += (objectJoystick.y - wh / 2) / wh / 70

    if (Math.abs(object.position.x) > 100) {
      object.position.x = 100 * (object.position.x / Math.abs(object.position.x))
    } else {
      object.rotation.z -= (objectJoystick.x - ww / 2) / ww / 50
    }

    if (Math.abs(object.rotation.z) != 0) {
      object.position.x += (objectJoystick.x - ww / 2) / ww / 50
      object.rotation.y = object.rotation.z / 2.5
    }

    if (Math.abs(object.rotation.y) > .5)
      object.rotation.y = .5 * (object.rotation.y / Math.abs(object.rotation.y))
  }
}



window.addEventListener('mousemove', updateJoystick)