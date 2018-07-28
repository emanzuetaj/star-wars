import angular from 'angular';
    import SidenavModule from './sidenav/sidenav.module';
    import CharacterModule from './character/character.module';

const ComponentsModule = angular.module('app.components',[
     SidenavModule.name, 
     CharacterModule.name 
]);

export default ComponentsModule;