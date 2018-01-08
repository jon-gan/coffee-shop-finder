import * as geolib from "geolib";

export class CoffeeShop {
    constructor(public id: number,
                public name: string,
                public address: string,
                public latitude: number,
                public longitude: number) {
    }

    public update(name: string, address: string, latitude: number, longitude: number): void {
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public calcDistance(otherLatitude: number, otherLongitude: number): number {
        return geolib.getDistance(
            {latitude: this.latitude, longitude: this.longitude},
            {latitude: otherLatitude, longitude: otherLongitude}
        );
    }
}