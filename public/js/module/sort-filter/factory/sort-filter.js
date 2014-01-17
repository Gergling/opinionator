qh.component('sort-filter', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'sort-filter').getFullName(), ["$rootScope", "$http", qhm.getComponent('factory', 'sort').getFullName(), function($scope, $http, sort) {
		var obj = {
			sortFilters: {},
				
			createColumn: function(id, name, label) {
				return {id:id, name:name, label:label, flags:{}};
			},
			/*createCurrentSortColumn: function(id, asc) {
				return {id:id, asc:asc};
			},*/

			addSortFilter: function(name, columns) {
				if (!obj.sortFilters[name]) {
					obj.sortFilters[name] = new obj.SortFilter(columns);
				}
				var sortFilter = obj.getSortFilter(name);
				$scope.$broadcast(qhm.getComponent('factory', 'sort-filter').getFullName()+".addSortFilter", {
					name: name,
					sortFilter: sortFilter,
				});

				return sortFilter;
			},
			getSortFilter: function(name) {
				if (obj.sortFilters[name]) {
					return obj.sortFilters[name];
				} else {
					throw "sort-filter.factory.sort-filter.getSortFilter: Unknown sort-filter '"+name+"'.";
				}
			},

			SortFilter: function(columns) {
				var localScope = this;
				this.columns = columns;
				this.sort = new sort.Sort(localScope);
				// Will also need a filter.
			},
		};
		return obj;
	}]);
});
