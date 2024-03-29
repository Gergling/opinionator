qh.component('sort-filter', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'sort').getFullName(), ["$rootScope", "$http", function($scope, $http) {
		var obj = {
			createCurrent: function(id, asc) {
				return {id:id, asc:asc};
			},

			Sort: function(sortFilter) {
				var localScope = this;
				this.sortFilter = sortFilter;
				this.current = [];
				
				this.setCurrent = function(current) {
					localScope.current = current;
					localScope.update();
				};
				this.resetColumnFlags = function(column) {
					column.flags.asc = false;
					column.flags.desc = false;
				};

				// Needs to be able to add to current columns, remove from current columns and modify order.
				this.toggle = function(id) {
					var currentColumn = this.getCurrent(id);
					currentColumn.current.asc = !currentColumn.current.asc;
					this.update();
				};
				this.add = function(id, asc) {
					var currentColumn = this.getCurrent(id);
					if (currentColumn.currentPosition===undefined) {
						this.current.push(obj.createCurrent(id, asc));
					} else {
						currentColumn.current.asc = asc;
					}
					this.update();
				};
				this.remove = function(id) {
					this.current.splice(this.getCurrent(id).currentPosition, 1);
					this.update();
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

					angular.forEach(localScope.sortFilter.columns, function(column, id) {
						var current = localScope.getCurrent(id);
						localScope.resetColumnFlags(column);
						if (current.currentPosition>-1) {
							if (current.current.asc) {column.flags.asc = true;} else {column.flags.desc = true;}
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
