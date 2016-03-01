#!/bin/sh
DIR="$( cd "$( dirname "$0" )" && pwd )"
php -S localhost:8000 -t $DIR/public/