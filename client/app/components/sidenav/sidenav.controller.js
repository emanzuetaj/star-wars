class sidenavController {
    constructor(SwapiService, $mdSidenav, $mdMedia, $scope, $state, $mdToast, $rootScope) {
      'ngInject';
      this.Swapi = SwapiService;
      this._$scope = $scope;
      this._$state = $state;
      this.characters = [];
      this.pages = 1;
      this.next = null;
      this.prev = null;
      this.selectedCharacter = null;
      this.currentPage = 1;
      this.navigating = false;
      this.pagesData = new Array();
      this._$mdToast = $mdToast;
      this._$mdSidenav = $mdSidenav;
      this._$mdMedia = $mdMedia;
      this._$rootScope = $rootScope;
    }
    $onInit() {
      this.getCharacters('https://swapi.co/api/people/?page=1');
      this._$scope.$on('characterFetchError',()=>{
        this.showToast('error', 'An error occurred retrieving data for this character.');
        this.selectFirstCharacterFound();
        this.navigating = true;
      });
    }
    showToast(toastClass, message) {
      this._$mdToast.show({
        hideDelay   : 3000,
        position    : 'top right',
        template : "<md-toast class='md-toast " + toastClass + "'>" + message + "</md-toast>"
      });
    }
    getCharacters(apiUrl) {
      this.Swapi.callApi(apiUrl).then(
        (response) => {
          this.characters = response.results;
          for(let i = 0; i < this.characters.length;i++){
            this.characters[i].id = this.getCharacterId(this.characters[i].url);
          }
          this.numberOfPages = Math.ceil(response.count / 10);
          this.next = response.next;
          this.prev = response.previous;

          this.getAllPages();
          // make sure to open automatically open menu for small screens
          if(!this._$mdMedia('gt-sm') && !this._$state.params.characterId) {
            this._$mdSidenav('left').toggle();
          }
          this._$rootScope.$broadcast('callAttentionToSidenav');
        },
        (err) => {
          this.showToast('error', 'An error occurred retrieving data for characters.');
          this.selectFirstCharacterFound();
          this.navigating = true;
        }
      );
    }
    getAllPages() {
      this.pagesData = [];
      var pageApiUrl = 'https://swapi.co/api/people/?page=';
      for(let i = 0;i < this.numberOfPages;i++){
        this.Swapi.callApi(pageApiUrl + (i + 1)).then(
          (response) => {
            response.pageNumber = i + 1;
            this.pagesData.push(response);
            this.checkDoneLoadingPages();
          },
          (err) => {
            this.showToast('error', 'An error occurred retrieving data for characters');
          }
        );
      }
    }
    checkDoneLoadingPages() {
      if(this.pagesData.length === this.numberOfPages) {
        // this character might not be on page 1...
        if(!this.navigating && this._$state.params.characterId) {
          this.currentPage = this.getCharacterPageNumber(this._$state.params.characterId);
          if(this.currentPage === 0){
            this.showToast('warning', 'Character not found in any page...');
            this.selectFirstCharacterFound();
          } else {
            this.selectedCharacter = this._$state.params.characterId;
            this.getCharacters('https://swapi.co/api/people/?page=' + this.currentPage);
          }
        }
        this.navigating = true;
      }
    }
    selectFirstCharacterFound() {
      // selecting very first character from pagesData array
      this.currentPage = this.pagesData[0].pageNumber;
      this.selectCharacter(this.pagesData[0].results[0].url);
      this.getCharacters('https://swapi.co/api/people/?page=' + this.currentPage);
    }
    getCharacterPageNumber(characterId){
      var characterUrl = 'https://swapi.co/api/people/' + characterId + '/';
      var pageNumber = 0;
      // loop through all pages to find character
      for(let i = 0; i < this.pagesData.length;i++) {
        // loop through results in data
        for(let j = 0; j < this.pagesData[i].results.length;j++){
          if(this.pagesData[i].results[j].url === characterUrl) {
            pageNumber = this.pagesData[i].pageNumber;
            break;
          }
        }
        // break after character is found
        if(pageNumber !== 0) {
          break;
        }
      }
      return pageNumber;
    }
    getNextPageOfCharacters(){
      this.navigating = true;
      this.getCharacters(this.next);
      this.currentPage++;
    }
    getPrevPageOfCharacters(){
      this.navigating = true;
      this.getCharacters(this.prev);
      this.currentPage--;
    }
    selectCharacter (characterUrl) {
      var id = this.getCharacterId(characterUrl);
      this.selectedCharacter = id;
      this._$state.go('character', {characterId: id});
      if(!this._$mdMedia('gt-sm')) {
        this._$mdSidenav('left').toggle();
      }
    }
    getCharacterId (url) {
      // remove last slash to make it easier to get id
      url = url.substr(0, url.lastIndexOf('/'));
      return (url.substr(url.lastIndexOf('/') + 1, url.length + 1));
    }
  }

  export default sidenavController;