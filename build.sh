#!/bin/bash

yarn unbuild \
  && ENV=dev tsc --declaration \
  && cp *.json dist/  \
  && cp -R src/lib dist/src/lib/
