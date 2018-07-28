import template from './sidenav.component.html';
import controller from './sidenav.controller.js';
import './sidenav.component.scss';

let sidenavComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: '$ctrl'
};
export default sidenavComponent;