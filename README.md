# create-defts

🚀 Create a project using TypeScript as the default language.

English | [简体中文](./README_zh.md)

It is evident that this is a Nodejs-based scaffolding tool designed to help you quickly create a project developed using the TypeScript language.

- All projects default to using TypeScript instead of JavaScript.

- Multiple project types are available, such as: `CLI(command-line tool)` and `Library(tool library)`

- Based on [@hacxy/eslint-config](https://github.com/hacxy/eslint-config) and uses a unified coding style.

- Default to validating git commit messages, use `npm run commit` to generate fixed-format commit messages.

- Default to providing a release script and automatically creating a GitHub release, execute `npm run release` to complete the release process.

![](https://raw.githubusercontent.com/hacxy/hacxy/main/images/Kapture%202024-12-16%20at%2015.19.44.gif)

## Prerequisites

- nodejs >= 18

## Usage

Using npm:

```sh
npm create defts@latest
```

Using yarn:

```sh
yarn create defts
```

Using pnpm:

```sh
pnpm create defts
```

Using bun:

```sh
bun create defts
```

Please follow the prompts after execution.

---

You can also specify the project name and required project template directly through additional command-line options. For example, to build a CLI project, run:

```sh
# npm 7+, an additional double dash is required:

npm create defts@latest my-cli-app -- --template cli-tsup

# yarn:

yarn create defts my-cli-app --template cli-tsup

# pnpm:

pnpm create defts my-cli-app --template cli-tsup

# bun:

bun create defts my-cli-app --template cli-tsup
```

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Hacxy](https://github.com/hacxy)
