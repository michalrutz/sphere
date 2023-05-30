import { list } from "./assets/project.js"




const projectsArray = [...list];


//CARD 3D ANIMATION
function animateCard(cardContainer, cardToAnimate, power) {
    let container = document.getElementById(cardContainer)
    let card = document.getElementById(cardToAnimate)

    container.addEventListener('mousemove', function(e) {
        let h = container.offsetHeight
        let y = e.offsetY
        let w = container.offsetWidth
        let x = e.offsetX


     
        console.log( ((h/2-y)/(h/2)).toFixed(2)) //gives reslts between -1/ +1
        let swingY = ((h/2-y)/(h/2)).toFixed(2)*power
        let swingX = ((w/2-x)/(w/2)).toFixed(2)*power
      
        card.style.transform = `rotateX(${swingY}deg) rotateY(${-swingX}deg) scale(100%)`;
        card.style.transition = "all 0.1s ease"
      });
      
      container.addEventListener('mouseenter', ()=>{
          card.style.transition = "all 0.1s ease"
      }) 
      
      container.addEventListener('mouseleave', ()=>{
          card.style.transform = `rotateX( ${0}deg) rotateY( ${0}deg) scale(95%)`;
          card.style.transition = "all 1s ease"
      })
      container.addEventListener( "click", ()=>{
        console.log("CLICK")
        card.style.transform = `rotateX( ${0}deg) rotateY( ${0}deg) scale(95%)`;
        card.style.transition = "all 1s ease"
    } )

}
animateCard("container_about_cover", "about", 10)

//GENEREATE GALLERY
function gallery(data) {
    let gallery = []
    for (let i = 0; i < data.length; i++) {
        let projects = document.getElementById("projects")
        let article = projects.appendChild(document.createElement("article"));
        article.classList.add("box")

            article.innerHTML = 
            `
            <div class="container_wide hidden ${i%2===0 ? "odd" : ""}" id="container_project_${i}" onclick="window.open('${data[i].link}')">
                <div class="card_wide" id="project${i}">
                    <div class="description">
                        <h3>${data[i].h}</h3>
                        <div class="list">
                            ${data[i].tools.map( (t) => `<tag>${t}</tag>` ).join("")}
                        </div>
                        <p>${data[i].p}</p>
                    </div>
                    <div class="picture" style="background:url(./static/${data[i].img}); background-size:contain" style="background-size:contain" ></div>
                </div>
            </div>
            <button class="next" id="title_bttn" onclick="smoothScroll('#container_project_${i+1}', 1000)" ${i===data.length-1 ? 'hidden' : ""}  >↓</button>
            <div class=break></div>
            `
            animateCard( "container_project_"+i, "project"+i, 4)
    }
    return gallery
}
gallery(projectsArray)

//SCROLL ANIMATION
const observer = new IntersectionObserver( (entries) => 
    entries.forEach( (entry) => {
        //console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add("visible")
        }
        else {
            entry.target.classList.remove("visible")
        }
    }
    )
)
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach( el => observer.observe(el) )
