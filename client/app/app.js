import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMaterial from 'angular-material';

import Common from './common/js/common';
import Components from './components/components';
import AppComponent from './app.component';
// import 'normalize.css';
import './common/scss/libraries/angular-material.scss'


angular.module('app', [
    uiRouter,
    Common,
    Components,
  angularMaterial
  ])
  .config(($locationProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', AppComponent);
