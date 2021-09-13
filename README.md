
<p align="center">
	<a href="https://envuso.com" target="_blank"><img src="https://envuso.com/assets/logo.svg" width="300"></a>
</p>

<p align="center">
    <a href="https://oclif.io" target="_blank"><img alt="oclif" src="https://img.shields.io/badge/cli-oclif-brightgreen.svg">    </a>
    <a href="https://npmjs.org/package/@envuso/cli" target="_blank">
        <img alt="Version" src="https://img.shields.io/npm/v/@envuso/cli.svg">
    </a>
    <a href="https://npmjs.org/package/@envuso/cli" target="_blank">
        <img alt="Downloads/week" src="https://img.shields.io/npm/dw/@envuso/cli.svg">
    </a>
    <a href="https://github.com/@envuso/cli/blob/master/package.json" target="_blank">
        <img alt="License" src="https://img.shields.io/npm/l/@envuso/cli.svg">
    </a>
</p>


## Envuso CLI

Envuso CLI, make a project, generate framework files etc

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @envuso/cli
$ envuso COMMAND
running command...
$ envuso (-v|--version|version)
@envuso/cli/0.1.7 darwin-arm64 node-v16.0.0
$ envuso --help [COMMAND]
USAGE
  $ envuso COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`envuso autocomplete [SHELL]`](#envuso-autocomplete-shell)
* [`envuso commands`](#envuso-commands)
* [`envuso generate-app-key`](#envuso-generate-app-key)
* [`envuso help [COMMAND]`](#envuso-help-command)
* [`envuso make:controller NAME`](#envuso-makecontroller-name)
* [`envuso make:middleware NAME`](#envuso-makemiddleware-name)
* [`envuso make:model NAME`](#envuso-makemodel-name)
* [`envuso new`](#envuso-new)

## `envuso autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ envuso autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ envuso autocomplete
  $ envuso autocomplete bash
  $ envuso autocomplete zsh
  $ envuso autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.3.0/src/commands/autocomplete/index.ts)_

## `envuso commands`

list all the commands

```
USAGE
  $ envuso commands

OPTIONS
  -h, --help              show CLI help
  -j, --json              display unfiltered api data in json format
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --hidden                show hidden commands
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --sort=sort             property to sort by (prepend '-' for descending)
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v1.3.0/src/commands/commands.ts)_

## `envuso generate-app-key`

Generate a new app encryption key

```
USAGE
  $ envuso generate-app-key

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ envuso generate-app-key
```

_See code: [lib/commands/generate-app-key.js](https://github.com/envuso/cli/blob/v0.1.7/lib/commands/generate-app-key.js)_

## `envuso help [COMMAND]`

display help for envuso

```
USAGE
  $ envuso help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `envuso make:controller NAME`

Create a controller

```
USAGE
  $ envuso make:controller NAME

ARGUMENTS
  NAME  Set a name for your controller(Does not need to contain "Controller" this will be automatically added.)

OPTIONS
  -f, --force        Force create the controller, even if it exists.
  -h, --help         show CLI help
  -m, --model=model  Create a resource controller using your model
  -r, --resource     Create a resource controller(Controller using GET, PUT, POST, PATCH, DELETE)

EXAMPLES
  $ envuso make:controller User
  $ envuso make:controller User --resource
  $ envuso make:controller User --resource --model=User
```

_See code: [lib/commands/make/controller.js](https://github.com/envuso/cli/blob/v0.1.7/lib/commands/make/controller.js)_

## `envuso make:middleware NAME`

Create a middleware

```
USAGE
  $ envuso make:middleware NAME

ARGUMENTS
  NAME  Set a name for your middleware(Does not need to contain "Middleware" this will be automatically added.)

OPTIONS
  -f, --force  Force create the controller, even if it exists.
  -h, --help   show CLI help

EXAMPLE
  $ envuso make:middleware User
```

_See code: [lib/commands/make/middleware.js](https://github.com/envuso/cli/blob/v0.1.7/lib/commands/make/middleware.js)_

## `envuso make:model NAME`

Create a middleware

```
USAGE
  $ envuso make:model NAME

ARGUMENTS
  NAME  Set a name for your middleware(Does not need to contain "Model" this will be automatically added.)

OPTIONS
  -f, --force  Force create the controller, even if it exists.
  -h, --help   show CLI help

EXAMPLE
  $ envuso make:middleware User
```

_See code: [lib/commands/make/model.js](https://github.com/envuso/cli/blob/v0.1.7/lib/commands/make/model.js)_

## `envuso new`

Create a new project

```
USAGE
  $ envuso new

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ envuso new
```

_See code: [lib/commands/new.js](https://github.com/envuso/cli/blob/v0.1.7/lib/commands/new.js)_
<!-- commandsstop -->
