qh.component('application', function(ngm) {
	ngm.controller("application.controller.list", ["$scope", "subject.factory.list", function($scope, list) {
		$scope.listParams = {};
		$scope.$on('$routeChangeSuccess', function (scope, current, previous) {
			$scope.listParams = $.extend({limit: 100}, list.validateParams(current.params));
		});
	}]);
});
