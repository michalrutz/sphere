import * as THREE from "three"
import "./style.css"
import gsap from "gsap"
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RepeatWrapping } from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//SCENE
const scene = new THREE.Scene()
scene.fog = new THREE.Fog( "darkblue", 0, 15 );

//CAMERA
const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight
)
camera.position.z = 4
scene.add(camera)

//LIGHT
const light = new THREE.PointLight( "white", 0.8, 300 );
light.position.set( 0 , 0, -14)
scene.add( light )

//LOADING TEXTURE
const disTexture = new THREE.TextureLoader().load("./static/Alien_Metal_002_DISP.jpg")
disTexture.wrapT = RepeatWrapping
disTexture.wrapS = RepeatWrapping
disTexture.repeat.set(2,2)

disTexture.minFilter = THREE.NearestFilter
disTexture.magFilter = THREE.NearestFilter //for pixel art
disTexture.generateMipmaps = false //turn off Mipmaps for better performance
//GEO
//let geometry2
//const loader = new GLTFLoader()
//loader.load("./static/sphere.glb", (sphere) => { geometry2=sphere.scene; scene.add(sphere.scene) })


let geometry = new THREE.SphereGeometry(3,32,32)
function randomColors(num) {
    let rncolors = []
    for (let i = 0; i < num; i++) {
        rncolors.push(Math.floor(Math.random()*155));
    }
    return rncolors
}
let rncolors = randomColors(3)

let material = new THREE.MeshStandardMaterial({color:`rgb(${rncolors[0]}, ${rncolors[1]}, ${rncolors[2]})`})
material.displacementMap = disTexture
material.displacementScale = 0.0
material.bumpMap = disTexture   
material.bumpScale = 0.05
material.roughness = 0.5
material.metalness = 0.5

const mesh = new THREE.Mesh( geometry, material )
mesh.rotateZ( Math.PI/2 )
mesh.rotateX( Math.PI/2 )

mesh.position.set( 0, 0, 0)
mesh.projectOnVector //?
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
controls.enableRotate = false
//controls.minPolarAngle = Math.PI/2; //block y axis up
//controls.maxPolarAngle = Math.PI/2; //block y axis down
controls.maxAzimuthAngle=Math.PI/2;
controls.minAzimuthAngle=Math.PI/2;


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
    light.position.z = -1
    light.position.z += Math.sin(elapsedTime)*10
    mesh.material.color.setRGB( Math.cos(elapsedTime/4), Math.sin(elapsedTime/4), Math.cos(elapsedTime/4))
    mesh.rotation.y = -elapsedTime*0.05
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


document.getElementById( "title_bttn" ).addEventListener("click", ()=>{ console.log("spin") } )
//ANIMATIONS
window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);
    
    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);
    
    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 8);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

//CARD
/*

  using 
    - an animated gif of sparkles.
    - an animated gradient as a holo effect.
    - color-dodge mix blend mode
  
*/

document.onscroll = (e) => {

};
