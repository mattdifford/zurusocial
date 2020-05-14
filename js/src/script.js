$(document).ready(function () {
    $('body').addClass("loaded");
    var elements = document.querySelectorAll('.scrollwatch');
    var config = {
        threshold: 0.01
    };
    var observer;
    function onIntersection(entries) {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                observer.unobserve(entry.target);
                handleScrolledIntoView(entry.target);
            }
        });
    }

    if (!('IntersectionObserver' in window)) {
        Array.from(elements).forEach(el => handleScrolledIntoView(el));
    } else {
        observer = new IntersectionObserver(onIntersection, config);
        elements.forEach(el => {
            observer.observe(el);
        });
    }
    function handleScrolledIntoView(target) {
        target.classList.add('scrolled');
    }

    $('a').on("click", function () {
        if ($(this).attr("href").charAt(0) === '#') {
            $("html,body").animate({ scrollTop: $($(this).attr("href")).offset().top - 100 }, 750);
        }
    });
    $('#signup_form').on("submit", function (e) {
        e.preventDefault();
        var formData = $(this).serializeObject();
        formData.lp_campaign_id = '5e30378c0b5a5';
        formData.lp_campaign_key = 'nNXfVJ7d4Gzcwby2Zp6P';
        $.ajax({

            async: true,
            url: 'https://savvy.leadspediatrack.com/post.do',
            data: formData,
            type: 'POST',
            success: function (data) {
                console.log(data);
                // var msg;
                // var success = false;
                // var form = $('#signup_form');
                // if (result.response.status === 'subscribed') {
                //     success = true;
                //     msg = 'You have successfully subscribed'
                // } else if (typeof result.response.title !== "undefined") {
                //     var response_title = result.response.title;
                //     if (response_title.indexOf('Member exists') >= 0) {
                //         msg = 'This email is already subscribed to our newsletter';
                //     }
                //     if (response_title.indexOf('Invalid Resource') >= 0) {
                //         msg = 'Please check your email address and try again';
                //     }
                // } else {
                //     msg = 'Something went wrong, please try again.';
                // }
                // if (success) {
                //     form.find('.form__field').hide();
                // }
                // form.append('<p class="form__message ' + (success ? 'form__message--success' : 'form__message--error') + '">' + msg + '</p>');
            },
            error: function (e) {
                console.log(e);
                $('#signup_form').append('<p class="form__message form__message--error">Something went wrong, please try again.</p>');
            }
        });
    });
});

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};