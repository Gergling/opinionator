qh.component('collection', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'Collection').getFullName(), [
		"$rootScope", 
		"collection.factory.indexer", 
	function($scope, indexer) {
		return function(list, indexes, groups) {
			var scope = this;
			scope.list = list || [];
			scope.indexes = indexes || [];
			scope.groups = groups || [];
			scope.update = function() {
				var data = indexer.index(scope.list, scope.indexes, scope.groups);
				scope.index = data.index;
				scope.group = data.group;
			};
			scope.update();
			scope.loop = function(fnc) {
				angular.forEach(scope.list, fnc);
			};
			scope.sortField = "name";
			scope.sort = function() {
				scope.list.sort(function(a,b) {
					if (a[scope.sortField] < b[scope.sortField]) {return -1;}
					if (a[scope.sortField] > b[scope.sortField]) {return 1;}
					return 0;
				});
			};
		};
	}]);
});