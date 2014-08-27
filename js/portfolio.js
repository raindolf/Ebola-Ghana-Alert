// JavaScript Document

$(document).ready(function(){															 			
	var $zoomHeight = 45;		
	var $timeOut = 60;								
		
	$('.portfolio figure').each(function(){	
			var $objParent = null;
  		var $idTimer = 0;
			var $zoom_bottom = null;
			
			function hintHide() {
				$objParent.children('figcaption').stop().slideUp();
				$objParent.children('.zoom').stop().animate({opacity: 0, bottom : -$zoomHeight});
			}
			
			function hintShow() {
				hintCancelTimer();			
				var $hint = $objParent.children('figcaption');
				var $zoom_bottom = 0;
				if($hint.is('figcaption')) {
					$hint.css('height', 'auto');
					$hint.slideDown(function(){
						var $hintHeight = $(this).innerHeight() + parseInt($(this).css('border-top-width')) + parseInt($(this).css('border-bottom-width'));
						$zoom_bottom = parseInt($hintHeight + ($(this).parent().height() - $hintHeight)/2 - $zoomHeight / 2 )  + parseInt($objParent.css('padding-bottom'));					
						$(this).siblings('.zoom').animate({opacity: 1, bottom : $zoom_bottom});
					});
				}
				else {
					$zoom_bottom = parseInt($objParent.height() / 2 - $zoomHeight / 2 + parseInt($objParent.css('padding-bottom')));
					$objParent.find('.zoom').animate({opacity: 1, bottom : $zoom_bottom});	
				}				
			}
	
			function hintCancelTimer(){
				if($idTimer){
					window.clearTimeout($idTimer);
					$idTimer = null;
				}
			}
		
			function hintTimer(){			    
				$idTimer = window.setTimeout(hintHide, $timeOut);
			}			
			
			$(this).children('a').each(function(){
				var $a = $(this);			
				
				var $zoom = $('<a></a>').addClass('zoom').attr('title', 'preview').css({'bottom' : -$zoomHeight, 'opacity' : 0});	
				$zoom.insertAfter($(this));
				$zoom.bind('click', function(){
					$a.trigger('click');
				})
			})
													
			$(this).bind('mouseover', function(){
				$objParent = $(this);
								
				hintShow();
			})
			
			$(this).bind('mouseout', function(){
				hintTimer();	
			})
	});			
});

$(document).ready(function(){	
	$(".portfolio figure a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: ''
	});
});