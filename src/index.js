function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    Number.prototype.noExponents = function() {
		var data = String(this).split(/[eE]/);
		if (data.length == 1) return data[0];

		var z = '',
			sign = this < 0 ? '-' : '',
			str = data[0].replace('.', ''),
			mag = Number(data[1]) + 1;

		if (mag < 0) {
			z = sign + '0.';
			while (mag++) z += '0';
			return z + str.replace(/^\-/, '');
		}
		mag -= str.length;
		while (mag--) z += '0';
		return str + z;
	};

	function checkBrackets(expr) {
		if (expr.includes('(') || expr.includes(')')) {
            try {
                if (expr.match(/\(/g).length !== expr.match(/\)/g).length) {
                    
                    throw "ExpressionError: Brackets must be paired";
                }
            }
            catch (e) {
                throw "ExpressionError: Brackets must be paired";
            }  
		}
	}

	function sum(expr) {
		let i = expr.replace(/\+\+/g, '+');
		i = i.search(/\d\+/);
		let result = (+expr.slice(0, i + 1) * 10000 + +expr.slice(i + 2) * 10000) / 10000;

		if (result >= 0) {
			return `+${result}`;
		} else {
			return result;
		}
	}

	function neg(expr) {
		let i = expr.search(/\d\-/);
		let result = (+expr.slice(0, i + 1) * 10000 - +expr.slice(i + 2) * 10000) / 10000;
		if (result >= 0) {
			return `+${result}`;
		} else {
			return result;
		}
	}

	function mult(expr) {
		let result = (expr.split('*')[0] * expr.split('*')[1]);
		if (result >= 0) {
			return `+${result}`;
		} else {
			return result;
		}
	}

	function div(expr) {
		let result = expr.split('/')[0] / expr.split('/')[1];
		if (expr.split('/')[1] === '0') {
			throw "TypeError: Division by zero.";
		}
		if (`${result}`.includes('e')) {
			result = result.noExponents();
		}
		if (result >= 0) {
			return `+${result}`;
		} else {
			return result;
		}
	}

	function all(expr) {
		let num = expr;
		while (num.includes('/')) {
			num = num.replace(/[\+\-]?[\d\.]+\/[\+\-]?[\d\.]+/, div).replace(/\+\-/g, '-').replace(/\+\+/g, '+').replace(/\-\-/g, '+');
		}
		while (num.includes('*')) {
			num = num.replace(/[\+\-]?[\d\.]+\*[\+\-]?[\d\.]+/g, mult).replace(/\+\-/g, '-').replace(/\+\+/g, '+').replace(/\-\-/g, '+');
		}
		num = num.replace(/[\+\-]?[\d\.]+\-[\+\-]?[\d\.]+/g, neg).replace(/[\+\-]?[\d\.]+\+[\+\-]?[\d\.]+/g, sum).replace(/\+\-/g, '-').replace(/\+\+/g, '+').replace(/\-\-/g, '+');

		if (/\([\-\+]?\d+\.?\d*\)/.test(num)) {
			num = num.replace(/[\(\)]/g, '');
			return num;
		}
		return num;
	};

	let ans = expr.replace(/\s/g, '');
	checkBrackets(expr);
	while (ans.includes('(')) {
		ans = ans.replace(/\([0-9+\-\/*\s\.]+\)/g, all).replace(/\+\-/g, '-');
	}
	while (!Number(ans) && ans !== '+0') {
		ans = all(ans);
	}
	ans = +ans;
	return ans;
}

module.exports = {
    expressionCalculator
}
