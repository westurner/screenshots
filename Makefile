
default: build

install_osx:
	brew install phantomjs

build:
	time phantomjs ./phantomjs_page_screens.js


