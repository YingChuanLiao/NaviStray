//this is vanilla JS. No JQuery implemented
var dis = document.querySelector(".display");
var chk = document.querySelector(".check");
var numInput = document.querySelector("input");
var content = chk.textContent;
numInput.addEventListener("change",function(){
    if (this.value > 10){
        chk.classList.add("exceed");
        chk.textContent = "value exceed!";
        
    }
    else{
        chk.classList.remove("exceed");
        dis.textContent = "the size you put is : " + this.value; 
        chk.textContent = content;
    }
});
$("#2").on("click",function(){
console.log("fading");
$("#set").fadeTo(2000,0.3);
});
$("#3").on("click",function(){
console.log("fading");
$("#obs").fadeTo(2000,0.3);
});
$("#4").on("click",function(){
console.log("fading");
$("#path").fadeTo(2000,0.3);
});

