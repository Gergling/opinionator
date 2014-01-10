qh.component('sort-filter', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'sort').getFullName(), ["$rootScope", "$http", function($scope, $http) {
		var obj = {
			sorts: {},

			addSort: function(name, columns) {obj.sorts[name] = new obj.Sort(columns);},
			getSort: function(name) {return obj.sorts[name];},

			Sort: function(columns) {
				var localScope = this;
				this.columns = columns;
				this.current = [];

				// Needs to be able to add to current columns, remove from current columns and modify order.
				this.add = function(id) {
					this.current.push(id);
					this.update();
				};
				this.remove = function(id) {
					this.current.splice(this.current.indexOf(id), 1);
					this.update();
				};
				this.update = function() {
					localScope.unusedColumns = [];
					localScope.sortingByColumns = [];

					angular.forEach(localScope.columns, function(label, id) {
						var currentPosition = localScope.current.indexOf(id);
						var column = {id: id, label: label};
						if (currentPosition>-1) {
							localScope.sortingByColumns[currentPosition] = column;
						} else {
							localScope.unusedColumns.push(column);
						}
					});
				};
				
				this.update();
			},
		};
		return obj;
	}]);
});
