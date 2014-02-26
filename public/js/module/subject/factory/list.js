qh.component('subject', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'list').getFullName(), [
		"$rootScope", 
		"$http", 
		"$q", 
		"collection.factory.Collection", 
		"sort-filter.factory.sort-filter", 
		"sort-filter.factory.sort", 
	function($scope, $http, $q, Collection, sortFilter, sort) {
		var obj = {
			fetch: function(params, forceUpdate) {
				var promise = $q.defer().promise;
				if (Object.keys(obj.list).length || forceUpdate) {
					promise = $http({
						method: 'GET',
						url: "/subject",
						params: params,
					}).success(function (response) {
						var key = JSON.stringify(jQuery.extend(true, {}, response.searchParams));
						obj.list.all[key] = response;
						obj.list.last = response;
						obj.sortFilter.updateColumns(response.columnLabels);
					});
				}
				return promise;
			},
			list: {all: {}, last: {}},
			validateParams: function(inputParams) {
				var params = {
					offset: 0,
					limit: 5,
					whereString: "",
					orderString: "sum ASC",
				};
				$.each(params, function(name, value) {
					params[name] = inputParams[name] || params[name];
				});
				return params;
			},
			getSortOrderString: function(columns) {
				var order = [];
				angular.forEach(columns, function(column) {
					order.push([column.name, (column.asc?"ASC":"DESC")].join(" "));
				});
				return order.join(":");
			},
			sortFilter: {
				updateColumns: function(columnLabels) {
					var id = 0;
					obj.sortFilter.columns.list = [];
					angular.forEach(columnLabels, function(label, name) {
						obj.sortFilter.columns.list.push(sortFilter.createColumn(id, name, label));
						id++;
					});
					obj.sortFilter.columns.update();
				},
				getSortOrderColumns: function(columns) {
					var ret = [];
					angular.forEach(columns, function(columnOrderString) {
						var columnOrder = columnOrderString.split(" ");
						var name = columnOrder[0];
						var order = columnOrder[1];
						ret.push(sort.createCurrent(obj.sortFilter.columns.index.name[name].id, order=="ASC"));
					});
					return ret;
				},
				columns: new Collection([], ["name", "id"]),
			},
		};
		return obj;
	}]);
});
