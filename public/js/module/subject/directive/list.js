qh.getModule('subject').directive('subjectList', function() {
	return {
		restrict: 'A',
		scope: {orderString:"@", whereString:"@", limit:"@", offset:"@", showSortFilter:"@"},
		templateUrl: qh.getQHModule('subject').getPath()+"/partial/list.html",
		controller: ["$scope", "$attrs", "subject.factory.list", "sort-filter.factory.sort-filter", "sort-filter.factory.sort", "$location", 
		function($scope, $attrs, list, sortFilter, sort, $location) {
			var getColumns = function(searchParamsOrder, columnLabels) {
				// This function extrapolates sort columns for use inside the partial from url parameters and allowed columns for the list.
				var columns = {all:[], current:{sort:[], filter:[]}};
				var idx = {id:[], name:{}};
				$.each(columnLabels, function(name, label) {
					id = columns.all.length;
					var column = sortFilter.createColumn(id, name, label);
					columns.all.push(column);
					//var column = {id: id, name:name, label:label};
					idx.id[id] = column;
					idx.name[name] = column;
				});
				angular.forEach(searchParamsOrder, function(columnOrderString) {
					var columnOrder = columnOrderString.split(" ");
					var name = columnOrder[0];
					var order = columnOrder[1];
					columns.current.sort.push(sort.createCurrent(idx.name[name].id, order=="ASC"));
				});
				return columns;
			};
			
			$scope.sortFilterName = "subject-filter";
			$scope.loading = true;
			$scope.firstLoading = true;
			
			$scope.subjectList = [];
			
			$scope.refresh = function() {
				$location.search("orderString", list.getSortOrderString(sortFilter.getSortFilter($scope.sortFilterName).sort.sortingByColumns));
				// Will also want whereString
				$location.replace();
			};

			$scope.update = function() {
				// Probably need a separate function to call this update and modify the params according to the sort-filter change.
				var params = list.validateParams($attrs);
				for(var i=0;i<params.limit*1;i++) {
					$scope.subjectList.push({});
				}

				$scope.sortFilter = $attrs.sortFilter;
				$scope.loading = true;
				list.fetch(params).then(function(response) {
					$scope.subjectList = response.data.subjects;
					$scope.columns = getColumns(response.data.searchParams.order, response.data.columnLabels);
					// Make sorting directive update from here.
					// Perhaps columns should go into a factory?
					// Columns go into sort-filter factory for name 'subject-list'.
					sortFilter.addSortFilter($scope.sortFilterName, $scope.columns.all).sort.setCurrent($scope.columns.current.sort);
					$scope.loading = false;
					$scope.firstLoading = false;
					
					//var sortColumns = sortFilter.getSortFilter($scope.sortFilterName).sort.current;
					//console.log(1, sortColumns);
					//params

				});
			};

			var watchParams = [];
			var params = list.validateParams({});
			$.each(params, function(name) {
				watchParams[name] = "$attrs."+name;
			});
			$scope.$watchCollection("["+watchParams.join(",")+"]", function () {
				$scope.update();
			});
		}],
	};
});
