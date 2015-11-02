$(document).ready(function() {
  // scroll bars
  $('.side-element').perfectScrollbar(); 

  // EZ tabs 
  var eztLink = $( ".ezt-nav a" );
  var eztRadio = $( ".ezt-nav-radio label" );

  var advLink = $( ".u-advanced-link" );
  var socialLink = $( ".u-social-toggle" );

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

  $(eztRadio).click(function() {
    var ezTarget = $(this).closest('.ezt-nav-radio').attr('ezt');
    var ezTargetSelector = '[ezt="' + ezTarget + '"] ';
    var ezIndex = $(this).parent().index() + 1; 

    //update content
    $(ezTargetSelector + '.ezt-content').removeClass('ezt-active');
    $(ezTargetSelector + '.ezt-content:nth-child(' + ezIndex + ')').addClass('ezt-active');      
  });

  $(advLink).click(function() {
    $(this).toggleClass('open');
    $(this).next().toggleClass('open');
  });

  // $(socialLink).click(function() {
  //   var socialTarget = $(this).attr("social-target");
  //   var ezTargetSelector = '[social-target="' + socialTarget + '"] ';
  //   console.log('casul');
  //   //update content
  //   $(ezTargetSelector).toggleClass('show');   
  // });

  // initialize selects
  $(document).ready(function() {
    $('select').niceSelect();
  });
});
