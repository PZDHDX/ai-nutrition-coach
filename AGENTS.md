# ai-nutrition-coach

AI食养专家微信小程序风格原型，面向三高和慢病风险人群，用于演示拍照识别食物、饮食记录、食养分析和 AI食养问答流程。

## 项目边界

- 本项目只维护「AI食养专家」。
- 产品边界是饮食管理和食养建议，不做诊断、不替代医生、不建议调整药物。
- 不要在本项目加入调香、香水、精油、原料库等业务内容。
- 调香师项目固定放在 `G:\my\code\ai-fragrance-lab`。
- 部署前必须先运行 `npx netlify-cli status`，确认当前 Netlify 项目是 `ai-nutrition-coach-hdx`。

## 预览铁律

- 每次预览和验收页面效果时，优先使用 Codex in-app browser / browser-use 插件打开。
- 如果浏览器插件不可用，必须明确说明原因，再给备用链接。

## 技术栈

- 语言 / 框架: HTML, CSS, JavaScript
- 关键依赖: 无外部依赖，使用本地模拟数据

## 启动

```bash
# 无需安装依赖

# 直接在浏览器打开 index.html
```

## 部署

```bash
npx netlify-cli status
npx netlify-cli deploy --prod --dir .
```
