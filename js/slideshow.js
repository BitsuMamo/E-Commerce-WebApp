var slideshowContainer = $(".slideshow-container");
var slideshowRow = $(".slideshow-container > .slideshow-row");

const slideshowContainerWidth = slideshowContainer.width();
const numberOfSlides = $(
  ".slideshow-container > .slideshow-row > .slide"
).length;
const slide = $($(".slideshow-container > .slideshow-row > .slide")[0]);
const eachElementWidth = slide.width();
const slideMargins =
  Number.parseInt(slide.css("margin-right").split("px")[0]) +
  Number.parseInt(slide.css("margin-left").split("px")[0]);

const totalLen =
  eachElementWidth * numberOfSlides +
  slideMargins * numberOfSlides -
  slideshowContainerWidth;

function initSlideshow() {
  // console.log("slide show Container Width: ", slideshowContainerWidth);
  // console.log("numberOfSlides: ", numberOfSlides);
  // console.log("each Element Width: ", eachElementWidth);
  // console.log("totalLen: ", totalLen);
  var percentage = 0;

  var conter = 0;
  var timer = setInterval(function () {
    const oneSlideWidth = eachElementWidth + slideMargins;

    if (conter == numberOfSlides) {
      slideshowRow.stop();
      //clearInterval(timer);
      //console.log("reset");
      conter = 0;
      slideshowRow.stop().animate({ scrollLeft: 0 }, 100, () => {
        slideshowRow.scrollLeft(0);
      });
    }
    // console.log("percentage: ", conter * oneSlideWidth);
    // console.log("scrollLeft: ", slideshowRow.scrollLeft());
    slideshowRow.stop().animate({ scrollLeft: conter * oneSlideWidth }, 1000);

    conter++;
  }, 2000);

  $(slideshowRow).on("scroll", function () {
    var scrollLeft = $(slideshowRow).scrollLeft();
    percentage = Math.floor((scrollLeft / totalLen) * 100);
    //console.log("percentage: ", percentage);
  });
}

export { initSlideshow as default };
