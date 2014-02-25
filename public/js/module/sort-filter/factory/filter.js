qh.component('sort-filter', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'filter').getFullName(), ["$rootScope", "$http", function($scope, $http) {
		var obj = {
			Filter: function(sortFilter) {
				var localScope = this;
				this.sortFilter = sortFilter;
				
				this.rootFilterConstruct = new obj.FilterConstruct();
				this.chosenFilterConstruct = this.rootFilterConstruct;
				this.toggle = function(filterConstruct) {
					localScope.rootFilterConstruct.resetChoice();
					if (filterConstruct.toggle()) {
						localScope.chosenFilterConstruct = filterConstruct;
					} else {
						//localScope.chosenFilterConstruct = localScope.rootFilterChoice;
						//localScope.chosenFilterConstruct.choose();
						localScope.chooseRoot();
					}
				};
				this.chooseRoot = function() {
					localScope.chosenFilterConstruct = localScope.rootFilterConstruct;
					localScope.chosenFilterConstruct.choose();
					console.log(1, localScope.chosenFilterConstruct);
				};
				this.newConstruct = function(parent) {
					var child = new obj.FilterConstruct();
					parent.addConstruct(child);
					child.id = localScope.constructs.push(child);
					return localScope.getConstruct(id);
				};
				this.getConstruct = function(id) {
					return localScope.constructs[id];
				};
				this.constructs = [];
				this.newConstruct(this.rootFilterConstruct);
				// Need a way to input from a string.
				// Need a way to alter bits of it.
				// Need a way to output to a string.
				
				this.addField = function(id) {
					localScope.chosenFilterConstruct
				};
				
				this.chooseRoot();
			},
			FilterConstruct: function() {
				var localScope = this;
				this.fields = {};
				this.operand = 'AND';
				this.constructs = [];
				this.chosen = false;
				this.id = 0;

				// Sets the filter value for a field by field name.
				this.setField = function(name, value) {localScope.fields[name] = value;};
				this.setOperand = function(value) {localScope.operand = value;};
				this.addConstruct = function(construct) {localScope.constructs.push(construct);};
				this.choose = function() {
					localScope.chosen = true;
					console.log(localScope.id);
				};
				this.toggle = function() {
					localScope.chosen = !localScope.chosen;
					return localScope.chosen;
				};
				this.resetChoice = function() {
					localScope.chosen = false;
					angular.forEach(localScope.constructs, function(construct) {
						construct.resetChoice();
					});
				};
			},
		};
		return obj;
	}]);
});
