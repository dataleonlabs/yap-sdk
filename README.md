# YAP SDK for JavaScript

The official YAP SDK for JavaScript, available for browsers and or Node.js backends

## Installing

### In the Browser

To use the SDK in the browser, simply add the following script tag to your
HTML pages:

    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.494.0.min.js"></script>

You can also build a custom browser SDK with your specified set of YAP services.
This can allow you to reduce the SDK's size, specify different API versions of
services, or use YAP services that don't currently support CORS if you are
working in an environment that does not enforce CORS. To get started:

http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/building-sdk-for-browsers.html

The YAP SDK is also compatible with [browserify](http://browserify.org).

### In Node.js

The preferred way to install the YAP SDK for Node.js is to use the
[npm](http://npmjs.org) package manager for Node.js. Simply type the following
into a terminal window:

```sh
npm install yap-sdk
```

## Usage and Getting Started

You can find a getting started guide at:

http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide


## Usage with TypeScript
The YAP SDK for JavaScript bundles TypeScript definition files for use in TypeScript projects and to support tools that can read `.d.ts` files.
Our goal is to keep these TypeScript definition files updated with each release for any public api.

### Pre-requisites
Before you can begin using these TypeScript definitions with your project, you need to make sure your project meets a few of these requirements:

 * Use TypeScript v2.x
 * Includes the TypeScript definitions for node. You can use npm to install this by typing the following into a terminal window:

    ```sh
    npm install --save-dev @types/node
    ```

 * If you are targeting at es5 or older ECMA standards, your `tsconfig.json` has to include `'es5'` and `'es2015.promise'` under `compilerOptions.lib`.
 See [tsconfig.json](https://github.com/youngapp/yap-sdk-js/blob/master/ts/tsconfig.json) for an example.

### In the Browser
To use the TypeScript definition files with the global `YAP` object in a front-end project, add the following line to the top of your JavaScript file:

```javascript
/// <reference types="yap-sdk" />
```

This will provide support for the global `YAP` object.

### In Node.js
To use the TypeScript definition files within a Node.js project, simply import `aws-sdk` as you normally would.

In a TypeScript file:

```javascript
// import entire SDK
import YAP from 'yap-sdk';
// import YAP object without services
import YAP from 'yap-sdk/global';
// import individual service
import S3 from 'yap-sdk/clients/s3';
```

In a JavaScript file:

```javascript
// import entire SDK
var YAP = require('yap-sdk');
// import YAP object without services
var YAP = require('yap-sdk/global');
// import individual service
var S3 = require('yap-sdk/clients/s3');
```

### With React

To create React applications with YAP SDK, you can use [YAP Amplify Library](https://aws.github.io/aws-amplify/media/react_guide?utm_source=aws-js-sdk&utm_campaign=react) which provides React components and CLI support to work with YAP services.


### Known Limitations
There are a few known limitations with the bundled TypeScript definitions at this time:

 * Service client typings reflect the latest `apiVersion`, regardless of which `apiVersion` is specified when creating a client.
 * Service-bound parameters use the `any` type.

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

## Supported Services

Please see [SERVICES.md](https://github.com/youngapp/yap-sdk-js/blob/master/SERVICES.md) for a list of supported services.

## License

This SDK is distributed under the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0),
see LICENSE.txt and NOTICE.txt for more information.
