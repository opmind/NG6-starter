/**
 * Created by y.masyan on 11.01.2017.
 */
import template from './cramp.html';

angular.module('app').directive('crampComponent', function () {
    return {
      controller: 'crampCtrl',
      restrict: 'E',
      scope: true,
      template
    };
  }
);