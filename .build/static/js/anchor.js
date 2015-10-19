$(document).ready(function() {
  function buildAnchorMenu() {
    var am = $('#anchorMenu');
    var al = $('.anchor-link');
    var alContent = [];
    var alPosition = [];
  
    // get anchors hashes and text
    $(al).each(function(){
      alPosition.push($(this).offset().top);
      alContent.push($(this).textNotChild());
      $(this).attr('id', 'anchor-' + $(this).textNotChild());
    });

    // create anchor menu links
    $(alContent).each(function(){
      $('<li><a href="#anchor-' + this + '" id="anchor-' + this + '">' + this + '</a>').appendTo(am);
    });

    var windowWidth = $(window).width();
    var amLinks = $('#anchorMenu a');
    var amPosition = $(am).offset().top;

    // move screen when an anchor menu link is clicked
    $(amLinks).click(function(e){
      var jumpobj = $(this).parent().index();
      var target = alPosition[jumpobj] - 55;
      var thespeed = 1000;
      $('html,body').animate({
        scrollTop: target
      }, thespeed, 'swing');
      e.preventDefault();
    })

    // update active based on scroll position
    if (windowWidth > 768) {
      // add active on first link 
      $('#anchorMenu li:first-of-type a').addClass('active');
      $(window).scroll(function(){
        var currentPosition = $(window).scrollTop();
        
        if (amPosition <= currentPosition + 70) {
          $(am).addClass('fixed');
        }
        else {
          $(am).removeClass('fixed');
        }

        for (var i = 1; i < alPosition.length + 1; i++) {
          if (currentPosition + 80 >= alPosition[i - 1] && currentPosition + 80 < alPosition[i]) {
            $(amLinks).removeClass('active');
            $('#anchorMenu li:nth-of-type(' + i + ') a').addClass('active');
          }
        }
      });
    }
  }

  buildAnchorMenu();
});
