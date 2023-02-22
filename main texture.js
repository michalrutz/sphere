import * as THREE from "three"
import gsap from "gsap"
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import basecolor from "./static/TerrazzoSlab003_COL_1K_SPECULAR.png"
import pixerTexture from "./static/texture.png"

import font from "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json"
console.log(font);
//-> /static/ folder only works because of the Vite template's configuration.

//LOADING TEXTURE
const image = new Image() //It is functionally equivalent to document.createElement('img').
image.src = basecolor

const manager = new THREE.LoadingManager();

const colorTexture = new THREE.Texture(image) // convert Image into Texture
image.addEventListener('load', () => { 
    manager.onStart = (() => {console.log("STARTED")})()
    manager.onLoad = (() => { console.log("LOADING")})()
    manager.onProgress = (() => { console.log("PROGRESS")})()

    colorTexture.needsUpdate = true 
}) //hey Texture! Image was loaded updated yourself!
colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;
colorTexture.generateMipmaps = true

//SCENE
const scene = new THREE.Scene()
//CAMERA
const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight
)
camera.position.z = 4
scene.add(camera)

let params = {
    color:"red",
    spin: ()=>{
        mesh.rotation.y += Math.PI.toFixed()*2
    }
}

//GEO
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshNormalMaterial()
material.flatShading = true
const mesh = new THREE.Mesh( geometry, material )
mesh.position.set( 0, 0, 0)
scene.add(mesh)

const gui = new GUI();

gui
    .add( mesh.position, "y" )
        .min(-1).max(1).step(0.1)
        .name("box Y")
gui
    .add( mesh, "visible" )
gui
    .add( material, "wireframe" )

gui
    .addColor( params , "color" )
    .onChange( () => {
        material.color.set( params.color ) 
    })
gui.
    add( params, "spin" )


//RENDERER
const canvas = document.getElementById("c1")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth , window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)

// CONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


window.addEventListener('mousemove', (e) =>
{
    const cursor = {
        x:0,
        y:0
    }
    
    /* 
    cursor.x = e.x / window.innerWidth -0.5
    cursor.y = -(e.y / window.innerHeight -0.5)
    console.log(cursor.x*Math.PI*4)
    
    camera.position.x = Math.sin(cursor.x*Math.PI*2)*5
    camera.position.z = Math.cos(cursor.x*Math.PI*2)*5
    camera.position.y = Math.sin(cursor.y*Math.PI*2)*2
    camera.lookAt(mesh.position)
    */
})


const clock = new THREE.Clock()
const animation = () =>{
    const elapsedTime = clock.getElapsedTime()

    // moving in cirle 
    //mesh.rotation.y = elapsedTime*0.1
    //mesh.position.z = Math.sin(elapsedTime)
    controls.update()
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(animation)
}
animation()
/*
window.addEventListener('dblclick', () =>
{
    console.log(document.fullscreenElement)
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})
*/

window.addEventListener( "resize", ()=> {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix() //<- !Updates the camera projection matrix. Must be called after any change of parameters.
    renderer.setSize(window.innerWidth, window.innerHeight) // <- Update renderer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.render(scene, camera)
    }
)
