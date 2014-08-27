// JavaScript Document
//Version 2012-10-26

/*----------------------------------- */
// START Fullscreen YouTube iFrame 
/*----------------------------------- */

$(document).ready(function(){	
	jQuery.getScript('http://www.youtube.com/player_api');
	$('#fs-youtube-player').remove();
	$('#fs-youtube').append('<iframe id="fs-youtube-player" type="text/html" width="' + windowWidth + '" height="' + windowHeight + '"  src="http://www.youtube.com/embed/' + idYouTube + '?html5=1' + strParamsUrlYouTube + '" frameborder="0"></iframe>');
});

function onYouTubeIframeAPIReady() {
  playerYouTube = new YT.Player('fs-youtube-player', {  		
    videoId: idYouTube,
 	  events: {
			'onReady' : onPlayerYouTubeReady,
			'onStateChange' : onPlayerYouTubeStateChange
			}
   });
	
	resizeFullScreenYouTube();
 }
	
function onPlayerYouTubeReady() {
	$('#fs-youtube-blank').remove();
	$('#player div.btn-2').css({'display': 'block', 'float' : 'none', 'margin-left': '44px'});
	$('#player .slider-preloader').css('display', 'none');
}
	
function onPlayerYouTubeStateChange(event) {
	if(event.data == 0 && playerYouTubeVars['loop'] == 1) {
		playerYouTube.playVideo();
	}
	
	stateYouTubePlayerButton(event.data);
}

//-----------------------------------------------


		