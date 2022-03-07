#!/bin/bash
cd "${BASH_SOURCE%/*}/../build/prod/platform.alexa"
for file in ../../../test/alexa/dialog-replays/*; do
  ask dialog -r $file -s amzn1.ask.skill.db94a83e-4fe1-4dcc-87ae-afb9535d8e6e
done