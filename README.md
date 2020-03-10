## Automation Execution for the internet

### Installation

To install the libraries needed to execute these test you will need:

- Node.js >= 12.14.0 (for development)
- Yarn (latest) (for development)
- GNUMake (latest)
- Docker (latest)

### Execution of Suite

To make test execute you can either run the convinient `make all` command (which provisions, runs tests, then cleans images) OR you can run `make privision` to bring up your local selenium grid then `make test` to run your tests. The output will be in `spec` format (junit parsing will be implemented at a later time).

#### Under the hood (and running manually)

We are using [`yarn`](https://yarnpkg.com/) as our package manager. Running `yarn` in the repository will install all the dependencies needed for these tests. To run the tests manually (outside of the docker ecosystem) you will want to open a new terminal for this repository and run `yarn selenium-standalone install` then `yarn selenium-standalone start`. This will start a local selenium docker server which can be canceled out by running `CTRL+C` (if not, this will live in the background forever). With that in your background you can then run `yarn wdio` to execute the tests under `test/specs/**/*.ts`.

## Contributing

### Webdriver.io

The framework is written with [Webdriver.io](https://webdriver.io/) which is a wrapper for selenium that allows the developer to use syntactical sugar for quicker development. The [guide](https://webdriver.io/docs) and [api docs](https://webdriver.io/docs/api.html) can tell you more about the framework, but the most important poart is the separation of concerns.

#### Page Object Modeling

The Page Object Model allows us to maintain code in a cleaner fashion. What does this entail? Each class is a logical representation of the page, with elements set and actionable functions available to call. Here is a quick example of a Page Object Model using Typescript and WDIO from the repo:


```typescript
import BasePage from 'src/page/base.page'

class AddRemovePage extends BasePage {

  private addNode = () => $('[onclick="addElement()"]');
  private deleteNodes = () => $$('.added-manually');

  public get open(): void {
    return browser.url('/add_remove_elements/');
  }

  public get deleteNodeCount(): number {
    return this.deleteNodes().length;
  }

  public add(attempts) {
    for (let index = 0; index < attempts; index++) {
      this.addNode().click();
    }
  }
}

export default new AddRemovePage();
```

In our implementation, the element is an anonymous function (assigned to a variable) that can be called later on. Typically you will see either just the selector or a fully fledged function. This allows us ease of executing the code when it is needed. You will also see the use of a `BasePage` which is an abstract class that will help in structuring all our page objects.

### Mocha.js

We define our tests with [mocha.js](https://mochajs.org/), a test framework that makes testing simple. Here is an example test (from the repo):

```typescript
import { expect } from 'chai';
import AddRemovePage from 'src/page/addremove.page'

describe('Add and Remove Page', () => {
  describe('Add one delete button', () => {
    it('should only show one new delete button', () => {
      AddRemovePage.open;
      AddRemovePage.add(1);
      expect(AddRemovePage.deleteNodeCount).to.be.equal(1);
    });
  });
});

```

The code for page objects and steps are written in [typescript](https://www.typescriptlang.org/) which compiles down to Javascript. We want to ensure each commit has the best quality possible, so for now please run `yarn lint . --ext .ts` against the codebase to ensure nothing outside of the acceptable config goes in. In the future this will be part of git hooks.
