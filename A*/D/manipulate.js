//this is vanilla JS. No JQuery implemented
//var dis = document.querySelector(".display");
//var chk = document.querySelector(".check");
//var numInput = document.querySelector("input");
//var content = chk.textContent;
//numInput.addEventListener("change",function(){
//    if (this.value > 10){
//        chk.classList.add("exceed");
//        chk.textContent = "value exceed!";
//        
//    }
//    else{
//        chk.classList.remove("exceed");
//        dis.textContent = "the size you put is : " + this.value; 
//        chk.textContent = content;
//    }
//});
$("form").on("change","#mapsize",function(){
    if($(this).val() > 10){
        $(this).parent().find("p").text("value exceed!");
    }
    else{
        $(this).parent().find("p").text("");
    }
    $(".removeSize").remove();
    var size = $(this).val();
    for (var i = 0; i < size; i++){
        $(".initiateSpot").append("<option class = 'removeSize'>"+i+"</option>");
    };
})

$("form").on("change","#numofgoals",function(){
    if($(this).val() > 5){
        //console.log("hi");
        $(this).parent().find("p").text("value exceed!");
    }
    else{
        $(this).parent().find("p").text("");
    }
    $(".removeGoal").remove();
    var size = $(this).val();
    for (var i = 0; i < size; i++){
        $(".goals").append("<option class = 'removeGoal'>"+"goal" + (i+1) +"</option>");  
    };   
})
$(".goals").on("click",function(){
    console.log("I am clicked");
    $(".goal option").prop("selected", function() {
        return this.defaultSelected;
    });
})

//$("#2").on("click",function(){
//console.log("fading");
//$("#set").fadeTo(2000,0.3);
//});
//$("#3").on("click",function(){
//console.log("fading");
//$("#obs").fadeTo(2000,0.3);
//});
//$("#4").on("click",function(){
//console.log("fading");
//$("#path").fadeTo(2000,0.3);
//});
