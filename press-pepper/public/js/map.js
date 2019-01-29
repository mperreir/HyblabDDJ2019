var mymap = L.map('mapid',{attributionControl: false, zoomControl: false}).setView([47.895950, -1.750340], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
	{foo: 'bar',
	minZoom: 7,
	maxZoom: 12
	}).addTo(mymap);

var circle = L.circle([47.775830, -1.346720], {
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.5,
	radius: 500
}).addTo(mymap);