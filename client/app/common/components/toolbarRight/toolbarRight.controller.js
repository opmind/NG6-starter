/**
 * Created by y.masyan on 01.12.2016.
 */
angular.module('app')
  .factory('leftToolbarService', [function () {
    var leftToolbarService = {};
    return leftToolbarService;
  }])

  .controller('rightToolbarCtrl', ['$scope', '$rootScope', '$filter', '$http', 'appService', 'leftToolbarService', 'rightToolbarService', '$route', function ($scope, $rootScope, $filter, $http, appService, leftToolbarService, rightToolbarService, $route) {

    $scope.console = function () {
      console.log(rightToolbarService.rightItem)

    };
    $scope.toggleLeft = leftToolbarService.toggleLeft;
    $scope.rightToolbarService = rightToolbarService;
    $scope.rightToolbarService.changeURL = rightToolbarService.changeURL;
    $scope.setLeftToolbarService = function () {
      leftToolbarService.rightItem = rightToolbarService.rightItem;
    };
    // $scope.user = {
    //   id: 1,
    //   name: 'awesome user',
    //   status: 2,
    //   group: 4,
    //   groupName: 'admin'
    // };
    //
    // $scope.statuses = [
    //   {value: 1, text: 'status1'},
    //   {value: 2, text: 'status2'},
    //   {value: 3, text: 'status3'},
    //   {value: 4, text: 'status4'}
    // ];

    /*    $scope.$watch('appService.rightItem', function() {
     console.log($scope.editableForm.name);

     editableForm.$cancel();
     })*/
    // $scope.groups = [];
    // $scope.loadGroups = function () {
    //   return $scope.groups.length ? null : $http.get('/groups').success(function (data) {
    //     $scope.groups = data;
    //   });
    // };
    $scope.rubricId = [];
    $scope.getRubricId = function () {
      $http({method: 'GET', url: backEndUrlPrefix + '/SEMRestDB/webresources/iss.sem.ws.rs.objrubric'})
        .then(function (response) {
          for (var i = 0; i < response.data.length; i++) {
            // $scope.rubricId[response.data[i].shortname] = response.data[i].rubricid;
            $scope.rubricId.push({name: response.data[i].shortname, id: response.data[i].rubricid})
          }
        })

    };
    //rightToolbarService.rightItem
    $scope.getObject = function (item) {
      console.log('(appService.defineObjectIdKey(item)):');
      console.log(appService.defineObjectIdKey(item));
      appService.defineObjectIdKey(item);
      // if (id) {
      //   $http({method: 'GET', url: backEndUrlPrefix + '/SEMRestDB/webresources/iss.sem.ws.rs.object/' + id})
      //     .then(function (response) {
      //       $scope.response = response.data;
      //       delete $scope.response.rubricid.parentid;
      //       for (i in $scope.response.rubricid) {
      //         if (i != 'rubricid') {
      //           delete $scope.response.rubricid[i];
      //         }
      //       }
      //       console.log(response.data);
      //       console.log($scope.response);
      //     });
      // }
    };

    $scope.getObjectById = function (id) {
      if (id) {
        $http({method: 'GET', url: backEndUrlPrefix + '/SEMRestDB/webresources/iss.sem.ws.rs.object/' + id})
          .then(function (response) {
            $scope.response = response.data;
            delete $scope.response.rubricid.parentid;
            for (i in $scope.response.rubricid) {
              if (i != 'rubricid') {
                delete $scope.response.rubricid[i];
              }
            }
            console.log(response.data);
            console.log($scope.response);
          });
      }
    };
    $scope.getRubricById = function (id) {
      if (id) {
        $http({method: 'GET', url: backEndUrlPrefix + '/SEMRestDB/webresources/iss.sem.ws.rs.objrubric/' + id})
          .then(function (response) {
            $scope.response = response.data;
            console.log(response.data);
          })
      }
    };
    $scope.saveObject = function () {
      console.log('rightToolbarService.webService:');
      console.log(rightToolbarService.webService);

      // console.log($scope.rightToolbarService.rightItem);
      var messageObject = $scope.rightToolbarService.rightItem;
      // delete messageObject.$$hashKey;
      // console.log(messageObject);
      // console.log(appService.webService[appService.defineObjectWebService(messageObject)]);
      //
      console.log('$scope.rightToolbarService.rightItem:');
      console.log($scope.rightToolbarService.rightItem);
      // console.log("editableForm");
      // console.log($scope.editableForm);


      // rightToolbarService.rightItem.rubricid = {rubricid: '852'};
      // console.log(rightToolbarService.rightItem);
      if (rightToolbarService.webService) {
        $http({
          method: 'POST',
          url: backEndUrlPrefix + '/SEMRestDB/webresources/iss.sem.ws.rs.' + rightToolbarService.webService,
          data: $scope.rightToolbarService.rightItem
        })
          .then(function successCallback(response) {
            $route.reload();
            appService.relatedIds(appService.webServiceId[rightToolbarService.webService]);

            // appService.update[rightToolbarService.webService]();

            console.log($scope.rightToolbarService.rightItem);
            console.log('$route.reload()');

          }, function errorCallback(response) {

            alert("Не удалось сохранить изменения!");
            console.log(response);


          });

      }
      else {
        $http({
          method: 'PUT',
          url: backEndUrlPrefix + '/SEMRestDB/webresources/iss.sem.ws.rs.' + appService.defineObjectWebService(messageObject) + '/' + $scope.rightToolbarService.rightItem[appService.defineObjectIdKey(messageObject)],
          data: $scope.rightToolbarService.rightItem
        })
          .then(function successCallback(response) {
            $route.reload();

            // for (var obj in $scope.rightToolbarService.rightItem) {
            //   console.log(obj);
            //
            //   for (var f in forbiddenObj) {
            //     if (obj != 'rubricid' && obj != 'controllerCollection' && obj != 'objectparamCollection') {
            //       appService.rightItem[obj] = $scope.response[obj];
            //     }
            //   }
            //
            // }
            console.log($scope.rightToolbarService.rightItem);
            console.log('$route.reload();');


          }, function errorCallback(response) {
            // for (var obj in $scope.rightToolbarService.rightItem) {
            //   console.log(obj);
            //
            //   for (var f in forbiddenObj) {
            //     if (obj != 'rubricid' && obj != 'controllerCollection' && obj != 'objectparamCollection') {
            //       appService.rightItem[obj] = $scope.response[obj];
            //     }
            //   }
            //
            // }
            alert("Не удалось сохранить изменения!");
            console.log(response);


          })
      }
      ;
      /*else if ($scope.response.rubricid) {
       $http({
       method: 'PUT',
       url: backEndUrlPrefix + '/SEMRestDB/webresources/iss.sem.ws.rs.objrubric/' + $scope.response.rubricid,
       data: $scope.response
       })
       .then(function (response) {
       for (var obj in $scope.response) {
       console.log(obj);

       for (var f in forbiddenObj) {
       if (obj != 'parentid') {
       appService.rightItem[obj] = $scope.response[obj];
       }
       }

       }

       console.log(response);
       });
       }*/
      /*
       $http({method: 'PUT', url: backEndUrlPrefix + '/SEMRestDB/webresources/iss.sem.ws.rs.object/'+$scope.response.objectid, data: $scope.response})
       .then(function (response) {
       console.log($scope.response);

       // dataService.response = response.data;
       console.log(response.data);
       });
       */

      // $scope.user already updated!
      // return $http.post('/saveUser', $scope.user).error(function(err) {
      //   if(err.field && err.msg) {
      //     // err like {field: "name", msg: "Server-side error for this username!"}
      //     $scope.editableForm.$setError(err.field, err.msg);
      //   } else {
      //     // unknown error
      //     $scope.editableForm.$setError('name', 'Unknown error!');
      //   }
      // });
    };


    $scope.showGroup = function () {
      if ($scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: $scope.user.group});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return $scope.user.groupName;
      }
    };

    $scope.checkName = function (data) {
      if (data !== 'awesome' && data !== 'error') {
        return "Username should be `awesome` or `error`";
      }
    };


    var forbiddenObj = ['rubricid', 'objectid', 'controllerCollection', 'objectparamCollection'];

    $scope.user = {
      status: 2
    };

    $scope.statuses = [];
    for (var i = 0; i < 50; i++) {
      $scope.statuses.push({value: i, text: i})
    }

    $scope.showStatus = function () {
      var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
      return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
    };


  }]);

