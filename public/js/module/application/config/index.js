qh.getModule('application').config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('', {templateUrl: 'js/module/application/partial/dashboard.html'});
	$routeProvider.when('/', {templateUrl: 'js/module/application/partial/dashboard.html'});
	$routeProvider.when('/subject/:subjectId/', {templateUrl: 'js/module/application/partial/subject.html'});
	$routeProvider.when('/list/', {templateUrl: 'js/module/application/partial/subject-list.html'});
	$routeProvider.otherwise({templateUrl: 'js/module/application/partial/404.html'});
}]);
