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

		var pageOne = new AR.ImageTrackable(this.tracker, "*", {
			onImageRecognized: 
			(targetName) => {
				let context = this
				alert('target name = ' + targetName)
				navigator.geolocation.getCurrentPosition(
					function(position) {
						AR.logger.info('lat =' + position.coords.latitude)
						AR.logger.info('long =' + position.coords.longitude)
						AR.logger.info('drawables = ' + context)
					})
			},
			drawables: {
				cam: [artList]
			}
		});

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

	setMarkerLocation: function() {

	}
};

World.init();

