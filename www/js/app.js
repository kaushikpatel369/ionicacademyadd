(function(){

	var app = angular.module('starter', ['ngRoute','ionic','starter.services', 'angular-filepicker']);
	
	app.config(function($stateProvider, $urlRouterProvider, $locationProvider, filepickerProvider){			 										

		filepickerProvider.setKey('AT4gHSGo6QFKiBE771LDBz');
		$stateProvider.state('login', {
			url: '/login',
			cache:false,
			templateUrl: 'templates/login.html',
			controller: 'AppCtrl'
		});
		$stateProvider.state('show', {
			url: '/show',
			templateUrl: 'templates/show.html',
			params:{
				obj:null
			},
			controller: 'showCtrl'
		});

		$urlRouterProvider.otherwise('/login');
	});

	
	app.controller('AppCtrl', function($scope, $ionicPopup,$filter, $http,$state,$stateParams, FilesService, $ionicLoading){
		var notes={};
		$scope.entry=function(data){
			if(!data.heading || !data.desc || !data.category){
					var alertPopup = $ionicPopup.alert({
							title: 'Give all details',
							template: 'Please Click OK'
						});
			}
			else{
				console.log(data);
				notes.category=data.category;
				notes.heading=data.heading;
				notes.desc=data.desc;
				console.log(notes);
				$http.post('/ionicadd',notes).then(function(response){
							$scope.data = "";
							console.log(response);
							//A Alert Popup
							var alertPopup = $ionicPopup.alert({
								title: 'Item Added Successfully',
								template: 'Please Click OK'
							});
							alertPopup.then(function(res) {
								console.log('Thank you for not eating my delicious ice cream cone');
								$state.go('show',{obj:notes});
							});
				});
			}
				
		}
		 $scope.files = FilesService.all();
				$scope.onUpload = onUpload;
				$scope.localUpload = localUpload;

				function localUpload(value){
					if (!value){
						return;
					}
					// TODO - create directive
					$ionicLoading.show();
					filepicker.store(
						value,
						onUpload
					);
				}
				function onUpload(data){
					console.log(data);
					notes.img=data.url;
					console.log(notes.img);
					FilesService.add(data);
					$ionicLoading.hide();
					//$state.go('tab.chats');
				}
	});
	
	app.controller('showCtrl', function($scope, $ionicPopup,$filter, $http,$state,$stateParams, FilesService, $ionicLoading){
	var find={};
	console.log($state.params.obj);
	find=$state.params.obj;
		        $http.post('/ionicfind',$state.params.obj).then(function(response){
							console.log(response.data);
							$scope.items=response.data;
				});
	});
	
	
	app.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			if(window.cordova && window.cordova.plugins.Keyboard) {
				// Hide the accessory bar by default (remove this to show the accessory bar above the
				keyboard
				// for form inputs)
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				// Don't remove this line unless you know what you are doing. It stops the viewport
				// from snapping when text inputs are focused. Ionic handles this internally for
				// a much nicer keyboard experience.
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	});
}());
