// Dropdown Effect

$(document).ready(function () {
  $(".navbar .container .icon-list").click(function () {
    $(".navbar .container  ul.nav").fadeToggle();
  });
});

// Players Action

var forwards = $(".players-images .player.forwards");
var midfielders = $(".players-images .player.midfielders");
var defenders = $(".players-images .player.defenders");
var goalkeepers = $(".players-images .player.goalkeepers");

$(document).ready(function () {
  $(".category .items li.all").click(function () {
    $(".players-images .player").fadeIn();
  });
});
$(document).ready(function () {
  $(".category .items li.forwards").click(function () {
    midfielders.fadeOut();
    defenders.fadeOut();
    goalkeepers.fadeOut();
    forwards.fadeIn();
  });
});
$(document).ready(function () {
  $(".category .items li.midfielders").click(function () {
    forwards.fadeOut();
    defenders.fadeOut();
    goalkeepers.fadeOut();
    midfielders.fadeIn();
  });
});
$(document).ready(function () {
  $(".category .items li.defenders").click(function () {
    forwards.fadeOut();
    midfielders.fadeOut();
    goalkeepers.fadeOut();
    defenders.fadeIn();
  });
});
$(document).ready(function () {
  $(".category .items li.goalkeepers").click(function () {
    midfielders.fadeOut();
    defenders.fadeOut();
    forwards.fadeOut();
    goalkeepers.fadeIn();
  });
});

// Scroll JS

var homeOffset = $("#carouselExampleIndicators").offset().top - 50;
var trophiesOffset = $("#trophies").offset().top - 50;
var playersOffset = $("#players").offset().top - 50;
var ourkitsOffset = $("#our-kits").offset().top - 50;
var ticketsOffset = $("#tickets").offset().top - 50;
var contactUsOffset = $("#contact-us").offset().top - 50;

$(window).scroll(function () {
  var windowOffset = $(this).scrollTop();
  
  if (windowOffset >= $("#about").offset().top ) {
    $(".arrow-up").fadeIn();
  } else {
    $(".arrow-up").fadeOut();
  }

  if (windowOffset >= homeOffset && windowOffset <= trophiesOffset) {
    $(".nav .nav-item:nth-child(1)")
      .addClass("active")
      .siblings()
      .removeClass("active");
  }
  if (windowOffset >= trophiesOffset && windowOffset <= playersOffset) {
    $(".nav .nav-item:nth-child(2)")
      .addClass("active")
      .siblings()
      .removeClass("active");
  }
  if (windowOffset >= playersOffset && windowOffset <= ourkitsOffset) {
    $(".nav .nav-item:nth-child(3)")
      .addClass("active")
      .siblings()
      .removeClass("active");
  }
  if (windowOffset >= ourkitsOffset && windowOffset <= ticketsOffset) {
    $(".nav .nav-item:nth-child(4)")
      .addClass("active")
      .siblings()
      .removeClass("active");
  }
  if (windowOffset >= ticketsOffset && windowOffset <= contactUsOffset) {
    $(".nav .nav-item:nth-child(5)")
      .addClass("active")
      .siblings()
      .removeClass("active");
  }
  if (windowOffset >= contactUsOffset) {
    $(".nav .nav-item:nth-child(6)")
      .addClass("active")
      .siblings()
      .removeClass("active");
  }
});

// loading

$(window).on("load", function () {
  $(".loading-area").fadeOut(3000);
});
