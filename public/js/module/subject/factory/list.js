qh.getModule('subject').factory("subject.factory.list", ["$rootScope", "$http", function($scope, $http) {
	var obj = {
		fetch: function(params) {
			return $http({
				method: 'POST',
				url: "http://opinionator.localhost/subject",
				data: {params: params}
			}).success(function (response) {
				//console.log("Response", response);
				obj.list = response.data;
			});
		},
		list: [],
	};
	return obj;
}]);
