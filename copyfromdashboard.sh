#!/bin/bash
#set -x

# ./copyfromdashboard.sh DASHBOARD
# ./copyfromdashboard.sh ~/Projects/eLife/elife-dashboard/

#DASHBOARD="~/Projects/eLife/elife-dashboard/"
DASHBOARD=$1

cp -rp "$DASHBOARD/assets/scss/" assets/scss
cp -rp "$DASHBOARD/dashboard/static/css/" source/css
cp -rp "$DASHBOARD/dashboard/static/images/" source/images
cp -rp "$DASHBOARD/dashboard/static/fonts/" source/fonts