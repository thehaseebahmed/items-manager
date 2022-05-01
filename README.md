<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h2 align="center">Technical Test - Items Manager</h3>

  <p align="center">
    <a href="http://demos.thehaseebahmed.com/items-manager">View Demo</a>
  </p>
  <br />
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#problem-statement">Problem Statement</a>
    </li>
    <li>
      <a href="#solution">Solution</a>
      <ul>
        <li><a href="#assumptions">Assumptions</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#development-server">Development Server</a></li>
        <li><a href="#unit-tests">Unit Tests</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## Problem Statement

You'll develop a single page application that provides the functionality defined by the needs of the following user:

As a user I want to have access to an Item Manager where I can search items given the following criteria:

- Title
- Description
- Price
- Email

Each item will have these fields and a picture.

When I perform a search that has results, I’d like to view a list of the items showing all the information. The app must provide me the ability to sort the listed items by title, description, price or email.

Also, I want to be able to have a favourite items list, so I must be able to select the items from the list and save them on my favourite list. The list should be displayed on a modal containing all those items showing only the picture and the title. The modal should be opened by clicking on a button displayed in some place on the page where it’s easily accessible. In the favourite modal, I want to be able to search by title and the possibility to remove the items from the favourite list without having to close the modal. I don’t want the favorite items to be preserved when I refresh the page.

The data that holds the items contains 20 items. The 20 items should NOT be displayed all at once. I’d like to see 5 items each time (with an initial load of 5 when the page is loaded), so some pagination method should be implemented to view the remaining items (clicking a button, with endless scroll...it’s up to you).

<p align="right">(<a href="#top">back to top</a>)</p>

## Solution

### Assumptions
Following assumptions were made when building this POC (proof of concept).

- Provided S3 endpoint does not support server-side filtering therefore filtering would have to be done in memory.

### Built With

This project uses the following set of frameworks & libraries:

- [Angular](https://angular.io/)
- [Fuse.js](https://fusejs.io/)
- [Istanbul JS](https://istanbul.js.org/)
- [Jasmine](https://jasmine.github.io/)
- [Karma](https://karma-runner.github.io/)
- [Less CSS](https://lesscss.org/)
- [NGXS](https://www.ngxs.io/)
- [TypeScript](https://www.typescriptlang.org/)

### Features

#### Responsive Design

![responsive-design]

#### 85%+ Code Coverage

![coverage-screenshot]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- Node JS
  - You can download and install the lastest version from the [official website]().
- Angular CLI
  - Run the following command in your console to install Angular CLI globally on your development machine.
  ```sh
  npm install -g @angular/cli
  ```

### Development Server

1. Clone the repo
   ```sh
   git clone https://github.com/thehaseebahmed/ng-items-manager.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the dev server
   ```sh
   npm run start
   ```

### Unit Tests

To execute the unit tests via [Karma](https://karma-runner.github.io), run the following command.

```sh
npm run test
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Haseeb Ahmed - [@thehaseebahmed](https://twitter.com/thehaseebahm3d) - thehaseebahmed@outlook.com

Project Link: [https://github.com/thehaseebahmed/ng-items-manager.git](https://github.com/thehaseebahmed/ng-items-manager.git)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-url]: https://github.com/thehaseebahmed/ng-items-manager/blob/main/LICENSE.txt
[coverage-screenshot]: docs/code_coverage.jpeg
[responsive-design]: docs/responsive_design.png
