qh.component('application', function(ngm, qhm) {
	ngm.directive('dashboardPanel', function() {
		return {
			restrict: 'A',
			scope: true,
			templateUrl: qhm.getPath()+"/partial/dashboard-panel.html",
			controller: ["$scope", "$attrs", "$element", "subject.factory.list", function($scope, $attrs, $element, list) {
				var watchParams = [];
				var params = list.validateParams({});
				$.each(params, function(name) {
					watchParams[name] = "$attrs."+name;
				});

				$scope.$watchCollection("["+watchParams.join(",")+"]", function () {
					var params = list.validateParams($attrs);
					var scopeParams = [
						"order",
						"offset",
						"whereString",
					];
					angular.forEach(scopeParams, function(name) {
						$scope[name] = $attrs[name];
					});
					
					$scope.title = $attrs.title;
				});
			}],
		};
	});
});