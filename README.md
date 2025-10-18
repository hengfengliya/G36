# 英雄联盟5v5预约对战系统

一个功能完善的英雄联盟5v5预约对战应用，支持红蓝两方队员预约、在线数据同步、预设队伍管理等功能。

## 在线演示

🔗 [https://g36-pi.vercel.app](https://g36-pi.vercel.app)

## 功能特点

### 核心功能
- 🔵 蓝色方 vs 🔴 红色方 5v5对战布局
- 👤 用户昵称格式验证 (昵称#标签，例如: 小明#CN1)
- ⏰ 自动显示加入时间
- 📱 响应式设计，完美支持移动端
- 🎮 英雄联盟风格UI设计，沉浸式对战体验

### 数据管理
- 💾 在线数据同步 - 使用Vercel API Routes实现跨设备数据共享
- 🔄 自动保存 - 队伍变更自动同步到云端
- 📋 预设队伍 - 支持保存和快速加载常用队伍配置
- 🗑️ 一键清空 - 快速重置所有队伍成员

### 技术亮点
- ⚡ 零配置部署 - 一键部署到Vercel，无需后端服务器
- 🔐 数据持久化 - Vercel Serverless API + 文件存储
- 🌐 跨平台访问 - 任何设备通过浏览器访问
- 🚀 高性能 - 静态资源 + API路由的混合架构

## 使用方法

### 在线使用
1. 访问 [https://g36-pi.vercel.app](https://g36-pi.vercel.app)
2. 输入召唤师名称 (格式: 昵称#标签，例如: 小明#CN1)
3. 选择加入蓝色方或红色方
4. 点击"加入战斗"按钮
5. 数据自动保存到云端，其他设备可实时查看

### 本地开发
```bash
# 克隆项目
git clone https://github.com/hengfengliya/G36.git
cd G36

# 安装依赖
npm install

# 启动本地开发服务器
npm run dev

# 访问 http://localhost:3000
```

## 部署到Vercel

### 方法一：通过Vercel Dashboard（推荐）
1. Fork本项目到你的GitHub账号
2. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
3. 点击 "Import Project"
4. 选择你Fork的GitHub仓库
5. 保持默认配置，点击 "Deploy"
6. 等待部署完成，获得你的专属域名

### 方法二：使用Vercel CLI
```bash
# 安装Vercel CLI
npm install -g vercel

# 登录Vercel账号
vercel login

# 部署项目
vercel

# 部署到生产环境
vercel --prod
```

## 项目结构

```
G36/
├── index.html          # 主页面
├── api/
│   └── teams.js       # Vercel API路由 - 处理数据读写
├── data/
│   └── teams.json     # 数据存储文件（自动生成）
├── vercel.json        # Vercel配置文件
├── package.json       # 项目依赖配置
└── README.md          # 项目文档
```

## 技术栈

### 前端
- **HTML5** - 语义化标签结构
- **CSS3** - Flexbox/Grid布局，响应式设计
- **JavaScript (ES6+)** - 模块化开发，异步处理

### 后端
- **Vercel Serverless Functions** - 无服务器API
- **Node.js** - API路由运行环境
- **File System API** - 数据持久化存储

### 部署
- **Vercel** - 全球CDN加速，自动HTTPS
- **GitHub** - 代码版本管理

## API接口文档

### GET /api/teams
获取当前队伍数据

**响应示例:**
```json
{
  "teams": {
    "blue": [
      {
        "name": "小明#CN1",
        "time": "2025-01-15T10:30:00.000Z"
      }
    ],
    "red": []
  },
  "presets": [
    {
      "name": "常规阵容",
      "teams": { "blue": [...], "red": [...] }
    }
  ],
  "lastUpdated": "2025-01-15T10:30:00.000Z"
}
```

### POST /api/teams
保存队伍数据

**请求体:**
```json
{
  "teams": {
    "blue": [...],
    "red": [...]
  },
  "presets": [...]
}
```

**响应:**
```json
{
  "success": true,
  "message": "数据保存成功"
}
```

## 开发计划

- [ ] 添加用户认证系统
- [ ] 支持战绩统计功能
- [ ] 添加聊天室功能
- [ ] 集成英雄选择界面
- [ ] 支持自定义队伍规模（3v3, 5v5, 10v10）

## 常见问题

**Q: 数据保存在哪里？**
A: 数据保存在Vercel的文件系统中，通过Serverless API访问，所有用户共享同一份数据。

**Q: 是否支持多房间？**
A: 当前版本所有用户共享一个房间。如需多房间功能，建议部署多个实例。

**Q: 数据会丢失吗？**
A: Vercel的文件系统在函数调用之间保持持久化，但建议定期备份重要数据。

**Q: 如何修改队伍人数限制？**
A: 编辑 `index.html` 中的 `MAX_PLAYERS` 常量即可。

## 贡献指南

欢迎提交Issue和Pull Request！

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交Pull Request

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 作者

**hengfengliya**

- GitHub: [@hengfengliya](https://github.com/hengfengliya)
- 项目地址: [https://github.com/hengfengliya/G36](https://github.com/hengfengliya/G36)

## 致谢

感谢所有贡献者和使用本项目的玩家！

---

⭐ 如果这个项目对你有帮助，请给个Star支持一下！