module.exports = function Gunner (name) {
	const suite = {};
	const order = [];

	const gunner = {
		test: ({ name, value, expect }) => {
			order.push(name);
			suite[name] || (suite[name] = {});

			suite[name].main = () => expect(value());

			return suite;
		},
		before: ({ test, perform }) => {
			suite[test] || (suite[test] = {});
			const before = suite[test].before || (suite[test].before = []);
			before.push(perform);

			return suite;
		},
		after: ({ test, perform }) => {
			suite[test] || (suite[test] = {});
			const after = suite[test].after || (suite[test].after = []);
			after.push(perform);

			return suite;
		},
		run: () => {
			for (const name of order) {
				const { before = [], main, after = [] } = suite[name];
				for (const each of before) each();
				if (!main()) throw new Error("FAIL!");
				for (const each of after) each();
			}
			console.log(name, "All tests pass!");
		}
	};

	return gunner;
};
