$(window).on("load", function () {
    setTimeout(function () {
        $(".spinner-wrapper").fadeOut("slow");
        document.getElementById('body').classList.remove("hidden");
        document.getElementById('body').removeAttribute("style");
        document.getElementById('body').classList.add("bg-danger");
    }, 2000);
});



