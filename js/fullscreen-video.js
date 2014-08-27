// JavaScript Document
//Version 2012-09-12


/*----------------------------------- */
/* START Fullscreen Video Image   */
/*----------------------------------- */

$(document).ready(function(){
	/* ---- BEGIN --- First Create Video ---- */												 
	var $player = $('#player');
	$player.find('.play-and-pause').removeClass('pause').addClass('play');
	var $preloader = $('<div class="slider-preloader"><span></span></div>').css('opacity', 0.7);
	$player.find('div').css('display', 'none');
	$preloader.appendTo($player);
	
	if(!$volumeVideoPlayer && $volumeVideoPlayer > 1 && $volumeVideoPlayer < 0)	{
		$volumeVideoPlayer = 0.5;
	}
	
	var $video_events = null;	
	var $video = new MediaElementPlayer('#video-player', {
		startVolume: $volumeVideoPlayer,
		loop: $loopVideoPlayer,
		iPadUseNativeControls: false,
		iPhoneUseNativeControls: false,
		AndroidUseNativeControls: false,
		success: function($media, $node, $player) {				
				$('#player div.btn-2').css({'display': 'block', 'float' : 'none', 'margin-left': '44px'});
				$('#player .slider-preloader').css('display', 'none');
				if(parseInt($(window).width()) > 500) {
					$('#player .play-and-pause').removeClass('play').addClass('pause');
					$media.play();
				}
				$video_events = $media;				
			}
	});		
	/* ---- END --- First Create Video ---- */
													 
	$('#fullscreen-video').show();
	
	var $video_wrap = $('#fullscreen-video-inner');
	var $windowWidth = $(window).width();
	var $windowHeight = $(window).innerHeight();
	
	$(window).resize(function(){
		$windowWidth = $(window).width();
		$windowHeight = $(window).innerHeight();
	
		resizeFullScreenVideo();
	});		
	
	$player.find('a.play-and-pause').bind('click', function(event){		
		if($(this).hasClass('pause')) {
			$(this).removeClass('pause').addClass('play');
			$video.pause();
		}
		else {
			$(this).removeClass('play').addClass('pause');
			$video.play();
		}
		
		event.preventDefault();
	});
	
	resizeFullScreenVideo();
	
	/*-------------------------------------*/
	
	function resizeFullScreenVideo() {		
		var $kw = parseFloat($windowWidth / ($video_wrap.width() - 25));
		var $kh = parseFloat($windowHeight / ($video_wrap.height() - 25));
		
		var $k = $kw;
		if($kh > $kw) {$k = $kh;}
		
		var $w = parseInt($video_wrap.width() * $k);
		var $h = parseInt($video_wrap.height() * $k);
		
		if($w < $windowWidth) {$w = $windowWidth;}
		if($h < $windowHeight) {$h = $windowHeight;}
		
		$video_wrap.css({'width' : $w, 'margin-left' : 0});
		$video_wrap.css({'height' : $h, 'margin-top' : 0});	
		
		if($w > $windowWidth) {
			$kw = -Math.ceil($w - $windowWidth)/2 + 1;			
			if(($kw + $w) < $windowWidth) {$kw = 0;}
			$video_wrap.css('margin-left', $kw);
		}
		
		if($h > $windowHeight) {
			$kh = -Math.ceil($h - $windowHeight)/2 + 1;
			if(($kh + $h) < $windowHeight) {$kh = 0;}
			$video_wrap.css('margin-top', $kh);
		}
	}
});