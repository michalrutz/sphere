import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    95, window.innerWidth / window.innerHeight, 1, 10
)
camera.position.z = 2 
camera.position.x = -1 

scene.add(camera)

//Mesh
const geo = new THREE.BoxGeometry( 1, 1, 1)
const mat = new THREE.MeshBasicMaterial({color:"red"})
const mesh = new THREE.Mesh(geo, mat);
mesh.position.x = 1 

scene.add(mesh)

const canvas = document.getElementById("c1")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)

renderer.render( scene, camera );