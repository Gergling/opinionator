qh.component('subject', function(ngm, qhm) {
	ngm.directive('subjectListLink', function() {
		return {
			restrict: 'A',
			scope: true,
			templateUrl: qhm.getPath()+"/partial/list-link.html",
			controller: ["$scope", "$attrs", "subject.factory.list", function($scope, $attrs, list) {
				var watchParams = [];
				var params = list.validateParams({});
				$.each(params, function(name) {
					watchParams[name] = "$attrs."+name;
				});

				$scope.$watchCollection("["+watchParams.join(",")+"]", function () {

					var params = list.validateParams($attrs);
					$scope.content = $attrs.content;
					var args = [];
					$scope.baseUrl = "#/list/";
					// Extrapolate the link arguments from the directive attributes.
					$.each(params, function(name, value) {
						args.push(name+"="+value);
					});
					$scope.url = $scope.baseUrl + "?" + args.join('&');
				});
			}],
		};
	});
});
