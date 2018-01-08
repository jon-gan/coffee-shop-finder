import { expect } from "chai";
import { CoffeeShop } from "../src/coffee-shop";

describe("CoffeeShop", () => {
    it("Should be able to be updated", () => {
        let coffeeShop = new CoffeeShop(1, "Test Shop", "123 Test Address", 0, 0);
        coffeeShop.update("New Name", "000 New Address", 1, 1);
        expect(coffeeShop.name).to.equal("New Name");
        expect(coffeeShop.address).to.equal("000 New Address");
        expect(coffeeShop.latitude).to.equal(1);
        expect(coffeeShop.longitude).to.equal(1);
    });
    it("Should return the correct distance", () => {
        let coffeeShop = new CoffeeShop(1, "Test Shop", "123 Test Address", 0, 0);
        let result = coffeeShop.calcDistance(1, 1);
        expect(result).to.equal(156900);
    });
});