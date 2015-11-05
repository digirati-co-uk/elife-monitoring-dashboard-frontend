## Monitoring Dashboard

### installing 

after cloning or downloading and extracting, from the root of the project:
* mkdir public
* cp -r core/styleguide/ public/styleguide/
* php core/builder.php -g

then see [patternlab readme](patternlab-README.md)

### running

if you'd like to contribute to the repo it would make sense to run a watch and reload task as follows:
* in the project folder start a php server 'php -S localhost:8000' (change port if in conflict)
* and then run 'php core/builder.php -wr' & see [advanced auto generate](http://patternlab.io/docs/advanced-auto-regenerate.html)

else if you'd just like to view the Pattern Library in your project folder you should open 'public/index.html'