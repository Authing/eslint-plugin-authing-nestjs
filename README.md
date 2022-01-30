# eslint-plugin-authing-nestjs

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
    // It is forbidden to use parameters in the @Body
    'authing-nestjs/forbid_body_parameters': 'warn',

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
