// Just a simple function to blur the header when it is moved.
function hide_header(){
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5){
        document.getElementById("header").className = "blur";
        document.getElementById("splash_blur").className = "blur active";
        document.getElementById("greeting").className = "active";
    } else {
        document.getElementById("header").className = "";
        document.getElementById("splash_blur").className = "blur";
        document.getElementById("greeting").className = "";
    }
}

window.onscroll =  function() {hide_header()};