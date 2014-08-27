// JavaScript Document
//ver 2012-10-26

var playerYouTube = null;
var positionYouTube = null;
var playerYouTubeWidth = 640;
var playerYouTubeHeight = 360;
var playerButton = null;
	
var windowWidth = null;
var windowHeight = null;	
	
var versionSupportYouTube = null;

var $player;
var $preloader;
	
var playerYouTubeVars = {
			'autohide': 0,
			'autoplay': autoplayYouTube,
			'disablekb': 0,
			'enablejsapi': 1,
			'html5': 1,
			'iv_load_policy': 3,
			'loop': loopYouTube,
			'modestbranding': 0,
			'rel': 0,
			'showinfo': 0,
			'showsearch': 0,
			'start': 0,
			'controls': 0 
		};
		
var strParamsUrlYouTube = '';
			
for(name in playerYouTubeVars) {
	strParamsUrlYouTube += '&' + name + '=' + playerYouTubeVars[name];
}		
	
$(document).ready(function(){
	$player = $('#player');
	$player.find('.play-and-pause').removeClass('pause').addClass('play');
	$preloader = $('<div class="slider-preloader"><span></span></div>').css('opacity', 0.7);
	$player.find('div').css('display', 'none');
	$preloader.appendTo($player);													 
													 
	windowWidth = $(window).width();
	windowHeight = $(window).innerHeight();													 
													 
	positionYouTube = $('#fs-youtube');	
	
	$player.find('a.play-and-pause').bind('click', function(event){				
		if($(this).hasClass('pause')) {
			playerYouTube.pauseVideo();
		}
		else {
			playerYouTube.playVideo();
		}
		
		event.preventDefault();
	});
	
	
	$(window).resize(function(){
		if(playerYouTube != null) {			
			windowWidth = $(window).width();
			windowHeight = $(window).innerHeight();
		
			resizeFullScreenYouTube();
		}
	});			
	
	//jQuery.getScript('js/fullscreen-youtube-iframe.js');
	
	jQuery.os =  { name: (/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase()) || [u])[0].replace('sunos', 'solaris') };
	
	//if((jQuery.browser.msie && parseInt(jQuery.browser.version) <= 8) || (jQuery.browser.safari && (window.navigator.userAgent.search(/chrome/i) <= 0) &&jQuery.os.name == 'win')) {
    if((jQuery.browser.msie && parseInt(jQuery.browser.version) <= 8)) {
		//playerButton.text('version = ' + jQuery.browser.version + ' OS = ' + jQuery.os.name);
		versionSupportYouTube = 'swf';
		jQuery.getScript('js/fullscreen-youtube-swf.js');
	}
	else {
		jQuery.getScript('js/fullscreen-youtube-iframe.js');
	}
});
	
	
//-------------------------------------------------------------------------------	
	
function stateYouTubePlayerButton(state) {
	switch(state) {
		case 1: //playing		
			$('#player .play-and-pause').removeClass('play').addClass('pause');
			break;
		case 2: //paused
			$('#player .play-and-pause').removeClass('pause').addClass('play');
			break;
	}
}

function resizeFullScreenYouTube() {
	
	//return false;
	
	switch(fullscreenType) {
		case 1://fullscreen
			eval('resizeFullScreenYouTube1()');
			break;
		case 2://only large side
			eval('resizeFullScreenYouTube2()');
			break;
	}
}

function resizeFullScreenYouTube1() {		
	var kw = parseFloat(windowWidth / (playerYouTubeWidth -  25));
	var kh = parseFloat(windowHeight / (playerYouTubeHeight - 25));

	var k = kw;
	if(kh > kw) {k = kh;}
		
	var w = parseInt(playerYouTubeWidth * k);
	var h = parseInt(playerYouTubeHeight * k);

	if(w < windowWidth) {w = windowWidth;}
	if(h < windowHeight) {h = windowHeight;}
		
	setYouTubeSize(w, h);

	positionYouTube.css({'margin-left': 0, 'margin-height': 0});
		
	if(w > windowWidth) {
		kw = -Math.ceil(w - windowWidth)/2 + 1;			
		if((kw + w) < windowWidth) {kw = 0;}

		positionYouTube.css({'margin-left': kw});
	}
		
	if(h > windowHeight) {
		kh = -Math.ceil(h - windowHeight)/2 + 1;
		if((kh + h) < windowHeight) {kh = 0;}

		positionYouTube.css({'margin-top': kh});
	}
}

function resizeFullScreenYouTube2() {
	var kw = parseFloat(windowWidth / playerYouTubeWidth);
	var kh = parseFloat(windowHeight / playerYouTubeHeight);

	var k = kw;
	if(kh < kw) {k = kh;}
		
	var w = parseInt(playerYouTubeWidth * k);
	var h = parseInt(playerYouTubeHeight * k);

	if(w < windowWidth) {w = windowWidth;}
	if(h < windowHeight) {h = windowHeight;}
		
	setYouTubeSize(w, h);
}

	
function setYouTubeSize(width, height){
	playerYouTubeWidth = width;
	playerYouTubeHeight = height;
	
	if(versionSupportYouTube == 'swf') {
		playerYouTube.width = width;
		playerYouTube.height = height;
	}
	else {
		playerYouTube.setSize(width, height);
	}
}