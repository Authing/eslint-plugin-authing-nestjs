# @authing/eslint-plugin-authing-nestjs

eslint plugin for nestjs

## INSTALL

```shell
npm install --save-dev eslint-plugin-authing-nestjs
```

## USAGE

Configure it in your [configuration file](https://eslint.org/docs/user-guide/configuring/):

- Add to `plugins` section:

- Add to `extends` or `rules` section:

``` javascript
module.exports = {
  plugins: ['authing-nestjs'],
  extends: [
    'plugin:authing-nestjs/recommended'
  ],
  rules: {
    'authing-nestjs/forbid_body_parameters': 'warn',
    'authing-nestjs/forbid_read_body_from_req': 'warn',
    'authing-nestjs/use_class_as_type_in_method_of_controller': 'warn',
    'authing-nestjs/use_class_validator_to_dto': 'warn'
    // ... more
  }
}
```

- [Configure rules](https://eslint.org/docs/user-guide/configuring/#configuring-rules)
