window.onload = ()=> {

document.getElementById("start").onclick = () => {
    console.log("click")
    document.querySelector(".start-screen").classList.remove("active")
    document.querySelector(".start-screen").classList.add("inactive")
    
    document.querySelector(".game-screen").classList.remove("inactive")
    document.querySelector(".game-screen").classList.add("active")
    Game.init()
}
}
