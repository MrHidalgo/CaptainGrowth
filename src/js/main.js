/**
 * @name pushOffsetValue
 * @function
 *
 * @param arrElem
 * @param arr
 *
 * @description
 */
function pushOffsetValue(arrElem, arr) {
	arrElem.each(function(idx, item) {
		arr.push(parseInt($(item).css("left")));
	});
}


/**
 *
 */
$(function() {
    let arrLeftSmoothImage  = [],
        arrRightSmoothImage = [];
    
    const imgRight      = $(".resize_right"),
        imgLeft         = $(".resize_left"),
        imgLeftSmooth   = $('.resize_left-s'),
        imgRightSmooth  = $('.resize_right-s');
	
	console.log('imgRightSmooth: ', imgRightSmooth);
	
	pushOffsetValue(imgLeftSmooth, arrLeftSmoothImage);
	pushOffsetValue(imgRightSmooth, arrRightSmoothImage);
	
	console.log("arrRightSmoothImage: ", arrRightSmoothImage);
	
	$(window).on("change resize load", function() {
        const WINWIDTH = 1920;

        let widthWindow = $(this).width(),
	        offsetEl    = ((WINWIDTH - widthWindow) / 2);
        
	    if(widthWindow > '1365' && widthWindow < WINWIDTH) {

            imgLeft.each(function(idx, item) {
                $(item).css({
                    left: -(offsetEl)
                });
            });
		
		    imgRight.each(function(idx, item) {
			    $(item).css({
				    right: -(offsetEl)
			    });
		    });
		
		    imgLeftSmooth.each(function(idx, item) {
			    $(item).css({
                    left: arrLeftSmoothImage[idx] - offsetEl
                });
            });
		
		    imgRightSmooth.each(function(idx, item) {
			    $(item).css({
                    left: arrRightSmoothImage[idx] - offsetEl,
                });
            });

        } else {
            imgLeft.removeAttr("style");
            imgRight.removeAttr("style");
		    imgLeftSmooth.removeAttr("style");
		    imgRightSmooth.removeAttr("style");
        }
    });
});
