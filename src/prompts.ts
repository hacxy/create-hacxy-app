export const prompts = [
  // {
  //   label: "Web",
  //   value: [],
  // },
  {
    label: "脚手架",
    value: [
      {
        label: "unbuild",
        value: "unbuild-cli",
      },
    ],
  },
  // {
  //   label: "Nodejs服务端",
  //   value: [],
  // },
  // {
  //   label: "vscode插件",
  //   value: [],
  // },
];

export const optionalDependency = {
  "unbuild-cli": [{ label: "release-it", value: "release-it" }],
};

export const dependenceVersion = {
  "release-it": "",
};
