     $(document).ready( ()=> {
         console.log('doc ready')

         setTimeout( ()=> {

             $("#login-button").click(function (event) {
                 event.preventDefault();
                 console.log('press login')
                 $('form').fadeOut(500);
                 $('.wrapper').addClass('form-success');
             });
         }, 100)

     });