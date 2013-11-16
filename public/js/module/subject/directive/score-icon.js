qh.getModule('subject').directive('subjectScoreIcon', function() {
	return {
		restrict: 'ACE',
		//transclude: true,
		scope: {sum:"@", total:"@", ratio:"@", blue:"@", subject:"=subject"},
		templateUrl: qh.getQHModule('subject').getPath()+"/partial/score-icon.html",
		controller: ["$rootScope", "$attrs", function($scope, $attrs) {
			$scope.$watch("$attrs.sum", function () {
				$scope.sum = $attrs.sum;
			});
			$scope.$watch("$attrs.total", function () {
				$scope.total = $attrs.total;
			});
			$scope.$watch("$attrs.ratio", function () {
				$scope.ratio = $attrs.ratio;
				if ($scope.ratio>0) {
					$scope.red = (1+$scope.ratio)*255;
				}
				if ($scope.ratio<0) {
					$scope.green = (1-$scope.ratio)*255;
				}
				console.log("red2", $scope.red);
			});
			$scope.red = 255;
			$scope.green = 255;
			$scope.blue = 0;
			console.log("red", $scope.red);
		}]
	};
});