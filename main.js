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
const light = new THREE.PointLight( "white", 0.8, 100, 10 );
light.position.set( 0 , 0, -14)
scene.add( light )

const light2 = new THREE.AmbientLight( "darkblue", 0.01 );
light2.position.set( 0 , 0, -14)
scene.add( light2 )

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
material.metalness = 0.8

const mesh = new THREE.Mesh( geometry, material )
mesh.rotateZ( Math.PI/2 )
mesh.rotateY( Math.PI/2 )

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
controls.enableZoom =  false
controls.enableRotate = false
controls.maxPolarAngle=Math.PI/2;
controls.minPolarAngle=Math.PI/2;


// Listen for the scroll event



const startTime = Date.now()/1000; // Get the current time in seconds

const animation = () =>{
    const elapsedTime = Date.now()/1000 - startTime
    const elapsedTime2 = Date.now()/1000 - startTime
    let detla = elapsedTime2-elapsedTime;

    // moving in cirle 
    light.position.x = 0
    light.position.x += Math.cos(elapsedTime/2)*15
    light.position.y = 0
    light.position.y += Math.sin(elapsedTime/2)*15
    light.position.z = -1
    light.position.z += Math.sin(elapsedTime)*10
    mesh.material.color.setRGB( Math.cos( Math.min(elapsedTime/4, 0.4) ), Math.sin( Math.min(elapsedTime/4, 0.4)), Math.cos( Math.min(elapsedTime/4, 0.4)))
    
    mesh.rotation.x = -elapsedTime*0.025


    controls.update() //otherwise dumping doesn't work!
    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    
    window.requestAnimationFrame(animation)
}
animation()

const tl = gsap.timeline({ defaults: {duration: 3} })
tl.fromTo(light, {intensity:0},{intensity:0.6})
tl.fromTo(light2, {intensity:0},{intensity:1})


//tl.fromTo(mesh.scale, {x:0,y:0,z:0},{x:1,y:1,z:1})

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
window.smoothScroll1 = function(target) {
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
    
    scroll = function(container, a, b, i) {
        i++; if (i > 30) return;
        container.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(container, a, b, i); }, 1);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 5);
}

window.smoothScroll = function (target, duration) {
    const targetElement = document.querySelector(target);
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(time, position, distance, duration) {
        time /= duration / 2;
        if (time < 1) return distance / 2 * time * time + position;
        time--;
        return -distance / 2 * (time * (time - 2) - 1) + position;
    }

    requestAnimationFrame(animation);
}

