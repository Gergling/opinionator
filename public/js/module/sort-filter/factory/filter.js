qh.component('sort-filter', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'filter').getFullName(), ["$rootScope", "$http", function($scope, $http) {
		var obj = {
			Filter: function(sortFilter) {
				var localScope = this;
				this.sortFilter = sortFilter;
				
				this.rootFilterConstruct = new obj.FilterConstruct();
				this.chosenFilterConstruct = this.rootFilterConstruct;
				this.toggle = function(id) {
					localScope.rootFilterConstruct.resetChoice();
					var filterConstruct = localScope.getConstruct(id);
					console.log("toggle", id, filterConstruct, localScope.constructs);
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
					return localScope.getConstruct(child.id);
				};
				this.getConstruct = function(id) {
					return localScope.constructs[id];
				};
				this.constructs = [this.rootFilterConstruct];
				// Need a way to input from a string.
				// Need a way to alter bits of it.
				// Need a way to output to a string.
				
				this.addField = function(id) {
					var column = localScope.sortFilter.columns[id];
					console.log(column);
					localScope.chosenFilterConstruct.setField(id, column.name, column.label);
				};
				
				this.chooseRoot();
			},
			FilterConstruct: function() {
				var localScope = this;
				this.fields = {};
				this.operator = 'AND';
				this.constructs = [];
				this.chosen = false;
				this.id = 0;
				this.fieldsEmpty = true;

				// Sets the filter value for a field by field name.
				this.setField = function(id, name, label) {
					if (!localScope.fields[name]) {
						localScope.fields[name] = {id:id, name:name, label:label,list:{}, range:{}};
						localScope.fieldsEmpty = !Object.keys(localScope.fields).length;
					}
					return localScope.fields[name];
				};
				this.addFieldValue = function(name, value) {
					localScope.fields[name].list[value] = value;
				};
				this.removeFieldValue = function(name, value) {
					delete localScope.fields[name].list[value];
				};
				this.addFieldRange = function(name, from, to) {
					var range = {from:from, to:to};
					localScope.fields[name].range.index[from][to] = range;
				};
				this.removeFieldRange = function(name, from, to) {
					delete localScope.fields[name].range.index[from][to];
				};
				this.setOperand = function(value) {localScope.operand = value;};
				this.addConstruct = function(constructId) {localScope.constructs.push(constructId);};
				this.choose = function() {
					localScope.chosen = true;
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
