# eslint-plugin-authing-nestjs

<div align=center><img width="300" src="https://files.authing.co/authing-console/authing-logo-new-20210924.svg"></div>

<div align="center">
  <a href="https://badge.fury.io/js/eslint-plugin-authing-nestjs"><img src="https://badge.fury.io/js/eslint-plugin-authing-nestjs.svg" alt="npm version" height="18"></a>
  <a href="https://github.com/Authing/eslint-plugin-authing-nestjs/actions/workflows/ci.yml" target="_blank"><img src="https://github.com/Authing/eslint-plugin-authing-nestjs/actions/workflows/ci.yml/badge.svg?branch=master"></a>
  <a href="javascript:;"><img src="https://img.shields.io/badge/test-passing-brightgreen" /></a>
  <a href="https://npmcharts.com/compare/eslint-plugin-authing-nestjs" target="_blank"><img src="https://img.shields.io/npm/dm/eslint-plugin-authing-nestjs" alt="download"></a>
  <a href="https://github.com/Authing/eslint-plugin-authing-nestjs/pulls" target="_blank"><img src="https://img.shields.io/badge/PRs-welcome-orange" alt="standardjs"></a>
  <a href="javascript:;" target="_blank"><img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="Node"></a>
  <a href="https://forum.authing.cn/" target="_blank"><img src="https://img.shields.io/badge/chat-forum-blue" /></a>
  <a href="javascript:;" target="_blank"><img src="https://img.shields.io/badge/node-%3E=12-green.svg" alt="Node"></a>
</div>
<br/>

<div>eslint-plugin-authing-nestjs is an MIT-licensed open source project for <a target="_blank" href="https://github.com/nestjs/nest">nestjs</a> framework</div>
<br/>

## Install

```shell
npm install --save-dev eslint-plugin-authing-nestjs
```

or

```shell
yarn add eslint-plugin-authing-nestjs -d
```

## Usage

Configure it in your [configuration file](https://eslint.org/docs/user-guide/configuring/):

- Add to `plugins` section:

- Add to `extends` or `rules` section:

``` javascript
module.exports = {
  plugins: ['authing-nestjs'],
  extends: [
    'plugin:authing-nestjs/recommended'
  ],
  // *** Usage: refer to unit test documents for specific rules ***
  rules: {
    // It is forbidden to use parameters in the @Body
    'authing-nestjs/forbid_body_parameters': 'warn', // or 'error'

    // It is forbidden to read body from Req
    'authing-nestjs/forbid_read_body_from_req': 'warn',

    // The parameter type annotation in the method of the controller must be a class
    'authing-nestjs/use_class_as_type_in_method_of_controller': 'warn',

    // Each dto field must have a class validator
    // There must be at least 2 class validators for a dto item with IsOptional
    'authing-nestjs/use_class_validator_to_dto': 'warn'
    
    // ... more
  }
}
```

- [Configure rules](https://eslint.org/docs/user-guide/configuring/#configuring-rules)

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/Authing/eslint-plugin-authing-nestjs/releases).
## Contribution

- Fork it
- Create your feature branch (git checkout -b my-new-feature)
- Commit your changes (git commit -am 'Add some feature')
- Push to the branch (git push -u origin my-new-feature)
- Create new Pull Request
## Help

Join us on forum: [#authing-chat](https://forum.authing.cn/)

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022 Authing
