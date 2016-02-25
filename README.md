# Monitoring Dashboard

---

# Requirements:

* [Homebrew](http://brew.sh/) (OSX only)
* [Node](https://nodejs.org/en/)
* PHP
* [Live Reload](http://livereload.com/) - [Chrome plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
* [Dashboard Test Services](https://github.com/elifesciences/elife-dashboard)

---

# Installation

**On First Installation**
* Install node, if on OSX run ```brew install node```
* Install ```npm install```
* Setup test services, see [Dashboard Test Services](https://github.com/elifesciences/elife-dashboard)


---

# Development

* Ensure Live Reload is running.
* ```npm start``` to start php server
* ```grunt``` to start build, and live reload.
* run test services.
* Atoms, Molecules, Organisms, Templates are all 'static' html. Pages are entirely controlled by the JS, making any changes to the html in the js templates will need to be copied over into the static versions.


---

# Documentation

See [patternlab readme](patternlab-README.md)
