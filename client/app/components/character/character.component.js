import template from './character.component.html';
import controller from './character.controller.js';
import './character.component.scss';

let characterComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: '$ctrl'
};
export default characterComponent;