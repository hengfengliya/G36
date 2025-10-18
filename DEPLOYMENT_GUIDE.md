# 🚀 免费部署指南 - 完全免费，中国可访问

## 💡 方案特点

✅ **完全免费** - 使用GitHub Gist作为数据库，永久免费
✅ **中国可访问** - GitHub在中国可以正常访问
✅ **无需注册** - 使用GitHub账号即可，不需要额外申请
✅ **操作简单** - 只需要5分钟设置
✅ **实时同步** - 5秒轮询，准实时数据同步

---

## 📋 步骤1: 创建GitHub Gist数据库

### 1.1 打开GitHub Gist
访问：https://gist.github.com

### 1.2 创建新的Gist
1. 点击右上角 **"+"** → **"New gist"**
2. 文件名填写：`lol-booking-data.json`
3. 在代码框中粘贴以下初始数据：

```json
{
  "teams": {
    "blue": [],
    "red": []
  },
  "presets": [],
  "lastUpdated": "2024-01-01T00:00:00.000Z"
}
```

4. 选择 **"Create public gist"** （必须是public才能匿名访问）

### 1.3 获取Gist ID
创建成功后，浏览器地址栏会显示类似：
```
https://gist.github.com/username/a1b2c3d4e5f6g7h8i9j0
```

其中 `a1b2c3d4e5f6g7h8i9j0` 就是你的 **Gist ID**

---

## 📋 步骤2: 配置项目

### 2.1 更新配置
打开 `index.html` 文件，找到第11行：

```javascript
gistId: 'your-gist-id-here', // 在部署指南中会教你如何获取
```

替换为你的Gist ID：
```javascript
gistId: 'a1b2c3d4e5f6g7h8i9j0', // 替换为你的实际Gist ID
```

### 2.2 提交代码
```bash
git add index.html
git commit -m "配置Gist数据库ID"
```

---

## 📋 步骤3: 部署到GitHub Pages（免费）

### 3.1 推送到GitHub
```bash
# 创建GitHub仓库（如果还没有）
git remote add origin https://github.com/你的用户名/lol-5v5-booking.git
git branch -M main
git push -u origin main
```

### 3.2 启用GitHub Pages
1. 打开你的GitHub仓库页面
2. 点击 **Settings** 选项卡
3. 在左侧菜单找到 **Pages**
4. 在 **Source** 下选择 **"Deploy from a branch"**
5. 选择 **"main"** 分支
6. 点击 **Save**

### 3.3 获取访问地址
几分钟后，你的网站就可以通过以下地址访问：
```
https://你的用户名.github.io/lol-5v5-booking
```

---

## 📋 步骤4: 部署到Vercel（免费，更快）

### 4.1 连接Vercel
1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账号登录
3. 点击 **"New Project"**
4. 选择你的 `lol-5v5-booking` 仓库
5. 点击 **"Deploy"**

### 4.2 获取访问地址
部署完成后，Vercel会提供类似地址：
```
https://lol-5v5-booking.vercel.app
```

---

## 🎯 完整操作流程总结

```bash
# 1. 创建Gist数据库（在网页上操作）
# 2. 更新配置文件
git add index.html
git commit -m "配置Gist数据库"

# 3. 推送到GitHub
git remote add origin https://github.com/你的用户名/lol-5v5-booking.git
git push -u origin main

# 4. 部署（二选一）
# 选项A: GitHub Pages（在GitHub网站上操作）
# 选项B: Vercel（在Vercel网站上操作）
```

---

## 🔧 数据库管理

### 查看数据
直接访问你的Gist地址：
```
https://gist.github.com/你的用户名/你的gist-id
```

### 手动编辑数据
点击Gist页面的 **"Edit"** 按钮即可手动修改数据

### 重置数据
将Gist内容替换为初始数据即可重置

---

## 🚀 访问你的应用

部署完成后，任何人都可以通过你的网站地址访问：
- 添加/删除玩家会实时同步
- 所有用户看到相同的队伍状态
- 支持离线使用，网络恢复时自动同步

---

## 💰 费用说明

✅ **GitHub账号** - 免费
✅ **GitHub Gist** - 免费
✅ **GitHub Pages** - 免费
✅ **Vercel** - 免费

**总费用：0元** 🎉

---

## 🛠️ 故障排除

### 问题1：连接状态显示离线
- 检查Gist ID是否正确
- 确认Gist是public（公开）的
- 检查网络连接

### 问题2：数据不同步
- 等待5-10秒（轮询间隔）
- 刷新页面重新连接
- 检查Gist是否可以正常访问

### 问题3：无法保存数据
- 确认Gist是public的
- 检查浏览器控制台是否有错误
- 尝试手动访问Gist URL

---

## 🎮 开始使用

按照以上步骤完成部署后，你就拥有了一个：
- 完全免费的英雄联盟5v5预约系统
- 支持实时数据同步
- 在中国可以正常访问
- 可以分享给任何人使用

**立即开始部署，享受免费的在线对战预约系统！** 🚀