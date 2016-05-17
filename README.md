# Monitoring Dashboard

This is the UI components for the eLife monitoring dashboard. The eLife dashboard is comprised of three parts.

1. [UX Pin](https://live.uxpin.com/593d5793b51645bc5dfb5a0a5ab7629065ef1743#/pages/22041535/sitemap) defines the UX and interactions
1. [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend) the front end code describing the UI (but not to include any behaviour)
1. [Dashboard](https://github.com/elifesciences/elife-dashboard) this is the actual implementation of the front end functionality using the patterns from PatternLab.

New front end features should be developed in the [Dashboard](https://github.com/elifesciences/elife-dashboard) and copied back into the [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend)

# Things to ensure when developing

* The [Dashboard](https://github.com/elifesciences/elife-dashboard) contains **all** interactions, before developing a new UI feature check that the ```/libs``` and ```/js``` folders are up to date.
* Also ensure ```/scss``` folder is up to date
* **Develop new features in the [Dashboard](https://github.com/elifesciences/elife-dashboard), the task will not be considered complete until any UI changes and all updated javascript has been copied back into the [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend)**


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

* ```npm start``` to start php server
* ```grunt``` in new terminal window to start build, and live reload.
* run test services.
* Start Live Reload in your browser (if required)


---

# Documentation

* Atoms, Molecules, Organisms, Templates are all 'static' html. Pages are entirely controlled by the javascript, making any changes to the html in the js templates will need to be copied over into the static versions.
* For more information about pattern lab see the [patternlab readme](patternlab-README.md)
* The below notes are taken from [Atomic web design](http://bradfrost.com/blog/post/atomic-web-design/)

## Atoms
Good as a reference in the context of a pattern library as you can see all your global styles laid out at a glance.
* HTML tags, form labels, inputs, buttons. 
* More abstract elements, colour palettes, fonts even animations

## Molecules
Groups of atoms bonded together. Are the **smallest fundamental units of a compound**

A form label, input or button aren’t useful by themselves, but combine them together as a form and now they can actually do something together.

Building up to molecules from atoms encourages a “do one thing and do it well” mentality. While molecules can be complex, as a rule of thumb they are relatively simple combinations of atoms built for reuse.

## Organisms
Molecules give us some building blocks to work with, and we can now combine them together to form organisms. Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface.

We’re starting to get increasingly concrete. A client might not be terribly interested in the molecules of a design system, but with organisms we can see the final interface beginning to take shape.

Organisms can consist of similar and/or different molecule types. For example, a masthead organism might consist of diverse components like a logo, primary navigation, search form, and list of social media channels. But a “product grid” organism might consist of the same molecule (possibly containing a product image, product title and price) repeated over and over again.

Building up from molecules to organisms encourages creating standalone, portable, reusable components.

## Templates
Because this stage is where different layouts might be used. 

At the template stage, we break our chemistry analogy to get into language that makes more sense to our clients and our final output. 

Templates consist mostly of groups of organisms stitched together to form pages. It’s here where we start to see the design coming together and start seeing things like layout in action.

Templates are very concrete and provide context to all these relatively abstract molecules and organisms. Templates are also where clients start seeing the final design in place. 

## Pages
Pages are specific instances of templates. Here, placeholder content is replaced with real representative content to give an accurate depiction of what a user will ultimately see.

It’s typically where most people in the process spend most of their time and what most reviews revolve around.

The page stage is where we test the effectiveness of the design system. Viewing everything in context allows us to loop back to modify our molecules, organisms, and templates to better address the real context of the design.

Pages are also the place to test variations in templates. For example, you might want to articulate what a headline containing 40 characters looks like, but also demonstrate what 340 characters looks like. 

