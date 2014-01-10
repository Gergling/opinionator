qh.component('subject', function(ngm, qhm) {
	ngm.directive('subjectScoreIcon', function() {
		return {
			restrict: 'A',
			scope: true,
			templateUrl: qh.getQHModule('subject').getPath()+"/partial/score-icon.html",
			controller: ["$scope", "$attrs", "$element", "util.factory.number-formatter", function($scope, $attrs, $element, formatter) {
				$scope.colour = {
					red: 255, 
					green: 255,
					blue: 0,
				};
				var range = 255;
				range = $attrs.range;
				$scope.$watch("$attrs.subject", function () {
					if ($attrs.subject) {
						$scope.subject = JSON.parse($attrs.subject);
						var r = $scope.subject.ratio;
						if (r>=0) {$scope.colour["red"] = Math.floor((1-r)*range);}
						if (r<=0) {$scope.colour["green"] = Math.floor((1+r)*range);}

						$scope.subject.formatted = {
							sum: formatter.format($scope.subject.sum),
							total: formatter.format($scope.subject.total),
						};
					} else {
						throw "Exception: No subject provided for score icon.";
					}
				});
			}],
		};
	});
});
