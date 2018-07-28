class AppController {
  constructor($mdSidenav, $http, $state, $mdMedia) {
    'ngInject';

    this.theme = 'default';
    this._$mdSidenav = $mdSidenav;
    this._$http = $http;
    this._$mdMedia = $mdMedia;
    this._$state = $state;
  }
  toggleSidenav() {
    this._$mdSidenav('left').toggle();
  };
  isWaiting(){
    return this._$http.pendingRequests.length > 0;
  }
  
}
export default AppController;
 