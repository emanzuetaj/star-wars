import angular from 'angular';
import characterComponent from './character.component';

const characterModule = angular.module('character', [])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('character', {
        url: '/character/:characterId',
        component: 'character',
        params: {id: null}
      });
  })
  .component('character', characterComponent);
export default characterModule;