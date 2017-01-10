import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMaterial from 'angular-material';

import Common from './common/js/common';
import Components from './components/components';
import AppComponent from './app.component';
// import 'normalize.css';
import './common/scss/libraries/angular-material.scss'

// 'use strict';
// <script src="assets/3rdparty/angular-1.5.8/angular.js"></script>
//   <script src="assets/3rdparty/angular-1.5.8/angular-resource.js"></script>
//   <script src="assets/3rdparty/angular-1.5.8/angular-route.js"></script>
//   <script src="assets/3rdparty/angular-1.5.8/angular-sanitize.js"></script>
//   <script src="assets/3rdparty/angular-1.5.8/angular-cookies.js"></script>

angular.module('myApp', [
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'adaptv.adaptStrap',
  'ui.bootstrap',
  'ngMaterial',
  'ngMessages',
  'material.svgAssetsCache',
  'ngCookies',
  'xeditable'
])
  .value("historyMaxPoints", 1000)
  .config(function ($routeProvider, $mdThemingProvider) {
    var  SberGreenMap = $mdThemingProvider.extendPalette('green', {
      '500': '#299E30'
    });

    // Register the new color palette map with the name <code>neonRed</code>
    $mdThemingProvider.definePalette('SberGreen', SberGreenMap);

    // Use that theme for the primary intentions
    $mdThemingProvider.theme('default')
      .primaryPalette('SberGreen');

    $routeProvider
      .when('/home', {
        // templateUrl: 'views/auth/auth.html',
        templateUrl: 'app/components/home/homeView.html',
        controller: 'homeCtrl'
      })
      // .when('/home', {
      //   templateUrl: 'app/components/treeBrowserView/treeChannelView.html',
      //   controller: 'treebrowserCtrl'
      // })
      .when('/home/tree/charts', {
        templateUrl: 'app/components/charts/chartsView.html',
        controller: 'chartCtrl'
      })
      .when('/rubric/object:id', {
        templateUrl: 'app/components/objectView/objectView.html',
        controller: 'objectViewCtrl'
      })
      // .when('/channel', {
      //   templateUrl: 'app/components/treeChannelView/treeChannelView.html',
      //   controller: 'treeChannelCtrl'
      // })
      .when('/deviceconnect', {
        templateUrl: 'app/components/treeDeviceconnectView/treeDeviceconnectView.html',
        controller: 'treeDeviceconnectCtrl'
      })
      .when('/device', {
        templateUrl: 'app/components/DeviceView/DeviceView.html',
        controller: 'DeviceCtrl'
      })
      .when('/device/channel:id', {
        templateUrl: 'app/components/channelView/channelView.html',
        controller: 'channelCtrl'
      })
      .otherwise({
        redirectTo: '/device'
      });
  })

  .run(['$rootScope', '$location', 'editableOptions', function ($rootScope, $location, editableOptions){
    editableOptions.theme = 'bs3';

    $rootScope.objectsKeys = function(collection){
      return Object.keys(collection);
    };
    $rootScope.$on( "$locationChangeStart", function(event, next, current) {
      if(current.split('/').pop() != 'edit' && current.split('/').pop() != 'new') $rootScope.showCreated = false;
      $rootScope.refererLocation = current;
    });
    $rootScope.columnSort={
      "name": "name",
      "direction":  false
    };
  }]);
//
// angular.module('app', [
//     uiRouter,
//     Common,
//     Components,
//   angularMaterial
//   ])
//   .config(($locationProvider) => {
//     "ngInject";
//     // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
//     // #how-to-configure-your-server-to-work-with-html5mode
//     $locationProvider.html5Mode(true).hashPrefix('!');
//   })
//
//   .component('app', AppComponent);
