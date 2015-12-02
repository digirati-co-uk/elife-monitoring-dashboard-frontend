## Monitoring Dashboard

### installing

after cloning or downloading and extracting, from the root of the project:
* ```npm install```
* ```mkdir public```
* ```cp -r core/styleguide/ public/styleguide/```
* ```php core/builder.php -g```

then see [patternlab readme](patternlab-README.md)


### running

* in different terminal windows
* cd into root ```php core/builder.php -wr``` to autoload on file changes
* cd into root ```grunt``` to run build task
* cd into /public ```php -S localhost:8000```


if you'd like to  test the publishing process:
* in the public folder start a php server 

```bash
'php -S localhost:8000'
```

 (change port if in conflict)

* optionally run a watch and reload task 'php core/builder.php -wr'. See [advanced auto generate](http://patternlab.io/docs/advanced-auto-regenerate.html)

alternatively if you'd just like to view the Patterns in the library, open 'public/index.html'
