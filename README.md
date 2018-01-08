# Coffee Shop Finder

API for finding the nearest coffee shop, given an address.

Used with Node.js (v8.7.0) and npm (v5.4.2).

## Installation and Running

`./setup.sh`
`./start.sh`

The application will run on port 3000. For running on a different port, use `PORT=<port number> node dist/index`.

## API Calls

When running locally, the following are prefixed by `http://localhost:<port number>/api/v1`.

### Create

Creates a coffee shop.

* **URL:** `/coffee-shops`
* **Method:** `POST`
* **URL Parameters:** (none)
* **Body Parameters:**
```javascript
{
    name: <coffee shop's name>,
    address: <coffee shop's address>,
    latitude: <location in degrees latitude>,
    longitude: <location in degrees latitude>
}
```
* **Success Response:** `201`
```javascript
{
    id: <automatically assigned id>,
    name: <coffee shop's name>,
    address: <coffee shop's address>,
    latitude: <location in degrees latitude>,
    longitude: <location in degrees latitude>
}
```

### Read

Returns JSON data about the specified coffee shop.

* **URL:** `/coffee-shops/:id`
* **Method:** `GET`
* **URL Parameters:** `id: integer`
* **Body Parameters:** (none)
* **Success Response:** `200`
```javascript
{
    id: <coffee shop's id>,
    name: <coffee shop's name>,
    address: <coffee shop's address>,
    latitude: <location in degrees latitude>,
    longitude: <location in degrees latitude>
}
```
* **Error Response:** `404`

### Update

Updates a coffee shop's data.

* **URL:** `/coffee-shops/:id`
* **Method:** `PUT`
* **URL Parameters:** `id: integer`
* **Body Parameters:**
```javascript
{
    id: <coffee shop's id>,
    name: <coffee shop's name>,
    address: <coffee shop's address>,
    latitude: <location in degrees latitude>,
    longitude: <location in degrees latitude>
}
```
* **Success Response:** `200`
```javascript
{
    id: <coffee shop's id>,
    name: <coffee shop's name>,
    address: <coffee shop's address>,
    latitude: <location in degrees latitude>,
    longitude: <location in degrees latitude>
}
```
* **Error Response:** `404`

### Delete

Deletes a coffee shop.

* **URL:** `/coffee-shops/:id`
* **Method:** `DELETE`
* **URL Parameters:** `id: integer`
* **Body Parameters:** (none)
* **Success Response:** `204`
* **Error Response:** `404`

### Find Nearest

Finds the nearest coffee shop to the specified address.

* **URL:** `/coffee-shops/nearest`
* **Method:** `POST`
* **URL Parameters:** (none)
* **Body Parameters:**
```javascript
{
    address: <target address>
}
```
* **Success Response:** `200`
```javascript
{
    id: <nearest coffee shop's id>,
    name: <nearest coffee shop's name>,
    address: <nearest coffee shop's address>,
    latitude: <nearest location in degrees latitude>,
    longitude: <nearest location in degrees latitude>
}
```
* **Error Response:** `404`