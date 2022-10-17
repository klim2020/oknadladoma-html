// Portfolio isotope and filter
document.addEventListener('DOMContentLoaded',function (){

    $('#portfolio-flters li').on('click', function () {

        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
});



