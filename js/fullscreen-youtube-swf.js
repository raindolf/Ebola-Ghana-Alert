// JavaScript Document
//Version 2012-10-26

/*----------------------------------- */
// START Fullscreen YouTube SWF 
/*----------------------------------- */

$(document).ready(function(){	
	jQuery.getScript('http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js', function(){
		
		var params = { 
			allowScriptAccess: "always",
			wmode : "opaque"
			};
			
		var atts = { id: "fs-youtube-player" };			
							
		swfobject.embedSWF("http://www.youtube.com/v/" + idYouTube + "?version=3&playerapiid=player1" + strParamsUrlYouTube,
													 "fs-youtube-player", playerYouTubeWidth , playerYouTubeHeight, "9", null, null, params, atts);		
	});
});
		
function onYouTubePlayerReady() {
	playerYouTube = document.getElementById('fs-youtube-player');
	playerYouTube.addEventListener('onStateChange', 'onPlayerYouTubeStateChange');			
	
	$('#player div.btn-2').css({'display': 'block', 'float' : 'none', 'margin-left': '44px'});
	$('#player .slider-preloader').css('display', 'none');
	
	resizeFullScreenYouTube();
	$('#fs-youtube-blank').remove();
}

//-----------------------------------------------

function onPlayerYouTubeStateChange(state){
	if(state == 0 && playerYouTubeVars['loop'] == 1) {
		playerYouTube.playVideo();
	}
	
	stateYouTubePlayerButton(state);
}