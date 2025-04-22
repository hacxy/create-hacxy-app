# create-defts

🚀 创建以TypeScript为默认语言的项目.

简体中文 | [English](./README.md)

很显然, 这是一个基于 Nodejs 的脚手架工具, 用于帮助您快速创建一个使用 TypeScript 语言开发的项目.

- 所有项目默认都使用 typescript 而不是 javascript
- 多种项目类型可选, 如: `CLI(命令行工具)`、`Library(工具库)`
- 基于[@hacxy/eslint-config](https://github.com/hacxy/eslint-config)并使用统一的代码风格
- 默认校验 git 提交信息, 使用`npm run commit`生成固定格式的提交信息
- 默认提供发布脚本, 并自动创建 github release, 执行 `npm run release` 完成发布流程

![](https://raw.githubusercontent.com/hacxy/hacxy/main/images/Kapture%202024-12-16%20at%2015.19.44.gif)

## 先决条件
- nodejs >= 18

## 使用

使用 npm:
```sh
npm create defts@latest
```
使用 yarn:
```sh
yarn create defts
```
使用 pnpm:
```sh
pnpm create defts
```
使用bun:
```sh
bun create defts
```

请执行后遵循提示进行操作

---

您也可以通过额外的命令行选项直接指定项目名称和所需的项目模板。例如，要构建一个CLI项目，请运行：
```sh
# npm 7+, additional double dash is required:
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
