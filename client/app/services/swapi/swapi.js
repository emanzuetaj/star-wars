import angular from 'angular';
import SwapiService from './swapi.service';
const SwapiModule = angular.module('Swapi', [])
  .service('SwapiService', SwapiService)
  .name;

export default SwapiModule;