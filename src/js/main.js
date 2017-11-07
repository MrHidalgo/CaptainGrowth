$(function() {

    let imgRight    = $(".resize_right"),
        imgLeft     = $(".resize_left");

    console.log(imgRight);
    console.log(imgLeft);

    $(window).on("change resize load", function() {
        const WINWIDTH = 1920;

        let widthWindow = $(this).width();

        if(widthWindow > '1365' && widthWindow < WINWIDTH) {

            imgRight.each(function(idx, item) {
                let rightOffset = $(item).css("right");

                // console.log("rightOffset: ", parseFloat(rightOffset));
                // console.log("rightOffset - ((WINWIDTH - widthWindow) / 2): ", parseFloat(rightOffset) - ((WINWIDTH - widthWindow) / 2));

                $(item).css({
                    // right: parseFloat(rightOffset) - ((WINWIDTH - widthWindow) / 2)
                    right: -((WINWIDTH - widthWindow) / 2)
                });
            });

            imgLeft.each(function(idx, item) {
                let leftOffset = $(item).css("left");

                // console.log("leftOffset: ", leftOffset);
                // console.log("leftOffset - ((WINWIDTH - widthWindow) / 2): ", leftOffset - ((WINWIDTH - widthWindow) / 2));

                $(item).css({
                    left: -((WINWIDTH - widthWindow) / 2)
                });
            });

        } else {
            imgRight.removeAttr("style");
            imgLeft.removeAttr("style");
        }
    });
});
