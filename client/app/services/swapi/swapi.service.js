export default class SwapiService {
    constructor($q, $http, CacheFactory) {
      'ngInject';
      this._$http = $http;
      this._$q = $q;
      CacheFactory.createCache('starWarsCache', {
        deleteOnExpire: 'aggressive',
        recycleFreq: 60000
      });
      this.starWarsCache = CacheFactory.get('starWarsCache');
    }
    // create reusable method, all URLs will be cached anyways
    callApi(apiUrl) {
      const defer = this._$q.defer();
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