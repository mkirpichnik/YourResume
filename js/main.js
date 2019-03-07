$(function(){
    
    var heightsAncors = new Array();
    var ancorsIds = ["#about", "#education", "#experience", "#skills", "#contact"];
    var widthsPB = [];
    
    $('a[href^="#"]').click(function () {

        var hrefs = $('#nav-bar-header > ul > li > a');
        hrefs.removeClass('active-link');

        if ($.inArray(this, hrefs) !== -1) {
            $(this).addClass('active-link');
        }

        var target = $(this).attr('href');
        $('html, body').animate({ scrollTop: $(target).offset().top }, 800);
        
        return false;
    });

    $(window).on('scroll', function () {
        var navigation = $('.navigation'),
            documentTop = $(document).scrollTop();

        if (documentTop > 10)
            navigation.addClass('fixed-navigation');
        else
            navigation.removeClass('fixed-navigation');

        var scrolled = $(document).scrollTop();//;; + $(window).innerHeight();

        if (heightsAncors.length === 0) {

            var offset = 0;

            for (var ancorId in ancorsIds) {
                if (heightsAncors.length > 0)
                    offset = heightsAncors[heightsAncors.length - 1];

                heightsAncors.push($(ancorsIds[ancorId]).innerHeight() + offset);

                $("#skills").each(function () {
                    var progressBar = $(".progress-bar");

                    progressBar.each(function (indx) {
                        widthsPB.push($(this).attr("data-valuenow"));
                        $(this).css("width", "0%");
                    });
                });
            }
        }

        for (var i = 0; i < heightsAncors.length; ++i) {
            if ($(ancorsIds[i]).offset().top - 200 < scrolled) {
                var hrefs = $('#nav-bar-header > ul > li > a');
                hrefs.removeClass('active-link');
                $(hrefs[i]).addClass('active-link');

                if (ancorsIds[i] === "#skills") {
                    setTimeout(function () {
                        $("#skills").each(function () {
                            var progressBar = $(".progress-bar");

                            progressBar.each(function (indx) {
                                $(this).css("width", widthsPB[indx] + "%");
                            });
                        });
                    }, 700);
                }
            }
        }
    });
})