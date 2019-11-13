
(function (){
$(document).ready(function () {
    $(".top-nav li a").click(function () {
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
    });
});

})();