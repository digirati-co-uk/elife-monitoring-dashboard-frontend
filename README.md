# [eLife Dashboard Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend)

This is the eLife Dashboard Pattern Library

This document covers the setup of the pattern library, it is based on [patternlab](http://patternlab.io/).

## Table of Contents


* [Requirements](#requirements)
* [Quick start](#quick-start)
* [Documentation](#documentation)
* [Maintaining Dashboard and Pattern Library](#maintaining-dashboard-and-pattern-library)
* [Atomic Design](#atomic-design)
* [License](#license)



## Requirements:

* [Homebrew](http://brew.sh/) (OSX only)
* [Node](https://nodejs.org/en/)
* [Live Reload](http://livereload.com/) - [Chrome plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) (optional)



## Quick Start

* Install dependencies 

```bash
npm install
```

* Start server

```bash
grunt shell:serve
```

* Build assets

```bash
grunt
```

* Build assets, start live reload and watch

```bash
grunt dev
```






## Documentation


The front end workflow for the eLife dashboard is comprised of three parts.

1. [UX Pin](https://live.uxpin.com/593d5793b51645bc5dfb5a0a5ab7629065ef1743#/pages/22041535/sitemap): defines the UX and interactions
1. [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend): the front end code describing the UI (but not to include any behaviour)
1. [The Dashboard](https://github.com/elifesciences/elife-dashboard): the actual implementation of the front end functionality using the patterns from PatternLab.

![Dashboard Feature Lifecycle](docs/DashboardFeatureLifecycle_20160921.png)



## Maintaining Dashboard and Pattern Library


### Copying [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend) into [Dashboard](https://github.com/elifesciences/elife-dashboard)

* Copies ```libs```, ```css```, ```images``` and ```fonts``` from the pattern portfolio to the dashboard.
* **Does not copy the html**, this will need to be copied over manually.

 ```sh
 bash -x copytodashboard.sh ~/Projects/eLife/elife-dashboard
 ```


### Copying [Dashboard](https://github.com/elifesciences/elife-dashboard) back into the [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend)


* Copies any files in ```DASHBOARD_PATH/libs``` to the pattern portfolio ```assets/libs/```

 ```sh
 bash -x copyfromdashboard.sh ~/Projects/eLife/elife-dashboard
 ```
 



# Atomic Design

* Atoms, Molecules, Organisms, Templates are all 'static' html. Pages are entirely controlled by the javascript, making any changes to the html in the js templates will need to be copied over into the static versions.
* For more information about pattern lab see the [patternlab readme](patternlab-README.md)
* The summarised notes below are taken from [Atomic web design](http://bradfrost.com/blog/post/atomic-web-design/)

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


## License

MIT Licensed. See [LICENSE](LICENSE)










