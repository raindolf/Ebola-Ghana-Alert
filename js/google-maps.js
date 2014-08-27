// JavaScript Document
//--- ver 2012-09-14

$(document).ready(function(){
	
	var myLatlng = new google.maps.LatLng($googleMapsLat, $googleMapsLng);

	var myOptions = {
		zoom: $googleMapsZoom,
		center: myLatlng,
		panControl: true,
		zoomControl: true,
		mapTypeControl: true,
		scaleControl: true,
		overviewMapControl: false,
		zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL},
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
			
	var map = new google.maps.Map(document.getElementById("location"), myOptions);		
			
	var marker = new google.maps.Marker({
		position: myLatlng, 
		map: map
	});
			
	var idInt = setInterval(function(){
		google.maps.event.trigger(map, "resize"); 
		map.setCenter(marker.getPosition());
	}, 2000);

	google.maps.event.addListener(map, "mousedown", function(){
		clearInterval(idInt);
	});
});