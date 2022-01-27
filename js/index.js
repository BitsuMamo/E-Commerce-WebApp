// nav on scoll change color
const nav = $("#hero #nav");
const hero = $("#hero");

// nav on scoll change color
$(window).on("scroll", function () {
  var scrollTop = $(window).scrollTop();
  const heroHeight = hero.height();
  const heightFactor = heroHeight * 0.3;
  if (scrollTop > heightFactor) {
    // nav.animate({ height: "60px" }, 200);
    nav.addClass("nav-scroll");
    nav.addClass("gmd-5");
  } else {
    nav.removeClass("nav-scroll");
    nav.removeClass("gmd-5");
  }
});

// go to market page
$("#MarketPlace > #goTOMarketPlace").click(function () {
  window.location.href = "market.html";
});
