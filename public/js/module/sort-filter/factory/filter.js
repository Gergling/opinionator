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
				};
				this.newConstruct = function(id) {
					var parent = localScope.getConstruct(id);
					var child = new obj.FilterConstruct();
					parent.addConstruct(child);
					child.id = localScope.constructs.length;
					localScope.constructs.push(child);
					console.log("new", parent, child);
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
				this.getField = function(name) {
					return localScope.fields[name];
				};
				this.setField = function(id, name, label) {
					if (!localScope.fields[name]) {
						localScope.fields[name] = {id:id, name:name, label:label,list:[], range:{}};
						localScope.updateFieldsEmpty();
					}
				};
				this.removeField = function(name) {
					delete localScope.fields[name];
					localScope.updateFieldsEmpty();
				};
				this.updateFieldsEmpty = function() {
					localScope.fieldsEmpty = !Object.keys(localScope.fields).length;
				};
				this.addFieldValue = function(name, value) {
					this.removeFieldValue(name, value);
					localScope.fields[name].list.push(value);
				};
				this.removeFieldValue = function(name, value) {
					var idx = localScope.fields[name].list.indexOf(value);
					localScope.fields[name].list.splice(idx, 1);
				};
				this.addFieldRange = function(name, from, to) {
					var range = {from:from, to:to};
					localScope.fields[name].range.index[from][to] = range;
				};
				this.removeFieldRange = function(name, from, to) {
					delete localScope.fields[name].range.index[from][to];
				};
				this.setOperand = function(value) {localScope.operand = value;};
				this.addConstruct = function(construct) {localScope.constructs.push(construct);};
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
				this.setDialogue = function(name, type) {
					localScope.dialogue = {name:name, type:type, value:"", from:"", to:""};
				};
				this.setDialogue();
				this.submitDialogue = function() {
					if (localScope.dialogue.value) {
						localScope.addFieldValue(localScope.dialogue.name, localScope.dialogue.value);
					}
					if (localScope.dialogue.from && localScope.dialogue.to) {
						localScope.addFieldRange(localScope.dialogue.name, localScope.dialogue.from, localScope.dialogue.to);
					}
					localScope.setDialogue();
				};
			},
		};
		return obj;
	}]);
});
