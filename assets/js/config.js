const routing = ($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/public/templates/home.html',
            controller: 'MainController',
            controllerAs: 'main'
        })
        .state('about', {
            url: '/about',
            templateUrl: '/public/templates/about.html',
            controller: 'MainController',
            controllerAs: 'main'
        })

}

routing.$inject = ['$stateProvider', '$urlRouterProvider']

export {routing}
