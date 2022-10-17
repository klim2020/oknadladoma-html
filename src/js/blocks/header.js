// Typed Initiate
if ($('.typed-text-output').length == 1) {
    var typed_strings = $('.typed-text').text();
    var typed = new Typed('.typed-text-output', {
        strings: typed_strings.split(', '),
        typeSpeed: 50,
        backSpeed: 40,
        backDelay: 3000,
        smartBackspace: true,
        loop: true
    });
}

// Navbar on scrolling
$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('.navbar .btn').removeClass('btn-outline-light');
        $('.navbar').removeClass('bg-primary');
        $('.nav-link').removeClass('nav-link__text-secondary');
        $('.nav-link__header').removeClass('nav-link__header-secondary');
        $('.navbar .btn').addClass('btn-outline-primary');
        $('.navbar').addClass('bg-light');
        $('.navbar').addClass('shadow-sm');
        $('.navbar').addClass('position-fixed');


        //nav-link__header-secondary
        //$('.navbar').css('display', 'flex');

    } else if($(this).scrollTop()<10){
        //sticky-top
        //$('.navbar').addClass('sticky-top');
        //$('.navbar').css('display', 'flex');
    }else {
        $('.navbar .btn').removeClass('btn-outline-primary');
        $('.navbar').removeClass('shadow-sm');
        $('.navbar').removeClass('bg-light');
        $('.navbar').removeClass('position-fixed');
        $('.nav-link').addClass('nav-link__text-secondary');
        $('.nav-link__header').addClass('nav-link__header-secondary');
        $('.navbar').fadeIn('slow',function (){$(this).addClass('bg-primary')});
        $('.navbar .btn').addClass('btn-outline-light');


        //$('.navbar').removeClass('fixed-top');
        //$('.navbar').css('display', 'none');

    }
});

// Smooth scrolling on the navbar links
$(".navbar-nav a").on('click', function (event) {
    if (this.hash !== "") {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 45
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.navbar-nav').length) {
            $('.navbar-nav .active').removeClass('active');
            $(this).closest('a').addClass('active');
        }
    }
});

