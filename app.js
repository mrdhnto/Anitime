import "regenerator-runtime";
import "./src/css/styles.css";
import "./src/js/component/sidebar.js";
import main from "./src/js/view/main.js";


main('TV');

$(document).ready(function() {
    
    //Function to Call & Close Hidden Info Div
    $("anime-list").on("click", "h5.card-title", function(){
        $('anime-list').addClass("d-none");
        $('next-day').hide();
        $('#' + $(this).attr('target')).removeClass("d-none");
        scrolltoTOP();
    });

    $("anime-info").on("click", ".btn-back-anime", function(){
        $('#' + $(this).attr('target')).addClass("d-none"); 
        $('anime-list').removeClass("d-none");
        $('next-day').show();
        scrolltoTOP();
    });

    //Function to See Tomorow Schedule on TV Section
    $("next-day").on("click", ".schedule-next", function(){
        $('anime-item').hide();
        $('next-day').hide();
        $('.loading').show();
        main('' + $(this).attr('target'));
        scrolltoTOP();
    });

    //Function to Switch Anime Section
    $("side-bar").on("click", ".nav-item", function(){
        $(".nav-item").removeClass("active");
        $('next-day').hide();
        $('anime-item').hide();
        $('.no-item').hide();
        $(this).addClass("active");
        $('.loading').show();
        main('' + $(this).attr('target'));
        scrolltoTOP();
    });

    //Function to Call Sidebar
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
        $('#sidebarCollapse').removeClass('d-none');
        $('#sidebarCollapse').addClass('d-inline-block');
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $(this).addClass('d-none');
        $(this).removeClass('d-inline-block');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

});

function scrolltoTOP() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}