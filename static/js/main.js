$(document).ready(function() {
  var toggleButton = $('.menu-controller');
  var sideMenus = $('.side-element');
  var body = $('body');

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

  $(sideMenus).mouseenter(function() {
    clearTimeout($('#bodyContent').data('timeoutId'))
  });

  $('#bodyContent').mouseenter(function() {
    timeoutId = setTimeout(function(){
      removeClasses('active-');
    }, 650);
    $(this).data('timeoutId', timeoutId); 
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
});
