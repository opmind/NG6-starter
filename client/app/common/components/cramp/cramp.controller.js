/**
 * Created by y.masyan on 01.12.2016.
 */
angular.module('app')
  .controller('crampCtrl', function ($scope, $location) {
    $scope.cramps = ['home','asd','asdasd'];

    $scope.$on('$routeChangeStart', function () {
      $scope.cramps = [];
      var cramps = $location.$$path.split('/');
      for (var i in cramps) {
        var location = cramps[i];
        $scope.cramps[location] = "#" + $location.$$path.split(location)[0] + location;
      }
    });
  });