qh.component('sort-filter', function(ngm, qhm) {
	ngm.directive('listOptionsFilterConstruct', function() {
		var scopeAttributes = {
			filterConstructId:"@", 
			sortFilterName:"@", 
		};
		return {
			restrict: 'A',
			scope: true,
			templateUrl: qhm.getPath()+"/partial/filter-construct.html",
			controller: ["$scope", "$attrs", qhm.getComponent('factory', 'sort-filter').getFullName(), function($scope, $attrs, sortFilter) {
				var watch = function() {
					$scope.$watchCollection("["+["$attrs.filterConstruct", "$attrs.sortFilterName"].join(",")+"]", function() {
						if ($attrs.filterConstructId) {
							$scope.sortFilter = sortFilter.getSortFilter($attrs.sortFilterName);
							$scope.filterConstruct = $scope.sortFilter.filter.getConstruct($attrs.filterConstructId);
						}
					});
				};
				watch();
				
				$scope.$on(qhm.getComponent('factory', 'sort-filter').getFullName()+".addSortFilter", function(event, data){
					watch();
				});

				$scope.toggle = function(filterConstruct) {
					sortFilter.getSortFilter($attrs.sortFilterName).filter.toggle(filterConstruct);
				};
			}],
		};
	});
});
