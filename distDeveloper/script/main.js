"use strict";

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
	arrElem.each(function (idx, item) {
		arr.push(parseInt($(item).css("left")));
	});
}

/**
 * @name listenerWindowModify
 * @function
 *
 * @param arrLeftImg
 * @param arrRightImg
 *
 * @description
 */
function listenerWindowModify(arrLeftImg, arrRightImg) {
	var mainLargeImage = $(".mainLarge_right"),
	    mainMediumImage = $(".mainMedium_right"),
	    imgRight = $(".resize_right"),
	    imgLeft = $(".resize_left"),
	    imgLeftSmooth = $('.resize_left-s'),
	    imgRightSmooth = $('.resize_right-s'),
	    scrollBlock = $("#scroll");

	var WINWIDTH_LARGE = 1920,
	    WINWIDTH_MEDIUM = 1366;

	var widthWindow = $(window).width(),
	    offsetEl = (WINWIDTH_LARGE - widthWindow) / 2,
	    offsetMediumEl = (WINWIDTH_MEDIUM - widthWindow) / 2;

	console.log("widthWindow: ", widthWindow);

	// BIG DEVICE
	if (widthWindow > '1279' && widthWindow < WINWIDTH_LARGE) {

		mainLargeImage.each(function (idx, item) {
			$(item).css({
				right: -offsetEl
			});
		});
	} else {
		mainLargeImage.removeAttr("style");
	}

	// MEDIUM DEVICE
	if (widthWindow > '767' && widthWindow < WINWIDTH_MEDIUM) {
		var widthOffset = 0;

		if (widthWindow > '767' && widthWindow < '992') {
			widthOffset = 150;
		} else {
			widthOffset = 50;
		}

		mainMediumImage.each(function (idx, item) {
			$(item).css({
				right: -(offsetMediumEl - widthOffset)
			});
		});
	} else {
		mainMediumImage.removeAttr("style");
	}

	// OTHER IMAGE
	if (widthWindow > '290' && widthWindow < WINWIDTH_LARGE) {

		imgLeft.each(function (idx, item) {
			$(item).css({
				left: -offsetEl
			});
		});

		imgRight.each(function (idx, item) {
			$(item).css({
				right: -offsetEl
			});
		});

		imgLeftSmooth.each(function (idx, item) {
			$(item).css({
				left: arrLeftImg[idx] - offsetEl
			});
		});

		scrollBlock.each(function (idx, item) {
			$(item).css({
				left: arrStickyElem[idx] - offsetEl
			});
		});

		imgRightSmooth.each(function (idx, item) {
			$(item).css({
				left: arrRightImg[idx] - offsetEl
			});
		});
	} else {
		imgLeft.removeAttr("style");
		imgRight.removeAttr("style");
		imgLeftSmooth.removeAttr("style");
		imgRightSmooth.removeAttr("style");
		scrollBlock.removeAttr("style");
	}
}

/**
 *
 * @type {Array}
 */
var arrLeftSmoothImage = [],
    arrRightSmoothImage = [],
    arrStickyElem = [],
    stickyElem = $('#scroll'),
    imgLeftSmooth = $('.resize_left-s'),
    imgRightSmooth = $('.resize_right-s');

/**
 *
 */
pushOffsetValue(imgLeftSmooth, arrLeftSmoothImage);
pushOffsetValue(imgRightSmooth, arrRightSmoothImage);
pushOffsetValue(stickyElem, arrStickyElem);

/**
 *
 */
$(window).on("change resize load", function (e) {
	listenerWindowModify(arrLeftSmoothImage, arrRightSmoothImage);
});

/**
 *
 * @param btnName
 */
function modalClose(btnName) {
	$(btnName).on("click", function (e) {
		e.preventDefault();

		$(".modal").removeClass("active");
		$(".modal__content_main").removeClass("hide");
		$(".modal__content_additional").removeClass("show");
	});
}

/**
 *
 * @param btnName
 */
function modalSendEmail(btnName) {
	$(btnName).on("click", function (e) {
		e.preventDefault();

		// require email
		if (true) {
			$(".modal__content_main").addClass("hide");
			$(".modal__content_additional").addClass("show");
		} else {
			// ...
		}
	});
}

/**
 *
 * @param btnName
 */
function modalOpen(btnName) {
	$(btnName).on("click", function (e) {
		e.preventDefault();

		$(".modal").addClass("active");
	});
}

/**
 *
 * @param className
 */
function smoothScrollClick(className) {
	$(className).on("click", function (e) {
		e.preventDefault();

		var id = $(this).attr('href'),
		    top = $(id).offset().top;

		$(className).removeClass("active");
		$(this).addClass("active");

		$('body, html').animate({
			scrollTop: top - 50
		}, 1000);
	});
}

/**
 *
 */
$(function () {
	// Fade In image, fixed jump in load page
	var str = ".mainLarge_right, .mainMedium_right, " + ".resize_right, .resize_left, " + ".resize_left-s, .resize_right-s, " + "#scroll";

	var allImage = $(str);

	allImage.addClass("visible");

	// ...
	modalClose(".modal__close");
	modalSendEmail(".modal__btn");
	modalOpen(".header__btn, .change__btn, .footer__menu-btn");

	// ...
	smoothScrollClick(".scroll__btn");
});

{
	var lastID = void 0;
	var elemID = void 0;

	$(window).on("scroll load", function () {
		var y = $(this).scrollTop() + 50;

		$('.scrollSpy').each(function () {

			var yElem = $(this).offset().top;

			if (y >= yElem) {
				elemID = $(this).attr('id');

				console.log(elemID);

				if (elemID !== lastID) {
					lastID = elemID;

					$(".scroll__btn").removeClass("active");
					$('#scroll a[href="#' + elemID + '"]').addClass("active");
				}
			}
		});
	});
}