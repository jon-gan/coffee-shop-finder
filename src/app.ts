import * as express from "express";
import * as bodyParser from "body-parser";
import * as fetch from "node-fetch";
import * as directory from "./directory";

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
app.use('/api/v1', router);

const coffeeShops = new directory.Directory();
coffeeShops.importListingsCsv("./locations.csv");

// Create
router.post('/coffee-shops', (req, res) => {
    res.status(201).send(coffeeShops.add(req.body.name,
                                         req.body.address,
                                         req.body.latitude,
                                         req.body.longitude));
});

// Read
router.get('/coffee-shops/:id', (req, res) => {
    try {
        res.status(200).send(coffeeShops.get(req.params.id));
    } catch (err) {
        res.status(404).end();
    }
});

// Update
router.put('/coffee-shops/:id', (req, res) => {
    try {
        res.status(200).send(coffeeShops.update(req.params.id,
                                                req.body.name,
                                                req.body.address,
                                                req.body.latitude,
                                                req.body.longitude));
    } catch (err) {
        res.status(404).end();
    }
});

// Delete
router.delete('/coffee-shops/:id', (req, res) => {
    try {
        coffeeShops.remove(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(404).end();
    }
});

// Find Nearest
router.post('/coffee-shops/nearest', (req, res) => {
    let url: string = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    url += encodeURIComponent(req.body.address);
    url += "&";
    url += "key=AIzaSyD1u2v6nFDaC1Dtp4PU3LHhKD0LbTK-5wk";

    fetch(url).then( _res => {
        _res.json().then( json => {
            let referenceLatitude = json["results"][0]["geometry"]["location"]["lat"];
            let referenceLongitude = json["results"][0]["geometry"]["location"]["lng"];
            let nearestCoffeeShop = coffeeShops.findNearest(referenceLatitude, referenceLongitude);
            res.status(200).send(nearestCoffeeShop);
        }).catch( err => {
            throw new Error("Unable to find nearest coffee shop.");
        });
    }).catch( err => {
        res.status(404).end();
    });
});

export default app;