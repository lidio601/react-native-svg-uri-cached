CURRENT_DIR = ${CURDIR}
PACKAGE_BIN = node_modules/.bin
SRC_DIR = $(CURRENT_DIR)/src
PRODUCTION_DIR = $(CURRENT_DIR)/dist

default: help
setup: install ## Base first-time install of project locally
install: ## Install dependencies
	cd $(CURRENT_DIR); yarn install;
clean: ## Remove all built files
	rm -rf $(PRODUCTION_DIR);
build-patch: ## output a new patch version
	cd $(CURRENT_DIR); make build; git add dist; yarn version --patch;
build: clean prettier ## Builds the app for production to the `dist` folder.
	cd $(CURRENT_DIR);
prettier: ## Run [ESLint](https://eslint.org/)
	cd $(CURRENT_DIR); $(PACKAGE_BIN)/eslint --fix "{.storybook,src,__{tests,mocks}__}/**/*.{js,jsx,ts,tsx,css,scss,json}";
test: ## Launches the test runner.
	cd $(CURRENT_DIR); yarn test;
test-build: ## Try to compile
	cd $(CURRENT_DIR); $(PACKAGE_BIN)/tsc --noEmit;
help: ## Display a list of commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
publish: ## Publish on NPM
	npm publish --tag latest --access public .;
