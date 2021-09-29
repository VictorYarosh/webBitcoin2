$('form').submit(function (e) {
    var button = $(this).find("button");
    button.attr('disabled', true);
    button.css('opacity', '0.3');

    e.preventDefault();

    
    console.log('начало запроса');
    
    $.ajax({
        contentType: false,
        cache: false,
        processData: false,
        
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        
        
        data: new FormData($(this)[0]),
        
        
        success: function (result) {
            console.log(result);

            json = jQuery.parseJSON(result);

            if (json.status === 'success') 
            {
                window.location.replace(json.url);
            } 
            else 
            {
            
                // Вызов sweet alert
                Swal.fire({
                  icon: 'error',
                  title: json.title,
                  text: json.text,
                })
                
                button.attr('disabled', false);
                button.css('opacity', '1');
            }

        },

    });

});