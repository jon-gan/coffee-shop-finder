import * as fs from "fs";
import * as coffeeShop from "./coffee-shop";

export class Directory {
    private listings: { [key: number]: coffeeShop.CoffeeShop } = {};
    private autoincrement_index = 0;

    public importListingsCsv(filepath: string) {
        var lines = fs.readFileSync(filepath, "utf8").split("\n");
        for (let line of lines) {
            let fields = line.split(", ");
            if (fields.length != 5) {
                throw new Error("Attempting to import listing with improper number of fields.");
            }
            this.importListing(parseInt(fields[0]),
                               fields[1],
                               fields[2],
                               parseFloat(fields[3]),
                               parseFloat(fields[4]));
        }
    }

    private importListing(id: number,
                          name: string,
                          address: string,
                          latitude: number,
                          longitude: number): void {
        if (id in this.listings) {
            throw new Error("Attempting to import listing with ID that already exists.");
        }
        this.listings[id] = new coffeeShop.CoffeeShop(id, name, address, latitude, longitude);
        if (id > this.autoincrement_index) {
            this.autoincrement_index = id + 1;
        }
    }

    public add(name: string, address: string,
               latitude: number, longitude: number): coffeeShop.CoffeeShop {
        this.listings[this.autoincrement_index] = new coffeeShop.CoffeeShop(this.autoincrement_index,
                                                                            name,
                                                                            address,
                                                                            latitude,
                                                                            longitude);
        return this.listings[this.autoincrement_index++];
    }

    public get(id: number): coffeeShop.CoffeeShop {
        if (!(id in this.listings)) {
            throw new Error("ID does not exist.");
        }
        return this.listings[id];
    }

    public update(id: number,
                  name: string,
                  address: string,
                  latitude: number,
                  longitude: number): coffeeShop.CoffeeShop {
        if (!(id in this.listings)) {
            throw new Error("ID does not exist.");
        }
        this.listings[id].update(name, address, latitude, longitude);
        return this.listings[id];
    }

    public remove(id: number): void {
        if (!(id in this.listings)) {
            throw new Error("ID does not exist.");
        }
        delete this.listings[id];
    }

    public findNearest(latitude: number, longitude: number): object {
        if (Object.keys(this.listings).length === 0) {
            throw new Error("No coffee shops listed.");
        }

        let minDistance = Infinity;
        let minCoffeeShop = null;
        for (let id in this.listings) {
            let distance = this.listings[id].calcDistance(latitude, longitude);
            if (distance < minDistance) {
                minDistance = distance;
                minCoffeeShop = this.listings[id];
            }
        }
        return minCoffeeShop;
    }
}