PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash

buildtest:
	npm install && NODE_ENV=test npm run build

build:
	npm install && NODE_ENV=production npm run build