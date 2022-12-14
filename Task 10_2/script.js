const btnRequest = document.querySelector(".btn");

const displayW = window.screen.width;
const displayN = window.screen.height;


btnRequest.addEventListener("click", ()=>{
    alert(`Характеристии Вашего экрана: Ширина - ${displayW}px, Высота - ${displayN}px`);
});