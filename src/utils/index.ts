import { cancel, isCancel } from "@clack/prompts";
import simpleGit from "simple-git";
import path from "node:path";
import fs from "node:fs";
import { GITHUB_URL } from "../constants";

export const isCancelOperate = (value?: unknown) => {
  if (isCancel(value)) {
    cancel("操作已取消");
    process.exit(0);
  }
};

// 获取git用户信息
export const getGitUserInfo = async () => {
  const userInfo = {
    username: "",
    email: "",
  };
  const git = await simpleGit({ baseDir: process.cwd(), binary: "git" });
  const { installed } = await git.version();
  if (installed) {
    const username = await git.getConfig("user.name");
    const email = await git.getConfig("user.email");
    userInfo.username = username?.value || "";
    userInfo.email = email?.value || "";
  }

  return userInfo;
};

export const copyTemplate = async (
  dirname: string,
  templateName: string,
  projectName: string = "."
) => {
  const templatePath = path.join(dirname, `../templates/${templateName}`);

  const cwdPath = path.join(process.cwd(), projectName);
  // console.log(path.basename(cwdPath));
  fs.cpSync(templatePath, cwdPath, {
    recursive: true,
  });

  const finalPackageName =
    projectName === "." ? path.basename(cwdPath) : projectName;

  const packageJsonPath = path.join(cwdPath, "package.json");
  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, { encoding: "utf-8" })
  );
  const { username, email } = await getGitUserInfo();
  packageJson.name = finalPackageName;
  packageJson.author = {
    name: username,
    email: email,
    url: `${GITHUB_URL}${username}`,
  };
  packageJson.repository = {
    type: "git",
    url: `${GITHUB_URL}${username}/${finalPackageName}.git`,
  };
  packageJson.bugs = {
    url: `${GITHUB_URL}${username}/${finalPackageName}/issues`,
  };
  packageJson.homepage = `${GITHUB_URL}${username}/${finalPackageName}`;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), {
    encoding: "utf-8",
  });
};
