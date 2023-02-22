import * as THREE from "three"
import gsap from "gsap"
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


import font from "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json"

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';




const fontLoader = new FontLoader();
    fontLoader.load(
      'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
      (droidFont) => {
        const textGeometry = new TextGeometry('three.js', {
            size: 2, height: 0.4, font: droidFont, 
            bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1, bevelSegments: 4
        });
        const textMaterial = new THREE.MeshNormalMaterial();
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        textGeometry.computeBoundingBox()
        textMesh.position.x -= textGeometry.boundingBox.max.x/2
        textMesh.position.y -= textGeometry.boundingBox.max.y/2
        textMesh.position.z -= textGeometry.boundingBox.max.z/2
        console.log(textGeometry.boundingBox)

        console.log( textMesh.position.x) 
        scene.add(textMesh);
      }
    );

//SCENE
const scene = new THREE.Scene()
//CAMERA
const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight
)
camera.position.z = 10
scene.add(camera)



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
