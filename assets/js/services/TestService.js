class TestService {

    constructor($http) {
        this.$http = $http
    }
    
    getData (){
        return this.$http({method: 'GET', url: 'http://jsonplaceholder.typicode.com/photos'})
    }

}

TestService.$inject = ['$http']

export {TestService}
