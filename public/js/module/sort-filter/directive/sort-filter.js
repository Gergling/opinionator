qh.component('sort-filter', function(ngm, qhm) {
	ngm.directive('listOptionsSortFilter', function() {
		var scopeAttributes = {
			name:"@", 
			columns:"@", 
			currentSort:"@",
		};
		return {
			restrict: 'A',
			scope: true,
			templateUrl: qhm.getPath()+"/partial/sort-filter.html",
			controller: ["$scope", "$attrs", qhm.getComponent('factory', 'sort-filter').getFullName(), function($scope, $attrs, sortFilter) {
				$scope.dialogueTemplateUrl = qhm.getPath()+"/partial/filter-construct-dialogue.html";
				$scope.wrapperTemplateUrl = qhm.getPath()+"/partial/filter-construct-wrapper.html";

				$scope.$on(qhm.getComponent('factory', 'sort-filter').getFullName()+".addSortFilter", function(event, data){
					// The sort is added, and needs to be handled in the partial.
					$scope.sortFilter = sortFilter.getSortFilter($attrs.name);
				});
				
				$scope.dialogueModel = false;
				$scope.setDialogue = function(filterConstructId, fieldName, valueType) {
					var filterConstruct = $scope.sortFilter.filter.getConstruct(filterConstructId);
					filterConstruct.setDialogue(fieldName, valueType);
					$scope.dialogueModel = {
						construct: filterConstruct,
						name: fieldName,
						type: valueType,
						label: filterConstruct.getField(fieldName).label,
					};
				};
				$scope.removeField = function(filterConstructId, fieldName) {
					var filterConstruct = $scope.sortFilter.filter.getConstruct(filterConstructId);
					filterConstruct.removeField(fieldName);
				};
				$scope.removeFieldValue = function(filterConstructId, fieldName, fieldValue) {
					var filterConstruct = $scope.sortFilter.filter.getConstruct(filterConstructId);
					filterConstruct.removeFieldValue(fieldName, fieldValue);
				};
				$scope.closeDialogue = function() {
					$scope.dialogueModel.construct.setDialogue();
					$scope.dialogueModel = false;
				};
				$scope.submitDialogue = function() {
					$scope.dialogueModel.construct.submitDialogue();
					$scope.closeDialogue();
				};
			}],
		};
	});
});
