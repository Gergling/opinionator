qh.getModule('util').factory("util.factory.number-formatter", ["$rootScope", function($scope) {
	var obj = {
		symbols: {
			0: '',
			1: 'k',
			2: 'm',
			3: 'b',
		},
		format: function(number) {
			var magnitude = 0;
			while(number>=1000) {
				number = Math.round(number/1000);
				magnitude++;
			}
			if (magnitude>obj.symbols.length-1) throw "Unexpectedly high magnitude number. Number is "+number+" resulting in magnitude "+magnitude;
			return number+obj.symbols[magnitude];
		},
		tested: false,
		test: function() {
			if (obj.tested) {return;}
			console.log("=== Beginning test of number formatter for varying kinds of data ===");
			var tests = [
				{input: 1, output: "1"},
				{input: 1000, output: "1k"},
				{input: 999, output: "999"},
				{input: 1000000, output: "1m"},
				{input: 1000000000, output: "1b"},
				{input: -1, output: "-1"},
				{input: -1000, output: "-1000"},
				{input: -1000000, output: "-1000000"},
				{input: 999999, output: "1m"},
				{input: 998999, output: "999k"},
				{input: 1.5, output: "1.5"},
				{input: 1000.5, output: "1k"},
			];
			var failures = 0;
			angular.forEach(tests, function(test) {
				var output = obj.format(test.input);
				var passed = false;
				if (output==test.output) {
					passed = true;
				} else {
					failures++;
				}
				console.log("-", (passed?"Pass":"FAIL")+":", "'"+test.input+"' returned '"+output+"', expected '"+test.output+"'");
			});
			console.log("!:", failures, "failures.");
			console.log("=== End of number formatter test ===");
			obj.tested = true;
		},
	};
	return obj;
}]);
