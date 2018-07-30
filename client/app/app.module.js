import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import ngMaterial from 'angular-material';
import ngCache from 'angular-cache';
import appComponent from './app.component';
import ComponentsModule from './components/components';
import Swapi from './services/swapi/swapi';
import 'angular-material/angular-material.css';
import 'normalize.css';

angular.module('app', [
  'ui.router',
  ComponentsModule.name,
  ngCache,
  ngMaterial,
  Swapi
])
.config(($urlRouterProvider, $locationProvider) => {
  'ngInject';
  $urlRouterProvider.otherwise("/");
})
.config(($mdThemingProvider) => {
	'ngInject';
  $mdThemingProvider.theme('default').primaryPalette('cyan').accentPalette('amber');
  // Enable browser color
  $mdThemingProvider.enableBrowserColor({
    palette: 'primary'
  });
})
.run(($transitions, $rootScope) => {
  "ngInject";
  $transitions.onStart({}, () => {
    $rootScope.isWaiting = true;
  });

  $transitions.onFinish({}, () => {
    $rootScope.isWaiting = false;
  });
})
.component('app', appComponent);