PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash

build:
	npm install && npm run build