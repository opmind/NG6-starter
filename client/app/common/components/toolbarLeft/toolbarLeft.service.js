/**
 * Created by y.masyan on 01.12.2016.
 */
angular.module('app')

  .factory('toolbarLeftService', ['$rootScope', 'dataService', '$filter', '$http', 'appService', function ($rootScope, dataService, $filter, $http, appService) {
    var toolbarLeftService = {};

    var leftNavState = false;

    toolbarLeftService.toggleLeft = function (turn) {
      if (turn == "open") {
        leftNavState = true;
        return;
      }
      turn ? leftNavState = !leftNavState : false;
      return leftNavState;
    };
    toolbarLeftService.itemFields=[];
    toolbarLeftService.changeURL = function (item) {
      // console.log('typeof()==""');
      // console.log(item);
      // console.log($location);
      // console.log($routeParams);
      // console.log(typeof(item.objectid));
      if (typeof(item.objectid)=="number"){
        console.log('typeof(item.objectid)=="string"');
        $location.path('/rubric/object'+item.objectid)
      }
      if (typeof(item.deviceid)=="number"){
        $location.path('/device/channel'+item.deviceid)
      }
      if (typeof(item.rubricid)=="number"){
        console.log('typeof(item.rubricid)=="number"');
      }
    };


    return toolbarLeftService;
  }]);
