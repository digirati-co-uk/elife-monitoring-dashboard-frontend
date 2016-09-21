#!/bin/bash
#set -x

# ./copyfromdashboard.sh DASHBOARD
# ./copyfromdashboard.sh ~/Projects/eLife/elife-dashboard/

#DASHBOARD="~/Projects/eLife/elife-dashboard/"
DASHBOARD=$1

cp -rp assets/libs/ "$DASHBOARD/assets/libs/"
cp -rp source/css/ "$DASHBOARD/dashboard/static/css/"
cp -rp source/images/ "$DASHBOARD/dashboard/static/images/"
cp -rp source/fonts/ "$DASHBOARD/dashboard/static/fonts/"