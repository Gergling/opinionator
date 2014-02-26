qh.component('collection', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'indexer').getFullName(), ["$rootScope", function($scope) {
		var obj = {
			index: function(list, indexes, groups) {
				var groups = groups || [];
				// Takes an array of objects to create indexes from.
				// Takes an array of property names existing in each object to create the indexes
				// Takes an array of property names existing in each object to create the groups
				var ret = {list: list, index:{}, group:{}};
				angular.forEach(list, function(item) {
					angular.forEach(indexes, function(indexName) {
						if (!ret.index[indexName]) {ret.index[indexName] = {};}
						ret.index[indexName][item[indexName]] = item;
					});
					angular.forEach(groups, function(groupName) {
						if (!ret.group[groupName]) {ret.group[groupName] = {};}
						if (!ret.group[groupName][item[groupName]]) {ret.group[groupName][item[groupName]] = [];}
						ret.group[groupName][item[groupName]].push(item);
					});
				});
				return ret;
			},
			Collection: function(list, indexes, groups) {
				var scope = this;
				scope.list = list || [];
				scope.indexes = indexes || [];
				scope.groups = groups || [];
				scope.update = function() {
					var data = obj.index(scope.list, scope.indexes, scope.groups);
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
			},
		};
		return obj;
	}]);
});