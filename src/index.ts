import { intro, text, select, outro } from "@clack/prompts";
import { copyTemplate, isCancelOperate } from "./utils";
import { fileURLToPath } from "node:url";
import pakageJson from "../package.json";
import { prompts } from "./prompts";
import path from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bootstrap = async () => {
  intro(`Create Hacxy App v${pakageJson.version}`);
  const projectName = (await text({
    message: "请输入项目名称:",
    defaultValue: "hacxy-app",
    placeholder: "hacxy-app",
    validate: (value) => {
      if (!value) return "项目名称不合法";
    },
  })) as string;
  isCancelOperate(projectName);

  const projectTemplates = (await select({
    message: "请选择需要创建的项目类型:",
    options: prompts,
  })) as { label: string; value: string }[];
  isCancelOperate(projectTemplates);

  // 选择模板
  const projectTemplate = (await select({
    message: "请选择项目模板:",
    options: projectTemplates,
  })) as string;

  isCancelOperate(projectTemplate);

  // 复制模板到本地
  copyTemplate(__dirname, projectTemplate, projectName);

  outro(`项目创建成功!`);
  console.log(`请执行: \n  cd ${projectName}\n  npm install`);
};

bootstrap();
