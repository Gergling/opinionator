qh.component('sort-filter', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'sort-filter').getFullName(), [
		"$rootScope", 
		"$http", 
		qhm.getComponent('factory', 'sort').getFullName(), 
		qhm.getComponent('factory', 'filter').getFullName(), 
	function($scope, $http, sort, filter) {
		var obj = {
			sortFilters: {},
				
			createColumn: function(id, name, label) {
				return {id:id, name:name, label:label, flags:{filter:true}};
			},

			addSortFilter: function(name, columns) {
				if (!obj.sortFilters[name]) {
					obj.sortFilters[name] = new obj.SortFilter(name, columns);
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

			SortFilter: function(name, columns) {
				var localScope = this;
				this.columns = columns;
				this.name = name;
				this.sort = new sort.Sort(localScope);
				this.filter = new filter.Filter(localScope);
			},			
		};
		return obj;
	}]);
});
