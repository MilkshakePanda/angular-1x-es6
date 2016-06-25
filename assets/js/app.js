import angular from 'angular'
import uirouter from 'angular-ui-router'

import { routing } from  './config'
import { MainController } from './controllers/testController'
import {TestService} from './services/TestService'

angular.module('app', [uirouter])
    .config(routing)
    .controller('MainController', MainController)
    .service('TestService', TestService)
    
