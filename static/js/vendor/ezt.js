$(function(){  
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
});