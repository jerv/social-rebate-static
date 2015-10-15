$(document).ready(function() {
  var toggleButton = $('.menu-controller');
  var sideMenus = $('.side-element');
  var body = $('body');

  var content = $('#bodyContent');
  var windowWidth = $(window).width();

  function elementText(el, separator) {
      var textContents = [];
      for(var chld = el.firstChild; chld; chld = chld.nextSibling) {
          if (chld.nodeType == 3) { 
              textContents.push(chld.nodeValue);
          }
      }
      return textContents.join(separator);
  }

  $.fn.textNotChild = function(elementSeparator, nodeSeparator) {
  if (arguments.length<2){nodeSeparator="";}
  if (arguments.length<1){elementSeparator="";}
      return $.map(this, function(el){
          return elementText(el,nodeSeparator);
      }).join(elementSeparator);
  }

  $.fn.hasAttr = function(name) {
    return this.attr(name) !== undefined;
  }

  function removeClasses(classPrefix) {
    var bodyHasClasses = body.hasAttr('class');

    if (bodyHasClasses) {
      var classes = body.attr("class").split(" ");
      $.each(classes, function(index) {
        if (classes[index].indexOf(classPrefix) == 0) {
          $('body').removeClass(classes[index]);
        }
      });
    }
  }

  $(toggleButton).click(function() {
    thisId = $(this).attr('id');
    classToAdd = 'active-' + thisId;
    alreadyAdded = body.hasClass(classToAdd);
    clearTimeout($(sideMenus).data('timeoutId'));
    if (alreadyAdded) {
      body.removeClass(classToAdd);
    } else {
      removeClasses('active-');
      body.addClass(classToAdd);
    }
  });

  // scroll bars
  $('.side-element').perfectScrollbar(); 

  // EZ tabs 
  var eztLink = $( ".ezt-nav a" );

  $(eztLink).click(function() {
    var ezTarget = $(this).closest('ul').attr('ezt');
    var ezTargetSelector = '[ezt="' + ezTarget + '"] ';
    var ezIndex = $(this).parent().index() + 1; 

    var currentlyActive = $(this).hasClass('ezt-active');

    if (!currentlyActive) {
      // update nav
      $(ezTargetSelector + 'li a').removeClass('ezt-active');
      $(ezTargetSelector + 'li:nth-child(' + ezIndex + ') a').addClass('ezt-active');
      //update content
      $(ezTargetSelector + '.ezt-content').removeClass('ezt-active');
      $(ezTargetSelector + '.ezt-content:nth-child(' + ezIndex + ')').addClass('ezt-active');
    }            
  });

  // initialize fast click
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
    }, false);
  }

  // initialize selects
  $(document).ready(function() {
    $('select').niceSelect();
  });

  if (windowWidth >= 991) {
    $(sideMenus).mouseenter(function() {
      clearTimeout($(content).data('timeoutId'))
    });

    $(content).mouseenter(function() {
      timeoutId = setTimeout(function(){
        removeClasses('active-');
      }, 650);
      $(this).data('timeoutId', timeoutId); 
    });
  }
  else {
    $(content).click(function(){
      removeClasses('active-');
    });
  }

  // REST ONLY NEEDED FOR PAGES WITH ANCHOR LINK MENUS

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
        // return false;

        // if ($.inArray(currentPosition, alPosition)) {
          // console.log('fire');
        // }
      });
    }
  }

  buildAnchorMenu();
});
