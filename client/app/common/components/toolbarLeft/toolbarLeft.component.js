/**
 * Created by y.masyan on 11.01.2017.
 */
import template from './toolbarLeft.html';

angular.module('app').directive('toolbarLeftComponent', function () {
    return {
      controller: 'toolbarLeftCtrl',
      restrict: 'E',
      scope: true,
      template
    };
  }
);
