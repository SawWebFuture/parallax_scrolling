$(document).ready(function(){

function(){
        var $bgobj = $(this); // assigning the object
		
        $(window).scroll(function() {
			
            var yPos = ($window.scrollTop() / $bgobj.data('speed')) + 402; 
            
            // Put together our final background position
            var coords = yPos + 'px';
			
            // Move the background
            $bgobj.css({ height: coords });
			
			
        });
		
    });
	
});