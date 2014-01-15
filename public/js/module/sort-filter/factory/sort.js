qh.component('sort-filter', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'sort').getFullName(), ["$rootScope", "$http", function($scope, $http) {
		var obj = {
			sorts: {},
				
			createCurrent: function(id, asc) {
				return {id:id, asc:asc};
			},

			addSort: function(name, columns, current) {
				if (!obj.sorts[name]) {
					obj.sorts[name] = new obj.Sort(columns, current);
				}
				var sort = obj.getSort(name);
				$scope.$broadcast(qhm.getComponent('factory', 'sort').getFullName()+".addSort", {
					name: name,
					sort: sort,
				});

				return sort;
			},
			getSort: function(name) {
				if (obj.sorts[name]) {
					return obj.sorts[name];
				} else {
					throw "sort-filter.factory.sort.getSort: Unknown sort '"+name+"'.";
				}
			},

			Sort: function(columns, current) {
				var localScope = this;
				this.columns = columns;
				this.current = current || [];

				// Needs to be able to add to current columns, remove from current columns and modify order.
				this.add = function(id) {
					this.current.push(id);
					this.update();
				};
				this.remove = function(id) {
					this.current.splice(this.current.indexOf(id), 1);
					this.update();
				};
				this.updateCurrentIndex = function() {
					localScope.current.index
				};
				this.getCurrent = function(id) {
					var ret = {};
					var x = angular.forEach(localScope.current, function(current, currentPosition) {
						if (current.id==id) {ret = {current: current, currentPosition: currentPosition};return;}
					});
					return ret;
				};
				this.update = function() {
					localScope.unusedColumns = [];
					localScope.sortingByColumns = [];

					angular.forEach(localScope.columns, function(label, id) {
						var current = localScope.getCurrent(id);
						var column = {id: id, label: label};
						if (current.currentPosition>-1) {
							localScope.sortingByColumns[current.currentPosition] = $.extend(column, {asc:current.current.asc});
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
