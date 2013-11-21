qh.getModule('subject').factory("subject.factory.list", ["$rootScope", "$http", function($scope, $http) {
	var obj = {
		fetch: function(params) {
			return $http({
				method: 'GET',
				url: "http://opinionator.localhost/subject",
				params: params,
			}).success(function (response) {
				obj.list = response.data;
			});
		},
		list: [],
	};
	return obj;
}]);
