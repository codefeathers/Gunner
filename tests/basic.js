/* Gunner */

const Gunner = require("../src/Gunner");

const { before, it, after, run } = Gunner("instance");

const be = a => b => a === b;

before("Should return 5", () => console.log("Before"));

it("Should return 5", () => 1 + 4, be(5));

after("Should return 5", () => console.log("After"));

run();

/* Mocha */

describe("", () => {
	it("should return 5", () => {
		return expect(1 + 4).to.be(5);
	});
});

