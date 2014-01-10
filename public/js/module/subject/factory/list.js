qh.getModule('subject').factory("subject.factory.list", ["$rootScope", "$http", function($scope, $http) {
	var obj = {
		fetch: function(params) {
			return $http({
				method: 'GET',
				url: "/subject",
				params: params,
			}).success(function (response) {
				obj.list = response.data;
			});
		},
		list: [],
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
