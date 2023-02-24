import * as THREE from "three"
import gsap from "gsap"
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


//SCENE
const scene = new THREE.Scene()
//CAMERA
const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight
)
camera.position.z = 10
camera.position.y = 2
scene.add(camera)

let textMesh
//FONT
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
//load image and create a texture material
const matcapTexture = new THREE.TextureLoader().load("./static/045C5C_0DBDBD_049393_04A4A4.png")
const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
//load font and create a geometry
new FontLoader().load(
      'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
      (droidFont) => {
        const textGeometry = new TextGeometry('three.js', {
            size: 2, height: 0.4, font: droidFont, 
            bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1, bevelSegments: 10
        });
        textMesh = new THREE.Mesh(textGeometry, textMaterial);

        textGeometry.center()
        scene.add(textMesh);
      }
);

const planeGeo = new THREE.PlaneGeometry(10,10)
const planeMat = new THREE.MeshBasicMaterial({color:"orange"});
const planeMesh = new THREE.Mesh(planeGeo, planeMat);
planeMesh.rotation.x = Math.PI*1.5
planeMesh.position.y = -1.5
scene.add(planeMesh)

//LIGHT
const light = new THREE.AmbientLight("red", 100 )


//RENDERER
const canvas = document.getElementById("c1")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth , window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)

renderer.shadowMap.enabled = true

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
