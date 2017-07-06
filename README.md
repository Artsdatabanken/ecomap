[![Build Status](https://travis-ci.org/Artsdatabanken/ecomap.svg?branch=master)](https://travis-ci.org/Artsdatabanken/ecomap) [![Coverage Status](https://coveralls.io/repos/github/Artsdatabanken/ecomap/badge.svg?branch=master)](https://coveralls.io/github/Artsdatabanken/ecomap?branch=master)
![Dependencies](https://david-dm.org/artsdatabanken/ecomap.svg)
[![Greenkeeper badge](https://badges.greenkeeper.io/Artsdatabanken/ecomap.svg)](https://greenkeeper.io/)
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Join the chat at https://gitter.im/Artsdatabanken/ecomap](https://badges.gitter.im/Artsdatabanken/ecomap.svg)](https://gitter.im/Artsdatabanken/ecomap?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![contributions welcome](https://camo.githubusercontent.com/926d8ca67df15de5bd1abac234c0603d94f66c00/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f6e747269627574696f6e732d77656c636f6d652d627269676874677265656e2e7376673f7374796c653d666c6174)](https://github.com/Artsdatabanken/ecomap/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

[![Screenshot](doc/screenshot.png "Ecomap screenshot")](http://outgoing-front.surge.sh/)

# Ecomap
Ecological maps

Brief description

* [Demo](http://outgoing-front.surge.sh/)
* [Storybook](http://outgoing-front.surge.sh/storybook)

## Getting started / Installing

Clone the repo and then run:

```javascript
yarn
```

to install dependencies.  Or if using npm: `npm install`

```javascript
yarn start
```

to start Ecomap.  It should automatically open in a new browser tab.  Or with npm: `npm start`

## Developing
### Built With

 * [mapbox-gl-js](https://github.com/mapbox/mapbox-gl-js)
 * [material-ui](https://github.com/callemall/material-ui)
 * [react](https://github.com/facebook/react)

### Prerequisites

 * [npm](https://nodejs.org/en/download/) or [yarn](https://yarnpkg.com/en/)

### Setting up Dev

```javascript
git clone https://github.com/Artsdatabanken/ecomap.git
cd ecomap/
yarn
```

### Building
```javascript
yarn build
```
### Deploying / Publishing

Builds are triggered for each commit.  Deployment is done automtically by travis on a successful build.

### Versioning

We use [SemVer 2.0](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](https://github.com/artsdatabanken/ecomap/blob/master/tags).

### Configuration

### Tests

We use [jest](https://facebook.github.io/jest/) for testing.  To run the tests run:

```javascript
yarn test
```
### Style guide

We use [JavaScript Stanard Style](https://standardjs.com/). Run

```javascript
standard --fix
```

to automatically fix most style issues.  The remaining will be listed.  Style is checked on commit.

### Api Reference

### Database

### Licensing

MIT

