/**
 * Created by y.masyan on 01.12.2016.
 */
angular.module('app')

  .factory('rightToolbarService', ['$rootScope', '$filter', '$http', '$location', '$routeParams', function ($rootScope, $filter, $http, $location, $routeParams) {
    var rightToolbarService = {};
    rightToolbarService.itemFields=[];
    rightToolbarService.changeURL = function (item) {
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
    // rightItem: {fullname: "Разработка и тестирование", id: 123}
   /* var oldItem;
    var rightNavState;
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
    appService.rightItemColumn = function (item) {
      appService.rightItem = item;
    };*/
    return rightToolbarService;
  }]);
