qh.getModule('subject').directive('subjectList', function() {
	return {
		restrict: 'A',
		scope: {orderString:"@", whereString:"@", limit:"@", offset:"@", sortFilter:"@"},
		templateUrl: qh.getQHModule('subject').getPath()+"/partial/list.html",
		controller: ["$scope", "$attrs", "subject.factory.list", "sort-filter.factory.sort", function($scope, $attrs, list, sort) {
			var getColumns = function(searchParamsOrder, columnLabels) {
				var columns = {all:[], current:[]};
				var idx = {id:[], name:{}};
				$.each(columnLabels, function(name, label) {
					var id = columns.all.push(label)-1;
					var column = {id: id, name:name, label:label};
					idx.id[id] = column;
					idx.name[name] = column;
				});
				angular.forEach(searchParamsOrder, function(columnOrderString) {
					var columnOrder = columnOrderString.split(" ");
					var name = columnOrder[0];
					var order = columnOrder[1];
					columns.current.push(sort.createCurrent(idx.name[name].id, order=="ASC"));
				});
				return columns;
			};
			
			$scope.sortFilterName = "subject-filter";
			
			$scope.subjectList = [];

			var watchParams = [];
			var params = list.validateParams({});
			$.each(params, function(name) {
				watchParams[name] = "$attrs."+name;
			});
			$scope.$watchCollection("["+watchParams.join(",")+"]", function () {
				var params = list.validateParams($attrs);
				for(var i=0;i<params.limit*1;i++) {
					$scope.subjectList.push({});
				}
				$scope.sortFilter = $attrs.sortFilter;
				list.fetch(params).then(function(response) {
					$scope.subjectList = response.data.subjects;
					$scope.columns = getColumns(response.data.searchParams.order, response.data.columnLabels);
					// Make sorting directive update from here.
					// Perhaps columns should go into a factory?
					// Columns go into sort-filter factory for name 'subject-list'.
					sort.addSort($scope.sortFilterName, $scope.columns.all, $scope.columns.current);
				});
			});
		}],
	};
});
