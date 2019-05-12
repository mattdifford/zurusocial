$( document ).ready(function() {
    anime({
        targets: '.header',
        opacity: 1,
        delay: 500,
        duration: 500,
        complete: function() {
            setTimeout(function(){
                $('body').addClass('loaded');
            }, 500)
        }
      });
});