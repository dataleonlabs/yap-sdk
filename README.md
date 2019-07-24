# YAP SDK for JavaScript

The official YAP SDK for JavaScript, available for browsers and or Node.js backends

## Installing

##### With yarm
```
    yarn add yap-sdk
```

##### With npm
```
    npm install yap-sdk
```

## Usage and Getting Started

### Usage with TypeScript
The YAP SDK for JavaScript bundles TypeScript definition files for use in TypeScript projects and to support tools that can read `.d.ts` files.
Our goal is to keep these TypeScript definition files updated with each release for any public api.

#### Pre-requisites
Before you can begin using these TypeScript definitions with your project, you need to make sure your project meets a few of these requirements:

 * Use TypeScript v2.x
 * Includes the TypeScript definitions for node. You can use npm to install this by typing the following into a terminal window:

    ```sh
    npm install --save-dev @types/node
    ```

 * If you are targeting at es5 or older ECMA standards, your `tsconfig.json` has to include `'es5'` and `'es2015.promise'` under `compilerOptions.lib`.
 See [tsconfig.json](https://github.com/youngapp/yap-sdk-js/blob/master/ts/tsconfig.json) for an example.

#### In the Browser
To use the TypeScript definition files with the global `YAP` object in a front-end project, add the following line to the top of your JavaScript file:

```javascript
/// <reference types="yap-sdk" />
```

This will provide support for the global `YAP` object.

### In Node.js
To use the TypeScript definition files within a Node.js project, simply import `yap-sdk` as you normally would.

In a TypeScript file:

```javascript
// import entire SDK
import YAP from 'yap-sdk';
// import individual service
import { APIGateway } from 'yap-sdk';
```

In a JavaScript file:

```javascript
// import entire SDK
const YAP = require('yap-sdk');
// import individual service
const { APIGateway } = require('yap-sdk');
```

## Opening Issues
If you encounter a bug with the YAP SDK for JavaScript we would like to hear
about it. Search the [existing issues](https://github.com/youngapp/yap-sdk-js/issues)
and try to make sure your problem doesn’t already exist before opening a new
issue. It’s helpful if you include the version of the SDK, Node.js or browser
environment and OS you’re using. Please include a stack trace and reduced repro
case when appropriate, too.

The GitHub issues are intended for bug reports and feature requests. For help
and questions with using the YAP SDK for JavaScript please make use of the
resources listed in the [Getting Help](https://github.com/youngapp/yap-sdk-js#getting-help)
section. There are limited resources available for handling issues and by
keeping the list of open issues lean we can respond in a timely manner.

## License

This SDK is distributed under the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0),
see LICENSE.txt and NOTICE.txt for more information.
