import angular from 'angular';
import sidenavComponent from './sidenav.component';

const sidenavModule = angular.module('sidenav', [])
  .component('sidenav', sidenavComponent);
export default sidenavModule;