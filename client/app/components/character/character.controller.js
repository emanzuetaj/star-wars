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
        this.films, this.starships, this.vehicles, this.species = new Array();
        this.doneLoading = false;
      }
    }
    getCharacter(id) {
      this.Swapi.callApi('https://swapi.co/api/people/' + id + '/').then(
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
      for(let i = 0; i < this.character.films.length; i++) {
        this.Swapi.callApi(this.character.films[i]).then(
          (response) => {
            this.films.push(response);
            this.isEverythingDoneLoading();
          },
          (err) => {
            this._$rootScope.$broadcast('characterFetchError');
          }
        );
      }
    }
    isEverythingDoneLoading() {
      if(this.planet && this.films.length === this.character.films.length && this.starships.length === this.character.starships.length && this.species.length === this.character.species.length && this.vehicles.length === this.character.vehicles.length) {
        this.doneLoading = true;
      }
    }
    getStarShips() {
      this.starships = [];
      for(let i = 0; i < this.character.starships.length; i++) {
        this.Swapi.callApi(this.character.starships[i]).then(
          (response) => {
            this.starships.push(response);
            this.isEverythingDoneLoading();
          },
          (err) => {
            this._$rootScope.$broadcast('characterFetchError');
          }
        );
      }
    }
    getVehicles() {
      this.vehicles = [];
      for(let i = 0; i < this.character.vehicles.length; i++) {
        this.Swapi.callApi(this.character.vehicles[i]).then(
          (response) => {
            this.vehicles.push(response);
            this.isEverythingDoneLoading();
          },
          (err) => {
            this._$rootScope.$broadcast('characterFetchError');
          }
        );
      }
    }
    getSpecies() {
      this.species = [];
      for(let i = 0; i < this.character.species.length; i++) {
        this.Swapi.callApi(this.character.species[i]).then(
          (response) => {
            this.species.push(response);
            this.isEverythingDoneLoading();
          },
          (err) => {
            this._$rootScope.$broadcast('characterFetchError');
          }
        );
      }
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