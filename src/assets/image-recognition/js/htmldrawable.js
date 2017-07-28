var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {

		AR.logger.activateDebugMode();
		AR.logger.debug('logger activated...');
		//assets/final_test.wtc
		this.targetCollectionResource = new AR.TargetCollectionResource("https://s3-eu-west-1.amazonaws.com/target-manager-live/4347e66ff6155f7613085378b923ba68/5963b498f67e6315b7658a2a/wtc/5.0/tracker.wtc", {
		});

		this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
			onTargetsLoaded: this.worldLoaded
		});

		var artList = new AR.HtmlDrawable({
			uri: "assets/art_list.html"
		}, 1, {
				viewportWidth: 1000,
				viewportHeight: 800,
				clickThroughEnabled: true,
				allowDocumentLocationChanges: false,
				onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
					// AR.context.openInBrowser(uri);
				},
				onDragBegan: function (evt) {
					AR.logger.debug(evt);
					// this.translate.y += evt;
				}
			});

		var once = false;
		var last_target = '';
		var contextTracker = this.tracker;
		$.get('http://52.15.90.163:3002/api/marker/markers/', function (res) {
			for (var j = 0; j < res.markers.length; j++) {

				var trackable = new AR.ImageTrackable(contextTracker, res.markers[j]._id, {
					drawables: {
						cam: [artList]
					},
					onImageRecognized: (target_name) => {
						AR.logger.debug('target name: ' + target_name)
						artList.html = `<html><head> <meta name='viewport' content='target-densitydpi=device-dpi, width = 1000, user-scalable = 0'> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> <style> body { background-color: transparent; } .parent { display: flex; background-color: transparent; } .carousel-container { margin: auto; height: 100%; background: transparent; } ul { display: flex; flex-direction: column; list-style-type: none; flex: 1; height: 100%; margin: 0; flex-wrap: nowrap; padding: 0; overflow: scroll; } li { flex: 1; /*display: flex;*/ margin: auto; display: flex; /*display: flex;*/ } .img-container { /* display: flex; */ } img { /* flex: 1; flex-basis: 500px; */ width: 1000px !important; height: 800px !important; /* flex: 1; margin: auto;*/ /* width: 500px; */ /*flex: 1;*/ /* flex: 1; */ /* height: 500px; */ } /* .carousel-inner>.item>img, .carousel-inner>.item>a>img { width: 70%; margin: auto; } */ .carousel-caption h3 { color: lightblue; font-size: 50px; } </style></head></html><body> <!-- <div class='parent'> <ul> <li> <img src="http://static3.businessinsider.com/image/56f020c09105842b008b7af5-1200/3dasicfernandezrubin415greenpoint-street-art-yoav-litvin.jpg"> </li> <li> <img src="https://lh4.ggpht.com/x0M8Wdb40RToZO6qhTiRHrWk3_uh-2t0H3P642oAwzPME7nlDV8BOD3L8YY"> </li> <li> <img src="http://media02.hongkiat.com/cool-street-art/street-art-norway.jpg"> </li> <li> <img src="https://s-media-cache-ak0.pinimg.com/736x/08/0b/2c/080b2c9947f0e6da1afa83d50203d60a--graffiti-artists-street-artists.jpg"> </li> </ul> </div> --> <!-- start: final carousel --> <div class='parent'> <div class='carousel-container'> <div id='gallery-carousel' class='carousel slide' data-ride='carousel'> <div class='carousel-inner' role='listbox'>`
						$.get('http://52.15.90.163:3002/api/marker/markers/' + target_name, function (marker_res) {
							let markerLat = marker_res.marker.latitude;
							let markerLong = marker_res.marker.longitude;
							for (var k = 0; k < marker_res.marker.art.length; k++) {
								if (k === 0) {

									artList.html += `<div class='item active img-container'> <img class='d-block img-fluid' src='${marker_res.marker.art[k].photo_url}'> <div class='carousel-caption'> <h3>@${marker_res.marker.art[k].created_by_id}</h3> </div> </div>"`
								} else {
									artList.html += `<div class='item img-container'> <img class='d-block img-fluid' src='${marker_res.marker.art[k].photo_url}'> <div class='carousel-caption'> <h3>@${marker_res.marker.art[k].created_by_id}</h3> </div> </div>"`

								}
							}
							artList.html += ` </div> <!-- <a class='carousel-control-prev' href="#gallery-carousel" role='button' data-slide='prev'> <span class='carousel-control-prev-icon'></span> <span class='sr-only'>Previous</span> </a> <a class='carousel-control-next' role='button' data-slide='next' href="#gallery-carousel"> <span class='carousel-control-next-icon'></span> <span class='sr-only'>Next</span> </a> --> <a class="left carousel-control" href="#gallery-carousel" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="right carousel-control" href="#gallery-carousel" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div> </div> </div> <!-- end: final carousel --> <!-- start of carousel test --> <!-- end of carousel test --> <script> $('.carousel').carousel({ interval: 4000 }) </script></body>`;

							navigator.geolocation.getCurrentPosition(
								function (position) {
									AR.logger.info('lat =' + position.coords.latitude)
									AR.logger.info('long =' + position.coords.longitude)
									let latitudeDif = Math.abs(position.coords.latitude - markerLat);
									let longitudeDif = Math.abs(position.coords.longitude - markerLong);
									let distanceBetween = Math.sqrt(Math.pow(latitudeDif, 2) + Math.pow(longitudeDif, 2))
									AR.logger.info('Distance ' + distanceBetween);
									if (distanceBetween > 0.0025) {
										context.enabled = false;
										alert('You are too far away from the target')
									} else {
										context.enabled = true;
										// alert('enabled')
									}
								})
						})
					}
				})
			}
		})
	},

	worldLoaded: function worldLoadedFn() {
		// alert(this.tracker + '<< tracker')
		var cssDivInstructions = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
		var cssDivSurfer = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px; width: 38px'";
		var cssDivBiker = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px;'";
		document.getElementById('loadingMessage').innerHTML =
			"<div" + cssDivInstructions + ">Scan Target &#35;1 (surfer) or &#35;2 (biker):</div>" +
			"<div" + cssDivSurfer + "><img src='assets/surfer.png'></img></div>";

		// Remove Scan target message after 10 sec.
		setTimeout(function () {
			var e = document.getElementById('loadingMessage');
			e.parentElement.removeChild(e);
		}, 10000);
	},

	setMarkerLocation: function () {

	}
};

World.init();
