import { expect } from "chai";
import * as chai from "chai";
import { server } from "../src/index";

import chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("POST /api/v1/coffee-shops", () => {
    it("responds with a json representation of the coffee shop", () => {
        return chai.request(server)
                   .post("/api/v1/coffee-shops")
                   .send({ name: "Test Name",
                           address: "123 Test Address",
                           latitude: 1,
                           longitude: 1 })
                   .then(res => {
                       expect(res).to.have.status(201);
                       expect(res).to.be.json;
                       expect(res.body).to.be.an("object");
                       expect(res.body).to.have.property("id");
                       expect(res.body.name).to.equal("Test Name");
                       expect(res.body.address).to.equal("123 Test Address");
                       expect(res.body.latitude).to.equal(1);
                       expect(res.body.longitude).to.equal(1);
                   });
    });
});

describe("GET /api/v1/coffee-shops/:id", () => {
    it("responds with a json representation of the coffee shop", () => {
        return chai.request(server)
                   .get("/api/v1/coffee-shops/1")
                   .then(res => {
                       expect(res).to.have.status(200);
                       expect(res).to.be.json;
                       expect(res.body).to.be.an("object");
                       expect(res.body.id).to.equal(1);
                       expect(res.body.name).to.equal("Equator Coffees & Teas");
                       expect(res.body.address).to.equal("986 Market St");
                       expect(res.body.latitude).to.equal(37.782394430549445);
                       expect(res.body.longitude).to.equal(-122.40997343121123);
                   });
    });
    it("responds with status code 404 if the coffee shop does not exist", () => {
        return chai.request(server)
                   .get("/api/v1/coffee-shops/1000000")
                   .catch(err => err.response)
                   .then(res => {
                        expect(res).to.have.status(404);
                   });
    });
});

describe("PUT /api/v1/coffee-shops/:id", () => {
    it("responds with a json representation of the coffee shop", () => {
        return chai.request(server)
                   .put("/api/v1/coffee-shops/1")
                   .send({ name: "Test Name",
                           address: "123 Test Address",
                           latitude: 1,
                           longitude: 1 })
                   .then(res => {
                       expect(res).to.have.status(200);
                       expect(res).to.be.json;
                       expect(res.body).to.be.an("object");
                       expect(res.body.id).to.equal(1);
                       expect(res.body.name).to.equal("Test Name");
                       expect(res.body.address).to.equal("123 Test Address");
                       expect(res.body.latitude).to.equal(1);
                       expect(res.body.longitude).to.equal(1);
                   });
    });
    it("responds with status code 404 if the coffee shop does not exist", () => {
        return chai.request(server)
                   .put("/api/v1/coffee-shops/1000000")
                   .send({ name: "Test Name",
                           address: "123 Test Address",
                           latitude: 1,
                           longitude: 1 })
                   .catch(err => err.response)
                   .then(res => {
                        expect(res).to.have.status(404);
                   });
    });
});

describe("DELETE /api/v1/coffee-shops/:id", () => {
    it("responds with status code 204 if the coffee shop exists", () => {
        return chai.request(server)
                   .delete("/api/v1/coffee-shops/1")
                   .then(res => {
                       expect(res).to.have.status(204);
                   });
    });
    it("responds with status code 404 if the coffee shop does not exist", () => {
        return chai.request(server)
                   .delete("/api/v1/coffee-shops/1000000")
                   .catch(err => err.response)
                   .then(res => {
                        expect(res).to.have.status(404);
                   });
    });
});

describe("POST /api/v1/coffee-shops/nearest", () => {
    it("responds with a json representation of a coffee shop", () => {
        return chai.request(server)
                   .post("/api/v1/coffee-shops/nearest")
                   .send({ address: "535 Mission St, San Francisco, CA 94105" })
                   .then(res => {
                       expect(res).to.have.status(200);
                       expect(res).to.be.json;
                       expect(res.body).to.be.an("object");
                       expect(res.body).to.have.property("id");
                       expect(res.body).to.have.property("name");
                       expect(res.body).to.have.property("address");
                       expect(res.body).to.have.property("latitude");
                       expect(res.body).to.have.property("longitude");
                   });
    });
});