# features

1. all social handles at one central location
2. one id to reach this central location
3. ids to be presented as list
4. dropdown to select which social handle to add
5. have 'others' in option in the dropdown to provide link to other handles
6. reorder the links

### handles dropdown:

1. youtube
2. twitter
3. facebook
4. instagram
5. linkedin
6. github
7. portfolio
8. blog
9. email
10. pinterest
11. reddit
12. snapchat
13. others

### Sign up screen:

1. show option to connect wallet(signup)
2. search bar to search for existing users

### Homepage:

1. option to search

# Notes:

- to add react:

  - this creates react project at current location
    `npx create-react-app@latest .`

- to make typescript work

  - install ts dependecies:
    `npm install --save typescript @types/node @types/react @types/react-dom @types/jest`
  - initialize ts config:
    `npx tsc --init`
  - add the following compilerOption in tsconfig.json:
    `"jsx": "react"`

- Webpack 5 no longer do auto-polyfilling for node core modules.

  - install following dependency
    `npm install node-polyfill-webpack-plugin`
  - make the following change in node_modules/react-scripts/config/webpack.config.js

    ```
    const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

    module.exports = {
      return {
        // Other rules...
        plugins: [
        new NodePolyfillPlugin()
        ]
      }

    }
    ```

  - add config-overrides.js

    ```
    const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

    module.exports = function override(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

        return config;

    }

    ```
