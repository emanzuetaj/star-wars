class characterController {
    constructor($stateParams, SwapiService, $rootScope, $mdDialog, $filter) {
      'ngInject';
      this._$stateParams = $stateParams;
      this.Swapi = SwapiService;
      this._$rootScope = $rootScope;
      this._$mdDialog = $mdDialog;
      this._$filter = $filter;
    }
    $onInit() {
      if(this._$stateParams.characterId) {
        this._$rootScope.$broadcast('characterSelected');
        this.getCharacter(this._$stateParams.characterId);
        this.character, this.planet = {};
        this.films, this.starships, this.vehicles, this.species, this.speciesNames = new Array();
        this.doneLoading = false;
      }
    }
    getCharacter(id) {
      this.Swapi.callApi('http://swapi.dev/api/people/' + id + '/').then(
        (response) => {
          this.character = response;
          this.getFilms();
          this.getSpecies();
          this.getStarShips();
          this.getVehicles();
          this.getPlanet();
        },
        (err) => {
          this._$rootScope.$broadcast('characterFetchError');
        }
      );
    }
    getFilms() {
      this.films = [];
      var promises = [];
      for(let i = 0; i < this.character.films.length; i++) {
        promises.push(this.Swapi.callApi(this.character.films[i]));
      }
      Promise.all(promises).then(response => {
        this.films = response;
        this.isEverythingDoneLoading();
      }, err=> {
        this._$rootScope.$broadcast('characterFetchError');
      });
    }
    isEverythingDoneLoading() {
      if(this.planet && this.films.length === this.character.films.length && this.starships.length === this.character.starships.length && this.species.length === this.character.species.length && this.vehicles.length === this.character.vehicles.length) {
        this.doneLoading = true;
      }
    }
    getStarShips() {
      this.starships = [];
      var promises = [];
      for(let i = 0; i < this.character.starships.length; i++) {
        promises.push(this.Swapi.callApi(this.character.starships[i]));
      }
      Promise.all(promises).then(response => {
        this.starships = response;
        this.isEverythingDoneLoading();
      }, err=> {
        this._$rootScope.$broadcast('characterFetchError');
      });
    }
    getVehicles() {
      this.vehicles = [];
      var promises = [];
      for(let i = 0; i < this.character.vehicles.length; i++) {
        promises.push(this.Swapi.callApi(this.character.vehicles[i]));
      }
      Promise.all(promises).then(response => {
        this.vehicles = response;
        this.isEverythingDoneLoading();
      }, err=> {
        this._$rootScope.$broadcast('characterFetchError');
      });
    }
    getSpecies() {
      this.species = [];
      this.speciesNames = [];
      var promises = [];
      for(let i = 0; i < this.character.species.length; i++) {
        promises.push(this.Swapi.callApi(this.character.species[i]));
      }
      Promise.all(promises).then(response => {
        this.species = response;
        for (let i = 0; i < this.species.length;i++) {
          this.speciesNames.push(this.species[i].name);
        }
        this.isEverythingDoneLoading();
      }, err=> {
        this._$rootScope.$broadcast('characterFetchError');
      });
    }
    getPlanet() {
      this.Swapi.callApi(this.character.homeworld).then(
        (response) => {
          this.planet = response;
          this.isEverythingDoneLoading();
        },
        (err) => {
          this._$rootScope.$broadcast('characterFetchError');
        }
      );
    }
    showFilmInfo(film) {
      this._$mdDialog.show(
        this._$mdDialog.alert()
          .parent(angular.element(document.querySelector('#app')))
          .clickOutsideToClose(true)
          .title(film.title + ' (' + this._$filter('date')(film.release_date, 'yyyy') + ')')
          .textContent(film.opening_crawl)
          .ariaLabel('Film Info ' + film.title)
          .ok('Now I\'ll go watch this film!')
      );
    }
  }

  export default characterController;