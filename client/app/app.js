import angular from 'angular';
import ngResource from 'angular-resource';
import ngRoute from 'angular-route';
import ngSanitize from 'angular-sanitize';
// import adaptv.adaptStrap' from
// import ui.bootstrap from
import ngMaterial from 'angular-material';
// import ngMessages from
// import material.svgAssetsCache' from
import ngCookies from 'angular-cookies';
// import xeditable from 'angular-xeditable';


import uiRouter from 'angular-ui-router';
import angularMaterial from 'angular-material';

import Common from './common/js/common';
import Components from './components/components';
import AppComponent from './app.component';
// import 'normalize.css';
import './common/scss/libraries/angular-material.scss';
import './common/scss/separate-css/xeditable.css'

require('./common/js/libraries/xeditable.js');


// angular.module('myApp', [
//   uiRouter,
//   Common,
//   Components,
//   angularMaterial
// ])
//   .config(($locationProvider) => {
//     "ngInject";
//     // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
//     // #how-to-configure-your-server-to-work-with-html5mode
//     $locationProvider.html5Mode(true).hashPrefix('!');
//   })
//
//   .component('app', AppComponent);

angular.module('app', [
  ngResource,
  ngRoute,
  ngSanitize,
  ngMaterial,
  ngCookies,
  'xeditable',
  Common,
  Components
])

.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
})
  .factory('DataBaseTemplateService', function ($http, $cookies) {
    var dataService = {};
    dataService.channel = {
      channelid: '',
      deviceid: {deviceid:'deviceid'},
      categoryid: {categoryid:'categoryid',
        categoryname:''},
      channelname: "",
      channeltopic: "",
      comment: "",
      ctrability: "",
      sensitivity: "",
      valuetype: ""
    };
    dataService.device = {
      comment: "",
      deviceid: "",
      devicename:"",
      devicetopic:"",
      vendorname: ""
    };
    dataService.object = {
      "comment":"",
      "fullname":"",
      "objectid":"",
      "rubricid":{
        "rubricid": "rubricid"
      },
      "shortname":"",
      "timezone": ""
    };

    dataService.objrubric ={};


    return dataService;
  })
  .factory('deleteService', function ($http, $route) {
    var deleteService = {};
    //отправляем запрос серверу на удаление
    deleteService.deleteRequest = function (id, webServiceName, objectName) {
      $http({method: 'DELETE', url: backEndUrlPrefix + '/SEMRestDB/webresources/iss.sem.ws.rs.'+webServiceName+'/'+id})
        .then(function successCallback(response) {
          $route.reload();
          console.log('webServiceName:');
          console.log(webServiceName);
          alert("объект "+"\""+objectName+"\""+" удален");
          // webServiceName+"Service";


          // for (var i = 0; i < response.data.length; i++) {
          //   // $scope.deviceid[response.data[i].shortname] = response.data[i].deviceid;
          //   data.deviceId.push({name: response.data[i].devicename, id: response.data[i].deviceid})
          // }
          console.log(response.data);

        },function errorCallback(response) {

          alert("Не удалось сохранить изменения!");
          console.log(response);
        });

    };



    return deleteService;
  })
// objectViewService,!!!
  .factory('appService', function (rightToolbarService, deleteService, $http,DataBaseTemplateService) {
    var appService = {};
    appService.bodyclass="mmc";
    appService.bodyclass="mmc";

    appService.toggleLeft = function (turn) {
      if (turn = "toggle"){
        if (appService.bodyclass == "mmc") {appService.bodyclass = "mme"}
        else if (appService.bodyclass == "mme") {appService.bodyclass = "mmc"}
      }
    };
    // appService.update = updateService.services;
    var oldItem;
    var rightNavState;
    appService.ids=['objectid','rubricid', 'channelid','deviceid','connectid','configid','modelid','categoryid','zoneid','deviceparamid'];
    appService.webServiceId = {
      'object': 'objectid',
      'objrubric': 'rubricid',
      'channel': 'channelid',
      'device': 'deviceid',
      'deviceconnect': 'connectid',
      'typicalconfig': 'configid',
      'controllermodel': 'modelid',
      'paramcategory': 'categoryid',
      'zone': 'zoneid',
      'cfgdeviceparam': 'deviceparamid'
    };
    appService.webService={
      'objectid':'object',
      'rubricid': 'objrubric',
      'channelid': 'channel' ,
      'deviceid': 'device',
      'connectid': 'deviceconnect',
      'configid': 'typicalconfig',
      'modelid': 'controllermodel',
      'categoryid': 'paramcategory',
      'zoneid': 'zone',
      'deviceparamid': 'cfgdeviceparam'
    };
    appService.objectName={
      'objectid':'objectName',
      'rubricid': 'shortname',
      'channelid': 'channelName' ,
      'deviceid': 'devicename',
      'connectid': 'deviceconnectName',
      'configid': 'typicalidName',
      'modelid': 'modelidName',
      'categoryid': 'categoryname',
      'zoneid': 'zoneidName',
      'deviceparamid': 'deviceparamidName'
    };
    appService.objectHeader={
      'objectid':'Объект',
      'rubricid': 'Рубрикатор',
      'channelid': 'Канал' ,
      'deviceid': 'Устройство',
      'connectid': 'deviceconnect',
      'configid': 'typicalid',
      'modelid': 'Модель',
      'categoryid': 'Категория',
      'zoneid': 'Зона',
      'deviceparamid': 'deviceparamid'
    };
    appService.containId = function (key) {
      for (var i = 0; i < appService.ids.length; i++) {
        if (key == appService.ids[i]) {
          return true;
        }
      }
    };
    var forbiddenName=['children','_ad_expanded', 'parentid'];

    appService.forbiddenName = function (key) {
      for (var i = 0; i < forbiddenName.length; i++) {
        if (key == forbiddenName[i]) {
          return true;
        }
      }
    };
    appService.defineObjectIdKey = function (object) {
      for (var key in object){
        for (var i = 0; i < appService.ids.length; i++) {
          if (key == appService.ids[i] && typeof(object[key]) == 'number') {
            return key;
          }
        }
      }
    };
    appService.defineObjectWebService = function (object) {
      return appService.webService[appService.defineObjectIdKey(object)];
      // for (var key in object){
      //   // console.log(object[key]+" "+key);
      //
      //   for (var i = 0; i < appService.ids.length; i++) {
      //     if (key == appService.ids[i] && typeof(object[key]) == 'number') {
      //       return appService.webService[key];
      //     }
      //   }
      // }
    };
    appService.defineObjectName = function (object) {
      // проверь console.log 70 71!!!
      // console.log(appService.appService.objectHeader[appService.defineObjectIdKey(object)]);
      // console.log(appService.defineObjectIdKey(object));
      //

      return appService.objectHeader[appService.defineObjectIdKey(object)]
    };



    appService.toggleRight = function (turn, item) {
      if (rightNavState && item && oldItem && oldItem != item) {
        oldItem = item;
        return;
      }
      if (item) {
        oldItem = item;
      }
      turn ? rightNavState = !rightNavState : false;
      return rightNavState;
    };
    appService.alarm = function (item) {
      console.log("DELETE:" );
      console.log(item );
    };

    appService.confirmDelete = function confirmDelete(item) {
      console.log("Вы подтверждаете удаление?");
      // item[objectDataService.TreeColumnDefinition[0].sortKey];

      if (confirm("Подтвердите удаление объекта \"" + appService.deleteReady.name+"\"")) {
        deleteService.deleteRequest(appService.deleteReady.item[appService.defineObjectIdKey(appService.deleteReady.item)], appService.webService[appService.defineObjectIdKey(appService.deleteReady.item)],appService.deleteReady.name);
        console.log(appService.webService[appService.defineObjectIdKey(appService.deleteReady.item)]);
        console.log(appService.deleteReady.item[appService.defineObjectIdKey(appService.deleteReady.item)]);


        console.log("объект будет удален");

      } else {
        console.log("Удаление отменено");

      }
    };

// передаёт в правую боковую панель выбранный объект из таблицы. Для типов object и rubric передаётся исходные объекты
    appService.rightItemColumn = function (item, itemFields, webService) {
      rightToolbarService.webService = '';
      // если webService -- предполагается создание нового объекта. В rightToolbarService.rightItem идёт шаблон объекта
      rightToolbarService.itemFields=[];
      console.log("222222222222");
      console.log(webService);



      for (var i = 0; i < itemFields.length; i++) {
        rightToolbarService.itemFields.push(itemFields[i].sortKey);
      }
      // console.log(rightToolbarService.itemFields);

      //
      // console.log("item!!!");
      // console.log(item);

// ВОССТАНОВИТЬ!

      /*if (item.objectid) {
        for (var i = 0; i < objectViewService.object.length; i++) {
          if (objectViewService.object[i].objectid == item.objectid) {
            rightToolbarService.rightItem = objectViewService.object[i];
            // console.log("6666666666666666666666666");
            // console.log(rightToolbarService.rightItem);

            return
          }
        }
      }
      else if (item.rubricid){
        for (var i = 0; i < objectViewService.rubric.length; i++) {
          if (objectViewService.rubric[i].rubricid == item.rubricid) {
            rightToolbarService.rightItem = objectViewService.rubric[i];
            // rightToolbarService.rightItem.parentid = {rubricid: 852, shortname:"Все клиенты"};
            console.log('rightToolbarService.rightItem:');
            console.log(rightToolbarService.rightItem);

            return
          }
        }
      }*/
      /*else if (webService) {
        console.log("33333333333");

        rightToolbarService.rightItem = DataBaseTemplateService[webService];
        rightToolbarService.webService = webService;
        console.log(rightToolbarService.rightItem);

      }
      else rightToolbarService.rightItem = item;*/

    };
    //appService.deleteReady.item: объект для удаления
    //appService.deleteReady.name: заголовок или имя объекта
    appService.deleteReady={};

    appService.objectToDelete = function (item, name){
      if (item) {console.log("readyToEliminate");
        appService.deleteReady.item = item;
        appService.deleteReady.name = name;
      }
      console.log(item);
      console.log(name);

    };

    appService.idList = {};
// получает список  id всех типов объектов
    appService.relatedIds = function (idName) {
      appService.idList[idName] = [];
      // console.log('idName:');
      // console.log(idName);
      // console.log(appService.webService[idName]);


      $http({
        method: 'GET',
        url: backEndUrlPrefix + '/SEMRestDB/webresources/iss.sem.ws.rs.' + appService.webService[idName]+'/'
      })
        .then(function (response) {
          appService.idList[idName]=[];

          for (var i = 0; i < response.data.length; i++) {
            appService.idList[idName].push({name: response.data[i][appService.objectName[idName]], id: response.data[i][idName]})
          }
          //
          // console.log('idName!!!');
          // console.log(idName);
          //
          // console.log(appService.idList);

          // console.log(webServiceName);
          // alert("объект "+"\""+objectName+"\""+" удален")
        });

    };
    for (var i = 0; i < appService.ids.length; i++) {
      appService.relatedIds(appService.ids[i]) ;
    }





    return appService;
  })
  //leftToolbarService, !!!
  .controller('appCtrl', function ($scope, $timeout, $mdSidenav, $log, $location, $http, appService, $route, rightToolbarService) {

    $scope.user = {
      desc: 'Awesome user \ndescription!'
    };


    //Обновляет ntreobq контроллер  ngroute
    $scope.refreshApp = function () {
      console.log('$route.reload()!!!');
      $route.reload();
    };


    $scope.getBe = function () {
      console.log("getBe:");
      // $http({
      //   method: 'POST',
      //   url: 'http://localhost:8080/be/ws/stubdata',
      //   transformRequest: transformRequestAsFormPost,
      //   data: {
      //     type: "controller"
      //   },
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then(function successCallback(response) {
      //   var controllersArray = response.data;
      //   console.log("controllers:");
      //   console.log(controllersArray);
      // }, function errorCallback(response) {
      //   console.log("error:");
      //   console.log(response);
      // });
      $http.get(backEndUrlPrefix + "/SEMRestDB/webresources/iss.sem.ws.rs.object")
        .then(function(response) {
          console.log(response);

        });
      /*
       $http({
       method: 'GET',
       url: 'http://10.4.2.122:8080/SEMRestDB/webresources/iss.sem.ws.rs.object/119'
       }).then(function successCallback(response) {
       // var controllersArray = response.data;
       // console.log("controllers:");
       // console.log(controllersArray);
       console.log('response');
       console.log(response);
       }, function errorCallback(response) {
       console.log("error:");
       console.log(response);
       });
       */
    };

    $scope.insertDriveIconURL = 'assets/svg/ic_forward_black_24px.svg';

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
    $scope.$on('$routeChangeStart', function () {
      $scope.currentNavItem = $location.path();
    });

    var leftNavState = false;
    $scope.toggleLeft = function (turn) {
      if (turn == "open") {
        leftNavState = true;
        return;
      }
      turn ? leftNavState = !leftNavState : false;
      return leftNavState;
    };
    $scope.appService = appService;
    $scope.toggleRight = appService.toggleRight;
    // $scope.rightItem = {name: '123',priceRange: "456"};
    $scope.rightItemColumn = appService.rightItemColumn;

    $scope.isOpenRight = function () {
      return $mdSidenav('right').isOpen();
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function () {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
  })

  // .value("historyMaxPoints", 1000)
  // .config(function ($routeProvider, $mdThemingProvider) {
  //   var  SberGreenMap = $mdThemingProvider.extendPalette('green', {
  //     '500': '#299E30'
  //   });
  //
  //   // Register the new color palette map with the name <code>neonRed</code>
  //   $mdThemingProvider.definePalette('SberGreen', SberGreenMap);
  //
  //   // Use that theme for the primary intentions
  //   $mdThemingProvider.theme('default')
  //     .primaryPalette('SberGreen');
  //
  //   $routeProvider
  //     .when('/home', {
  //       // templateUrl: 'views/auth/auth.html',
  //       templateUrl: 'app/components/home/homeView.html',
  //       controller: 'homeCtrl'
  //     })
  //     // .when('/home', {
  //     //   templateUrl: 'app/components/treeBrowserView/treeChannelView.html',
  //     //   controller: 'treebrowserCtrl'
  //     // })
  //     .when('/home/tree/charts', {
  //       templateUrl: 'app/components/charts/chartsView.html',
  //       controller: 'chartCtrl'
  //     })
  //     .when('/rubric/object:id', {
  //       templateUrl: 'app/components/objectView/objectView.html',
  //       controller: 'objectViewCtrl'
  //     })
  //     // .when('/channel', {
  //     //   templateUrl: 'app/components/treeChannelView/treeChannelView.html',
  //     //   controller: 'treeChannelCtrl'
  //     // })
  //     .when('/deviceconnect', {
  //       templateUrl: 'app/components/treeDeviceconnectView/treeDeviceconnectView.html',
  //       controller: 'treeDeviceconnectCtrl'
  //     })
  //     .when('/device', {
  //       templateUrl: 'app/components/DeviceView/DeviceView.html',
  //       controller: 'DeviceCtrl'
  //     })
  //     .when('/device/channel:id', {
  //       templateUrl: 'app/components/channelView/channelView.html',
  //       controller: 'channelCtrl'
  //     })
  //     .otherwise({
  //       redirectTo: '/device'
  //     });
  // })
  //
  // .run(['$rootScope', '$location', 'editableOptions', function ($rootScope, $location, editableOptions){
  //   editableOptions.theme = 'bs3';
  //
  //   $rootScope.objectsKeys = function(collection){
  //     return Object.keys(collection);
  //   };
  //   $rootScope.$on( "$locationChangeStart", function(event, next, current) {
  //     if(current.split('/').pop() != 'edit' && current.split('/').pop() != 'new') $rootScope.showCreated = false;
  //     $rootScope.refererLocation = current;
  //   });
  //   $rootScope.columnSort={
  //     "name": "name",
  //     "direction":  false
  //   };
  // }]);

require('./common/components/toolbarRight/toolbarRight.component.js');
require('./common/components/toolbarRight/toolbarRight.service.js');
require('./common/components/toolbarRight/toolbarRight.controller.js');
require('./common/components/cramp/cramp.controller.js');
require('./common/components/cramp/cramp.component.js');