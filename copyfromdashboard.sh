#!/bin/bash
#set -x

# ./copyfromdashboard.sh DASHBOARD
# ./copyfromdashboard.sh ~/Projects/eLife/elife-dashboard/

#DASHBOARD="~/Projects/eLife/elife-dashboard/"
DASHBOARD=$1

cp -rp "$DASHBOARD/assets/libs/" assets/libs
grunt