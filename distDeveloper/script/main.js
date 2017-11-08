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
	    imgRightSmooth = $('.resize_right-s');

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
	}
}

/**
 *
 * @type {Array}
 */
var arrLeftSmoothImage = [],
    arrRightSmoothImage = [],
    imgLeftSmooth = $('.resize_left-s'),
    imgRightSmooth = $('.resize_right-s');

/**
 *
 */
pushOffsetValue(imgLeftSmooth, arrLeftSmoothImage);
pushOffsetValue(imgRightSmooth, arrRightSmoothImage);

/**
 *
 */
$(window).on("change resize load", function (e) {
	listenerWindowModify(arrLeftSmoothImage, arrRightSmoothImage);
});

/**
 *
 */
$(function () {
	// Fade In image, fixed jump in load page
	var allImage = $(".mainLarge_right, .mainMedium_right, .resize_right, .resize_left, .resize_left-s, .resize_right-s");

	allImage.addClass("visible");
});