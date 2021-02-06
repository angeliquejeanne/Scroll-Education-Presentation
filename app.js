$(document).ready(function() {

$('section').each(function(){
  $('.slider-navigation').prepend('<div class="tick"></div>');
});

$('.tick').on('click',function(){
  let tickIndex = $(this).index();
  $('body').scrollTop( $(window).height() * tickIndex );
});

updatePos();

}); // end document ready


let isDragging = false;
let sliderTop,pointerPos,currentSection;

let bodyHeight = $('body').height();
let sliderHeight = $('.slider-navigation').height();
let elementHeight = $('section').height();
let sectionAmount = $('section').length;
let scale = (bodyHeight - (elementHeight)) / (sliderHeight - $('.nav-pointer').outerHeight() );


let waitForFinalEvent = (function () {
let timers = {};
return function (callback, ms, uniqueId) {
  if (!uniqueId) {
    uniqueId = "resize";
  }
  if (timers[uniqueId]) {
    clearTimeout (timers[uniqueId]);
  }
  timers[uniqueId] = setTimeout(callback, ms);
};
})();


function updatePos() {
currentSection = $(window).scrollTop() / elementHeight;
currentSectionNum = Math.ceil(currentSection + 0.01) ;
sliderTop = $(window).scrollTop() / scale;
$('.nav-pointer').css('top', sliderTop).text(currentSectionNum + '/' + sectionAmount);
}

function sliderMove(e) {
$('body').scrollTop(parseInt(e) * scale);
}

$(window).scroll(function(){
if (!isDragging) {
  updatePos();
}
});


$(window).resize(function () {
waitForFinalEvent(function(){
  bodyHeight = $('body').height();
  sliderHeight = $('.slider-navigation').height();
  elementHeight = $('section').height();
  sectionAmount = $('section').length;
  scale = (bodyHeight - (elementHeight)) / (sliderHeight - $('.nav-pointer').outerHeight() );

  updatePos();
}, 500, "resizing");
});


$(window).resize(function(){

});

$( ".draggable" ).draggable({
axis: "y",
containment: "parent",
start: function() {
  isDragging = true;
  $('body').addClass('dragging');
},
drag: function() {
  pointerPos = $(this).css('top');
  sliderMove(pointerPos);
  updatePos();
},
stop: function() {
  isDragging = false;
  $('body').removeClass('dragging');
}
});