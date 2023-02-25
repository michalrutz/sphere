import * as THREE from "three"
import gsap from "gsap"
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RepeatWrapping } from "three";

//SCENE
const scene = new THREE.Scene()
scene.fog = new THREE.Fog( "blue", 0, 15 );

//CAMERA
const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight
)
camera.position.z = 4
scene.add(camera)



//LIGHT
const light = new THREE.PointLight( "white", 1.5, 200 );
light.position.set( 0 , 0, -14)
scene.add( light )

//LOADING TEXTURE
const colorTexture = new THREE.TextureLoader().load("./static/TerrazzoSlab003_COL_1K_SPECULAR.png")


colorTexture.repeat.set(2,2)
//GEO
const geometry = new THREE.SphereGeometry(1,64,64)
function randomColors(num) {
    let rncolors = []
    for (let i = 0; i < num; i++) {
        rncolors.push(Math.floor(Math.random()*155));
    }
    return rncolors
}
let rncolors = randomColors(3)

let material = new THREE.MeshStandardMaterial({color:`rgb(${rncolors[0]}, ${rncolors[1]}, ${rncolors[2]})`

})
material.roughness = 0.3
const mesh = new THREE.Mesh( geometry, material )
mesh.position.set( 0, 0, 0)
mesh.projectOnVector
scene.add(mesh)




//RENDERER
const canvas = document.getElementById("c1")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth , window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3))
renderer.render(scene, camera)

// CONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enablePan = false
controls.enableDamping = true
controls.enableZoom =  false


controls.addEventListener( "change", ()=> { renderer.render(scene, camera) })
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
    light.position.x = 0
    light.position.x += Math.cos(elapsedTime/2)*15
    light.position.y = 0
    light.position.y += Math.sin(elapsedTime/2)*15
    light.position.z = 0
    light.position.z += -(Math.cos(elapsedTime/2)*25)

    mesh.material.color.setRGB( Math.sin(elapsedTime/4), Math.cos(elapsedTime/4), Math.sin(elapsedTime/4))

    controls.update() //otherwise dumping doesn't work!
    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(animation)
}
animation()

const tl = gsap.timeline({ defaults: {duration: 1.5} })
tl.fromTo(mesh.scale, {x:0,y:0,z:0},{x:1,y:1,z:1})

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3))
    renderer.render(scene, camera)
    }
)
