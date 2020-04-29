export default class SwapiService {
    constructor($q, $http, CacheFactory, $location) {
      'ngInject';
      this._$http = $http;
      this._$q = $q;
      this._$location = $location
      CacheFactory.createCache('starWarsCache', {
        deleteOnExpire: 'aggressive',
        recycleFreq: 60000
      });
      this.starWarsCache = CacheFactory.get('starWarsCache');
    }
    // create reusable method, all URLs will be cached anyways
    callApi(apiUrl) {
      const defer = this._$q.defer();
      if (this._$location.$$protocol === 'https') {
        apiUrl = apiUrl.replace('http', 'https');
      }
      this._$http.get(apiUrl, {cache: this.starWarsCache})
        .then((response) => {
          defer.resolve(response.data);
        })
        .catch((response) => {
          defer.reject(response.data.detail);
        });
      return defer.promise;
    }
  }