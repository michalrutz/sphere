let containter = document.getElementById("container_cover");
let card = document.getElementById("about");

containter.addEventListener('mousemove', function(e) {
    let h = containter.offsetHeight
    let y = e.offsetY
    let w = containter.offsetWidth
    let x = e.offsetX
  
    //console.log( ((h/2-y)/(h/2)).toFixed(2)) //gives reslts between -1/ +1
    let swingY = ((h/2-y)/(h/2)).toFixed(2)*10
    let swingX = ((w/2-x)/(w/2)).toFixed(2)*10
  
    card.style.transform = `rotateX(${swingY}deg) rotateY(${-swingX}deg) translateZ(50px)`;
  });
  
  containter.addEventListener('mouseenter', ()=>{
      card.style.transition = "all 0.1s ease"
  }) 
  
  containter.addEventListener('mouseleave', ()=>{
      card.style.transform = `rotateX( ${0}deg) rotateY( ${0}deg)`;
      card.style.transition = "all 1s ease"
  })