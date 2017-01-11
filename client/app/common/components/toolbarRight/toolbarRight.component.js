/**
 * Created by y.masyan on 11.01.2017.
 */
import template from './toolbarRight.html';

angular.module('app').directive('rightToolbarContent', function () {
    return {
      controller: 'rightToolbarCtrl',
      restrict: 'E',
      scope: true,
      template
    };
  }
);