// JavaScript Document
// Version 2013-01-26

$(document).ready(function(){
	if(!$volumeAudioPlayer && $volumeAudioPlayer > 1 && $volumeAudioPlayer < 0)	{
		$volumeAudioPlayer = 0.5;
	}
	
	if($loopAudioPlayer != true && $loopAudioPlayer != false) {
		$loopAudioPlayer = false;
	}
				
	var $button = $('#audio-panel-wrap .audio-player-button');
				
	//var $idAudioPanelTimer = null;
	//var $audio_panel = $('#audio-panel');
	var $audio_player = new MediaElementPlayer('#audio-player-1', {
		audioWidth: 0,
		audioHeight: 0,
		startVolume: $volumeAudioPlayer || 0.5,
		loop: $loopAudioPlayer || false,
		features: [],
		success: function($media, $node, $buttons) {				
				$button.bind('click', function(){
					if($media.ended) {
						$media.currentTime = 0;
					}
					
					if($media.paused) {
						$media.play();				
					} 
					else {
						$media.pause();			
					}
				});	
		
				$media.addEventListener('play', function(){					
					$button.removeClass('button-stop');
				}, false);
				
				$media.addEventListener('pause', function(){
					$button.addClass('button-stop');
				}, false);
				
				$media.addEventListener('ended', function(){
					this.pause();
				}, false);												
			}
	});
});