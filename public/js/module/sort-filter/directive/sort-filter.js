qh.component('sort-filter', function(ngm, qhm) {
	ngm.directive('listOptionsSortFilter', function() {
		var scopeAttributes = {
			name:"@", 
			columns:"@", 
			currentSort:"@",
		};
		return {
			restrict: 'A',
			scope: true,
			templateUrl: qhm.getPath()+"/partial/sort-filter.html",
			controller: ["$scope", "$attrs", qhm.getComponent('factory', 'sort-filter').getFullName(), function($scope, $attrs, sortFilter) {
				$scope.$on(qhm.getComponent('factory', 'sort-filter').getFullName()+".addSortFilter", function(event, data){
					// The sort is added, and needs to be handled in the partial.
					$scope.sortFilter = sortFilter.getSortFilter($attrs.name);
				});
			}],
		};
	});
});
