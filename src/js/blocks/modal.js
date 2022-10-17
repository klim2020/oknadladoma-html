$("#input_telephone").inputmask({"mask": "+38(099)999-99-99"});

$('#contactModal').on('shown.bs.modal', function () {
    let html = ``;
    if (! $('input[name="user__name"]').length){
        html = `<input type="hidden" name="user__name" value="secret">`;
    }
    $('#contactModal__form').append(html);

});

$('#contactModal__form').on('submit', function(event){

    $('#contactModal__form input[name="user__name"]').val('');

    //$('#contactModal__form .spinner-border').show();
    $.ajax('https://my-portfolio2022-klim.herokuapp.com/api/sendmsg',
        {
            type:'POST',
            data: $("#contactModal__form").serialize(),
            beforeSend: function(){
                $('#contactModal__form .spinner-border').toggle();
            },
            success: function (data, status, xhr) {

                $('#contactModal__form .spinner-border').toggle();
                $('.toast-body').text('Дякуемо вам на звернення, ми зв\'яжемося з вами найближчим часом');
                $('#contactModal').modal('toggle');
                new bootstrap.Toast(document.querySelector('.toast')).show();
            },
            error: function (jqXhr, textStatus, errorMessage) {
               console.log('Error' + errorMessage);
                $('#contactModal__form .spinner-border').toggle();
            }

        });
    event.preventDefault();
})