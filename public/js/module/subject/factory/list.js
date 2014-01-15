qh.component('subject', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'list').getFullName(), ["$rootScope", "$http", "$q", function($scope, $http, $q) {
		var obj = {
			fetch: function(params, forceUpdate) {
				var promise = $q.defer().promise;
				var updated = false;
				if (Object.keys(obj.list).length || forceUpdate) {
					promise = $http({
						method: 'GET',
						url: "/subject",
						params: params,
					}).success(function (response) {
						var key = JSON.stringify(jQuery.extend(true, {}, response.searchParams));
						obj.list.all[key] = response;
						obj.list.last = response;
						updated = true;
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
		};
		return obj;
	}]);
});
