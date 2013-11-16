qh.getModule('subject').directive('subjectList', function() {
	return {
		restrict: 'ACE',
		transclude: true,
		//scope: {}, // Removed so that scope updates when written to from fetch promise.
		templateUrl: qh.getQHModule('subject').getPath()+"/partial/list.html",
		controller: ["$rootScope", "$attrs", "subject.factory.list", function($scope, $attrs, list) { //$scope.$watch("$attrs.chartName", function () {});
			var params = {
				offset: 0,
				limit: 5,
				whereString: "",
				orderString: "label ASC",
			};
			$.each(params, function(name, value) {
				params[name] = $attrs[name] || params[name];
			});
			$scope.subjectList = [];
			list.fetch(params).then(function(response) {
				$scope.subjectList = response.data.subjects;
			});
		}]
	};
});