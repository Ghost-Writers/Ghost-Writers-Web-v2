var World = {
	loaded: false,

	init: function initFn() {
		// alert('creating overlay')
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

		// '162f925e3bc546141ebbdfae63ff97f1', '595edc6053f64031675c2b92'
		// this.cloudRecognitionService = new AR.CloudRecognitionService("dca0e79374ebe373d002d984495e729b", "5963b498f67e6315b7658a2a", {
		// 	onInitialized: this.worldLoaded,
		// 	onError: function (err) { alert('error happended' + err) }
		// });
		// this.tracker = new AR.ImageTracker(this.cloudRecognitionService);

		// var cloudRecognitionService = new AR.CloudRecognitionService("dca0e79374ebe373d002d984495e729b", "5963b498f67e6315b7658a2a", {
		// 	onInitialized: function () {
		// 		// enable UI elements to start recognition calls
		// 		alert('in on initialized...');
		// 		AR.logger.info('Cloud Recognition Initialized')
		// 	},
		// 	onError: function(err) {
		// 		alert('error happened');
		// 		AR.logger.error('recognition error' + err);
		// 	}
		// });

		// var tracker = new AR.ImageTracker(cloudRecognitionService, {
		// 	onTargetsLoaded: function () {
		// 		alert('all targets loaded')
		// 		AR.logger.info('All Targets Initialized')

		// 	},
		// 	onError: function(err) {
		// 		alert('error happened' + err)
		// 		AR.logger.error('error with tracker' + err)
		// 	},
		// 	onDisabled: function() {
		// 		alert('i was disabled!')
		// 	}	
		// });


		// cloudRecognitionService.startContinuousRecognition(500, function onInterruptionCallback(suggestedInterval) {
		// 		alert('this is error' + suggestedInterval);
		// 	}, function onRecognizedCallback(recognized, responseData) {
		// 		if (recognized) {
		// 			alert('Found Target');
		// 			// A target image was found in the processed camera frame.
		// 			// The name of the recognized target can be retrieved from the responseData object.
		// 			// alert('recognized target image: ' + responseData.targetInfo.name);
		// 		}
		// 		else {
		// 			// No target image could be found in the processed camera frame.
		// 		}
		// 	}, function onErrorCallback(code, errorObject) {
		// 		alert(code + ' ' + errorObject + '<< error');
		// 		AR.logger.info('continiuous error ' + errorObject)
		// 	})

		// ... additional code...

		// to start a single recognition process, call the cloud recognition service's recognize function.
		// cloudRecognitionService.recognize(function (recognized, responseData) {
		// 	if (recognized) {
		// 		// A target image was found in the processed camera frame.
		// 		// The name of the recognized target can be retrieved from the responseData object.
		// 		alert('recognized target image: ' + responseData.targetInfo.name);
		// 	}
		// 	else {
		// 		// No target image could be found in the processed camera frame.
		// 	}
		// });




		// var imgOne = new AR.ImageResource("assets/street_art.jpg");
		// var overlayOne = new AR.ImageDrawable(imgOne, 0.5, {
		// 	translate: {
		// 		x: -0.15
		// 	}
		// });
		// var imgA = new AR.ImageResource("assets/street_art_2.jpg");
		// var overlayA = new AR.ImageDrawable(imgA, 0.5, {
		// 	translate: {
		// 		x: -0.15
		// 	}
		// });
		// var imgB = new AR.ImageResource("assets/street_art_3.jpg");
		// var overlayB = new AR.ImageDrawable(imgB, 0.5, {
		// 	translate: {
		// 		x: -0.15
		// 	}
		// });
		// var imgC = new AR.ImageResource("assets/street_art_4.jpg");
		// var overlayC = new AR.ImageDrawable(imgC, 0.5, {
		// 	translate: {
		// 		x: -0.15
		// 	}
		// });




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


		// get all targets
		// loop through targets and make trackable for each target
		// add drawable for each one
		var once = false;
		var last_target = '';
		var contextTracker = this.tracker;
		$.get('http://52.15.90.163:3002/api/marker/markers/', function (res) {
			// var contextTracker = this.tracker;
			// AR.logger.info('tracker >' + contextTracker)
			// AR.logger.info(JSON.stringify(res))
			for (var j = 0; j < res.markers.length; j++) {

				var trackable = new AR.ImageTrackable(contextTracker, res.markers[j]._id, {
					drawables: {
						cam: [artList]
					},
					onImageRecognized: (target_name) => {
						AR.logger.debug('target name: ' + target_name)
						// artList.html = `<h1>${target_name}</h1>`
						// artList.html = `<div class='parent'> <div class='carousel-container'> <div id='gallery-carousel' class='carousel slide' data-ride='carousel'> <div class='carousel-inner' role='listbox'> <div class='item active img-container'> <img class='d-block img-fluid' src="http://static3.businessinsider.com/image/56f020c09105842b008b7af5-1200/3dasicfernandezrubin415greenpoint-street-art-yoav-litvin.jpg"> <div class='carousel-caption'> <h3>@user-one</h3> </div> </div> <div class='item img-container'> <img class='d-block img-fluid' src="https://lh4.ggpht.com/x0M8Wdb40RToZO6qhTiRHrWk3_uh-2t0H3P642oAwzPME7nlDV8BOD3L8YY"> <div class='carousel-caption'> <h3>@user-two</h3> </div> </div> <div class='item img-container'> <img class='d-block img-fluid' src="http://media02.hongkiat.com/cool-street-art/street-art-norway.jpg"> <div class='carousel-caption'> <h3>@user-three</h3> </div> </div> <div class='item img-container'> <img class='d-block img-fluid' src="https://s-media-cache-ak0.pinimg.com/736x/08/0b/2c/080b2c9947f0e6da1afa83d50203d60a--graffiti-artists-street-artists.jpg"> <div class='carousel-caption'> <h3>@user-four</h3> </div> </div>`
						artList.html = `<html><head> <meta name='viewport' content='target-densitydpi=device-dpi, width = 1000, user-scalable = 0'> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> <style> body { background-color: transparent; } .parent { display: flex; background-color: transparent; } .carousel-container { margin: auto; height: 100%; background: transparent; } ul { display: flex; flex-direction: column; list-style-type: none; flex: 1; height: 100%; margin: 0; flex-wrap: nowrap; padding: 0; overflow: scroll; } li { flex: 1; /*display: flex;*/ margin: auto; display: flex; /*display: flex;*/ } .img-container { /* display: flex; */ } img { /* flex: 1; flex-basis: 500px; */ width: 1000px !important; height: 800px !important; /* flex: 1; margin: auto;*/ /* width: 500px; */ /*flex: 1;*/ /* flex: 1; */ /* height: 500px; */ } /* .carousel-inner>.item>img, .carousel-inner>.item>a>img { width: 70%; margin: auto; } */ .carousel-caption h3 { color: lightblue; font-size: 50px; } </style></head></html><body> <!-- <div class='parent'> <ul> <li> <img src="http://static3.businessinsider.com/image/56f020c09105842b008b7af5-1200/3dasicfernandezrubin415greenpoint-street-art-yoav-litvin.jpg"> </li> <li> <img src="https://lh4.ggpht.com/x0M8Wdb40RToZO6qhTiRHrWk3_uh-2t0H3P642oAwzPME7nlDV8BOD3L8YY"> </li> <li> <img src="http://media02.hongkiat.com/cool-street-art/street-art-norway.jpg"> </li> <li> <img src="https://s-media-cache-ak0.pinimg.com/736x/08/0b/2c/080b2c9947f0e6da1afa83d50203d60a--graffiti-artists-street-artists.jpg"> </li> </ul> </div> --> <!-- start: final carousel --> <div class='parent'> <div class='carousel-container'> <div id='gallery-carousel' class='carousel slide' data-ride='carousel'> <div class='carousel-inner' role='listbox'>`
						$.get('http://52.15.90.163:3002/api/marker/markers/' + target_name, function(marker_res) {
							// artL2ist.html = "<img style='width: 800px; height: 800px;' src=" + marker_res.marker.art[0]['photo_url'] + ">"
							for (var k = 0; k < marker_res.marker.art.length; k++) {
							// artList.html += ""
							if (k === 0) {

							artList.html += `<div class='item active img-container'> <img class='d-block img-fluid' src='${marker_res.marker.art[k].photo_url}'> <div class='carousel-caption'> <h3>@${marker_res.marker.art[k].created_by_id}</h3> </div> </div>"`
							} else {
							artList.html += `<div class='item img-container'> <img class='d-block img-fluid' src='${marker_res.marker.art[k].photo_url}'> <div class='carousel-caption'> <h3>@${marker_res.marker.art[k].created_by_id}</h3> </div> </div>"`

							}
							}
							// artList.html += ` </div> <!-- <a class='carousel-control-prev' href="#gallery-carousel" role='button' data-slide='prev'> <span class='carousel-control-prev-icon'></span> <span class='sr-only'>Previous</span> </a> <a class='carousel-control-next' role='button' data-slide='next' href="#gallery-carousel"> <span class='carousel-control-next-icon'></span> <span class='sr-only'>Next</span> </a> --> <a class="left carousel-control" href="#gallery-carousel" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="right carousel-control" href="#gallery-carousel" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div> </div> </div>`
							artList.html += ` </div> <!-- <a class='carousel-control-prev' href="#gallery-carousel" role='button' data-slide='prev'> <span class='carousel-control-prev-icon'></span> <span class='sr-only'>Previous</span> </a> <a class='carousel-control-next' role='button' data-slide='next' href="#gallery-carousel"> <span class='carousel-control-next-icon'></span> <span class='sr-only'>Next</span> </a> --> <a class="left carousel-control" href="#gallery-carousel" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="right carousel-control" href="#gallery-carousel" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div> </div> </div> <!-- end: final carousel --> <!-- start of carousel test --> <!-- end of carousel test --> <script> $('.carousel').carousel({ interval: 2000 }) </script></body>`;
						})
						// $.get('http://52.15.90.163:3002/api/marker/markers/' + target_name, function (marker_res) {
						// 	var artListTemp = new AR.HtmlDrawable({
						// 		html: "<div>...</div>"

						// 	}, 1, {
						// 			viewportWidth: 1000,
						// 			viewportHeight: 800,
						// 			clickThroughEnabled: true,
						// 			allowDocumentLocationChanges: false,
						// 			onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
						// 				// AR.context.openInBrowser(uri);
						// 			},
						// 			onDragBegan: function (evt) {
						// 				AR.logger.debug(evt);
						// 				// this.translate.y += evt;
						// 			},
						// 			onLoaded: function () {
						// 				// if (true) {
						// 				// once = true;
						// 				// alert('reloaded')
						// 				// artListTwo.html += "<div style='height:50px; width: 50px; background-color: lightblue; border: 2px solid purple;'>Test add div</div>"
						// 				// alert(JSON.strigify(marker))
						// 				AR.logger.info(JSON.stringify(marker_res.marker.art) + 'pppppp')
						// 				artListTemp.html = '';
						// 				// AR.logger.info(JSON.stringify(marker.marker.art) + 'in if')
						// 				for (var i = 0; i < marker_res.marker.art.length; i++) {
						// 					// alert('in for loop')
						// 					// AR.logger.info('>>>>>>>' + marker['marker']['art'][i]['photo_url'] + '<<<<<<<')
						// 					artListTemp.html += "<img style='width: 800px; height: 800px;' src=" + marker_res.marker.art[i]['photo_url'] + ">"
						// 				}
						// 				// } else {
						// 				// AR.logger.info(JSON.stringify(marker.marker.art) + 'in else')
						// 				// }
						// 			}
						// 		});
						// 		trackable.drawables.addCamDrawable(artListTemp)
						// })
						// pageOne.drawables.removeCamDrawable(artList)
					}
				})
			}
		})


		// var pageOne = new AR.ImageTrackable(this.tracker, "*", {
		// 	drawables: {
		// 		cam: [artList]
		// 	},
		// 	onImageRecognized: (targetName) => {
		// 		// alert(targetName + '<< target name')
		// 		// AR.logger.info('>> target name >>>' + targetName + '<< target name <<<')
		// 		last_target = targetName;
		// 		let context = pageOne.drawables.cam[0];
		// 		$.get('http://52.15.90.163:3002/api/marker/markers/' + targetName, function (marker) {
		// 			let markerLat = 33.97550942699161;
		// 			let markerLong = -118.3908170724058;

		// 			// AR.logger.info('>> marker id >>>' + marker.marker._id + '<< marker id <<<')
		// 			// AR.logger.info('===== drawables before' + JSON.stringify(pageOne.drawables.cam) + '======');
		// 			// AR.logger.info('===== marker' + JSON.stringify(marker) + '======');
		// 			// pageOne.drawables.removeCamDrawable(artList)

		// 			// pageOne.removeImageTargetCamDrawables(last_target, 0)
		// 			// pageOne.stopExtendedTracking()
		// 			// AR.logger.info('===== drawables after' + JSON.stringify(pageOne.drawables.cam) + '======');
		// 			// 	uri: "assets/art_list.html"
		// 			var artListTwo = new AR.HtmlDrawable({
		// 				html: "<div>...</div>"

		// 			}, 1, {
		// 					viewportWidth: 1000,
		// 					viewportHeight: 800,
		// 					clickThroughEnabled: true,
		// 					allowDocumentLocationChanges: false,
		// 					onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
		// 						// AR.context.openInBrowser(uri);
		// 					},
		// 					onDragBegan: function (evt) {
		// 						AR.logger.debug(evt);
		// 						// this.translate.y += evt;
		// 					},
		// 					onLoaded: function () {
		// 						if (!once) {
		// 							// once = true;
		// 							// alert('reloaded')
		// 							// artListTwo.html += "<div style='height:50px; width: 50px; background-color: lightblue; border: 2px solid purple;'>Test add div</div>"
		// 							// alert(JSON.strigify(marker))
		// 							// AR.logger.info(JSON.stringify(marker))
		// 							artListTwo.html = '';
		// 							// AR.logger.info(JSON.stringify(marker.marker.art) + 'in if')
		// 							for (var i = 0; i < marker.marker.art.length; i++) {
		// 								// alert('in for loop')
		// 								// AR.logger.info('>>>>>>>' + marker['marker']['art'][i]['photo_url'] + '<<<<<<<')
		// 								artListTwo.html += "<img style='width: 800px; height: 800px;' src=" + marker['marker']['art'][i]['photo_url'] + ">"
		// 							}
		// 						} else {
		// 							// AR.logger.info(JSON.stringify(marker.marker.art) + 'in else')
		// 						}
		// 					}
		// 				});

		// 			// pageOne.drawables.addCamDrawable(artListTwo)

		// 			pageOne.drawables.cam = new Array(artListTwo)




		// 			// AR.logger.info('marker = ' + JSON.stringify(marker))
		// 			navigator.geolocation.getCurrentPosition(
		// 				function (position) {
		// 					AR.logger.info('lat =' + position.coords.latitude)
		// 					AR.logger.info('long =' + position.coords.longitude)
		// 					let latitudeDif = Math.abs(position.coords.latitude - markerLat);
		// 					let longitudeDif = Math.abs(position.coords.longitude - markerLong);
		// 					let distanceBetween = Math.sqrt(Math.pow(latitudeDif, 2) + Math.pow(longitudeDif, 2))
		// 					AR.logger.info('Distance ' + distanceBetween);
		// 					if (distanceBetween > 0.0025) {
		// 						context.enabled = false;
		// 						// alert('disabled')
		// 					} else {
		// 						context.enabled = true;
		// 						// alert('enabled')
		// 					}
		// 				})
		// 		})
		// 		// alert('target name = ' + targetName)
		// 	}
		// });

		// this.cloudRecognitionService.recognize(function (recognized, responseData) {
		// 	if (recognized) {
		// 		// A target image was found in the processed camera frame.
		// 		// The name of the recognized target can be retrieved from the responseData object.
		// 		alert('recognized target image: ' + responseData.targetInfo.name);

		// 	}
		// 	else {
		// 		// No target image could be found in the processed camera frame.
		// 		alert('no target image found')
		// 	}
		// });



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

