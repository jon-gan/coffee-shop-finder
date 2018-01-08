import { expect } from "chai";
import { Directory } from "../src/directory";

describe("Directory", () => {
    it("Should import listings from CSV", () => {
        let directory = new Directory();
        directory.importListingsCsv("./test/testLocationsValid.csv");
        expect(directory.get(2)).to.exist;
    });
    it("Should thrown an error when importing invalid listings from CSV", () => {
        var directory = new Directory();
        expect(() => { directory.importListingsCsv("./test/testLocationsInvalid.csv"); }).to.throw(Error);
    });
    it("Should add and get CoffeeShops", () => {
        let directory = new Directory();
        let coffeeShop = directory.add("Test Name", "123 Test Address", 0, 0);
        expect(directory.get(coffeeShop["id"])).to.exist;
    });
    it("Should return an error when getting a CoffeeShop that does not exist", () => {
        let directory = new Directory();
        expect(() => { directory.get(1); }).to.throw(Error);
    });
    it("Should update CoffeeShops", () => {
        let directory = new Directory();
        let coffeeShop = directory.add("Test Name", "123 Test Address", 0, 0);
        directory.update(0, "New Name", "000 New Address", 1, 1);
        expect(directory.get(coffeeShop["id"])["name"]).to.equal("New Name");
        expect(directory.get(coffeeShop["id"])["address"]).to.equal("000 New Address");
        expect(directory.get(coffeeShop["id"])["latitude"]).to.equal(1);
        expect(directory.get(coffeeShop["id"])["longitude"]).to.equal(1);
    });
    it("Should return an error when updating a CoffeeShop that does not exist", () => {
        let directory = new Directory();
        expect(() => { directory.update(1, "New Name", "000 New Address", 1, 1); }).to.throw(Error);
    });
    it("Should remove CoffeeShops", () => {
        let directory = new Directory();
        let coffeeShop = directory.add("Test Name", "123 Test Address", 0, 0);
        directory.remove(coffeeShop["id"]);
        expect(() => { directory.get(coffeeShop["id"]); }).to.throw(Error);
    });
    it("Should return an error when removing a CoffeeShop that does not exist", () => {
        let directory = new Directory();
        expect(() => { directory.remove(0); }).to.throw(Error);
    });
    it("Should find the nearest CoffeeShop", () => {
        let directory = new Directory();
        let coffeeShopNear = directory.add("Near Shop", "Near Address", 0, 0);
        let coffeeShopFar = directory.add("Far Shop", "Far Address", 180, 180);
        expect(directory.findNearest(1, 1)["id"]).to.equal(coffeeShopNear["id"]);
    });
});