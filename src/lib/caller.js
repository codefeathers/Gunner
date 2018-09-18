const { isPromise } = require('../util');

const caller = (test, state) => {

	const perf = { start: 0, end: 0 };

	let value, error, errored;
	try {
		perf.start = Date.now();
		value = test(state);
		perf.end = Date.now();
	} catch (e) {
		perf.end = Date.now();
		errored = true;
		error = e;
	}

	const promise = isPromise(value);

	if (promise) {
		return value
		.then(res => ({
			duration: Date.now() - perf.start,
			status: 'ok',
			resolve: res,
			promise: true
		}))
		.catch(rej => ({
			duration: Date.now() - perf.start,
			status: 'notOk',
			rejection: rej,
			promise: true
		}));
	} else {
		return Promise.resolve({
			duration: perf.end - perf.start,
			status: errored ? 'notOk' : 'ok',
			...(!errored && { value }),
			...(errored && { error }),
			promise: false,
		});
	}

};

module.exports = caller;
