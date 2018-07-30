class AppController {
  constructor($mdSidenav, $http, $state, $mdMedia, $scope) {
    'ngInject';
    this._$mdSidenav = $mdSidenav;
    this._$http = $http;
    this._$mdMedia = $mdMedia;
    this._$state = $state;
    this.noCharacterSelected = true;
    this._$scope = $scope;
  }
  $onInit() {
    this._$scope.$on('noCharacterSelected',()=>{
      this.noCharacterSelected = true;
    });
    this._$scope.$on('characterSelected',()=>{
      this.noCharacterSelected = false;
    });
  }
  toggleSidenav() {
    this._$mdSidenav('left').toggle();
  };
  isWaiting(){
    return this._$http.pendingRequests.length > 0;
  }
  
}
export default AppController;
 