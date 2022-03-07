#!/bin/bash

while getopts "f:" opt
do
   case "$opt" in
      f ) fileParameter="$OPTARG" ;;
   esac
done

cd "${BASH_SOURCE%/*}/../build/prod/platform.alexa"
if [ -z "$fileParameter" ]
then
  for file in ../../../test/alexa/dialog-replays/*; do
    ask dialog -r $file
  done
  exit 1
fi

ask dialog -r ../../../test/alexa/dialog-replays/$fileParameter.json



