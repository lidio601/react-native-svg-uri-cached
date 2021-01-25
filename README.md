# Logger

### How to install

Follow the steps to setup [react-native-fs](https://github.com/itinance/react-native-fs#usage-ios) and [react-native-svg](https://github.com/react-native-svg/react-native-svg#installation).

### Requirements

1. [Yarn Package Manager](https://yarnpkg.com/)
2. [Node Version Manager](https://github.com/nvm-sh/nvm)

### Local development

1. Run `nvm use`
2. Run `make setup`
3. Run `make build`

### Tasks

This project uses a [makefile](https://www.gnu.org/software/make/manual/make.html) to run commands.

| Command     | Description                                      |
| ----------- | ------------------------------------------------ |
| setup       | Base first-time install of project locally       |
| build       | Build the project                                |
| build-patch | Build the project and increase the patch version |
| prettier    | Run [ESLint](https://eslint.org/)                |
| test        | Launches the test runner                         |
| test-build  | Check for syntax errors.                         |
| help        | Display a list of commands                       |
