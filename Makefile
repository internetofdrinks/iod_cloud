# Arguments
#   ENV=development|production - Default: production

# Paths ------------------------------------------------------------------------
NPM = node_modules
BIN = $(NPM)/.bin
SRC = frontend
DIST = $(SRC)/dist
PUB = public
ENV = production

# Static assets ----------------------------------------------------------------
IMG_SRC = $(SRC)/images
FONTS_SRC = $(SRC)/fonts

# Browserify configuration -----------------------------------------------------
JS_SRC = $(SRC)/javascripts
JS_DIST = $(DIST)/javascripts

BROWSERIFY_TARGET_FLAGS = \
	-t [ babelify ] \
	-t [ envify --NODE_ENV $(ENV) ]

BROWSERIFY_LIBS = \
	babel-polyfill \
	jquery \
	lodash \
	react \
	react-dom

# Sass configuration -----------------------------------------------------------
SASS_SRC = $(SRC)/stylesheets
SASS_DIST = $(DIST)/stylesheets
SASS_ENTRIES = $(SASS_SRC)/app.scss
SASS_TARGETS = $(SASS_ENTRIES:$(SASS_SRC)/%.scss=$(SASS_DIST)/%.css)
SASS_FLAGS = --include-path node_modules --source-map true --precision 8

# Targets ----------------------------------------------------------------------
.PHONY: clean build build_js build_sass watch_js watch_sass fonts images

all: clean build fonts images

$(DIST): $(JS_DIST) $(SASS_DIST)

$(JS_DIST):
	@mkdir -p $(JS_DIST)

$(SASS_DIST):
	@mkdir -p $(SASS_DIST)

build: build_js build_sass

build_js: $(JS_DIST)/deps.js $(JS_DIST)/app.js

$(JS_DIST)/deps.js: package.json $(JS_DIST)
	@$(BIN)/browserify -S $(addprefix -r ,$(BROWSERIFY_LIBS)) $(addprefix -r ,$(BROWSERIFY_LIBS)) > $@

$(JS_DIST)/app.js: $(JS_SRC)/app.js $(JS_DIST)
	@$(BIN)/browserify -d $(BROWSERIFY_TARGET_FLAGS) $(addprefix -x ,$(BROWSERIFY_LIBS)) -e $< | $(BIN)/exorcist $@.map > $@

watch_js: $(JS_DIST)/deps.js
	@$(BIN)/watchify $(JS_SRC)/app.js -$(BROWSERIFY_TARGET_FLAGS) $(addprefix -x ,$(BROWSERIFY_LIBS)) -v -d -o $(JS_DIST)/app.js

build_sass: $(SASS_TARGETS)

$(SASS_TARGETS): $(SASS_DIST)
	@$(BIN)/node-sass $(SASS_FLAGS) $(SASS_SRC) -o $(SASS_DIST)

watch_sass: $(SASS_DIST)
	@$(BIN)/node-sass -w $(SASS_FLAGS) $(SASS_SRC) -o $(SASS_DIST)

fonts:
	@cp -R $(FONTS_SRC) $(PUB)

images:
	@cp -R $(IMG_SRC) $(PUB)

clean:
	@rm -rf $(DIST)
