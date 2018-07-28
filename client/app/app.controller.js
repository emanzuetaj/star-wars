class AppController {
  constructor($mdSidenav, $http) {
    'ngInject';

    this.theme = 'default';
    this._$mdSidenav = $mdSidenav;
    this._$http = $http;
  }
  toggleSidenav() {
    this._$mdSidenav('left').toggle();
  };
  isWaiting(){
    return this._$http.pendingRequests.length > 0;
  }
}
export default AppController;
 