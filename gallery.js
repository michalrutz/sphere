const tvAdvisor = {
    h: "TV Show Advisor",
    tools: ["CSS","JavaScript","React"],
    p: "A TV show search engine with a sleek and minimalistic interface. Once a valid request is submitted, the application generates a comprehensive show page along with a set of recommendations. It utilizes modern function components and <strong>React hooks</strong> to dynamically create pages through <strong>third-party API</strong>. This project showcases my proficiency in handling <strong>asynchronous</strong> requests and databases.",
    img: "tv_small.jpg",
    link: "https://tv-show-adviser-two.vercel.app/"
};
const memoGame = {
    h: "the Memory Game",
    tools: ["CSS","JavaScript","React"],
    p: "At the start, cards are placed face-down in neat rows and columns. A player then takes turns turning over two cards, one at a time, with the goal of finding matching pairs as quickly as possible. The application was created using React framework and demonstrates an advanced use of react hooks and JavaScript",
    img: "memo_small.png",
    link:"https://memo-game-six.vercel.app/"
};
const SimonGame = {
    h: "the Simon Game",
    tools: ["CSS","Vanilla JavaScript"],
    p: "The Simon is a classic memory game. The application creates a series of tones and lights and requires a player to repeat the sequence. If the user succeeds, the series becomes progressively longer and more complex. Once the user fails or the time limit runs out, the game is over.",
    img: "simon.jpg",
    link:"https://simon-game-red-eta.vercel.app/"
};
const projectsArray = [tvAdvisor, memoGame, SimonGame];


function animateCard(cardContainer, cardToAnimate, power) {
    let container = document.getElementById(cardContainer)
    let card = document.getElementById(cardToAnimate)

    container.addEventListener('mousemove', function(e) {
        let h = container.offsetHeight
        let y = e.offsetY
        let w = container.offsetWidth
        let x = e.offsetX
      
        //console.log( ((h/2-y)/(h/2)).toFixed(2)) //gives reslts between -1/ +1
        let swingY = ((h/2-y)/(h/2)).toFixed(2)*power
        let swingX = ((w/2-x)/(w/2)).toFixed(2)*power
      
        card.style.transform = `rotateX(${swingY}deg) rotateY(${-swingX}deg) scale(105%)`;
      });
      
      container.addEventListener('mouseenter', ()=>{
          card.style.transition = "all 0.15s ease"
      }) 
      
      container.addEventListener('mouseleave', ()=>{
          card.style.transform = `rotateX( ${0}deg) rotateY( ${0}deg) scale(100%)`;
          card.style.transition = "all 1s ease"
      })
}

function gallery(data) {
    let gallery = []
    let projects = document.getElementById("projects")
    for (let i = 0; i < data.length; i++) {
        let article = projects.appendChild(document.createElement("article"));
            article.classList.add("box")
            article.innerHTML = 
            `
            <div class="container_wide hidden ${ i%2===0 ? "odd" : "" }" id="container_project_${i}" onclick="window.open('${data[i].link}')">
                <div class="cover_wide"></div>
                <div class="card_wide" id="project${i}">
                    <div class="description">
                        <h3>${data[i].h}</h3>
                        <div class="list">
                            ${data[i].tools.map( t => `<tag>${t}</tag>` ).join("")}
                        </div>
                        <p>${data[i].p}</p>
                    </div>
                    <div class="picture" style="background:url(./static/${data[i].img}); background-size:contain" style="background-size:contain" ></div>
                </div>
            </div>
            <div class="break"></div>
            `
            animateCard( "container_project_"+i, "project"+i, 5 )
    }
    return gallery
}
gallery(projectsArray)
//document.getElementById("projects").innerHTML = gallery(projectsArray).join("");

animateCard("container_about_cover", "about", 10)
animateCard("container_project_1", "project1", 2.5)

const observer = new IntersectionObserver( (entries) => 
    entries.forEach( (entry) => {
        console.log(entry)
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
console.log(hiddenElements)
hiddenElements.forEach( el => observer.observe(el) )
