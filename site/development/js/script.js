$(document).ready(function(){

var $window = $(window);
	
	$('.john').each(function(){
        var $bgobj = $(this); // assigning the object
		
        $(window).scroll(function() {
			
            var yPos = ($window.scrollTop() / $bgobj.data('speed')) + 502; 
            
            // Put together our final background position
            var coords = yPos + 'px';
			
            // Move the background
            $bgobj.css({ 'background-size': coords});
			
        });
		
    }); 
	
});