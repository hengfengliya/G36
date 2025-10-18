# Firebase 设置指南

## 步骤1: 创建Firebase项目

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 点击"添加项目"
3. 输入项目名称 (例如: lol-5v5-booking)
4. 启用Google Analytics（可选）
5. 创建项目

## 步骤2: 设置Realtime Database

1. 在Firebase控制台左侧菜单中选择"Realtime Database"
2. 点击"创建数据库"
3. 选择数据库位置（建议选择亚洲地区）
4. 选择"以测试模式启动"（用于开发）

## 步骤3: 配置安全规则

在Realtime Database的"规则"选项卡中，设置以下规则：

```json
{
  "rules": {
    "teams": {
      ".read": true,
      ".write": true
    },
    "presets": {
      ".read": true,
      ".write": true
    }
  }
}
```

**生产环境建议**: 添加更严格的验证规则

## 步骤4: 获取配置信息

1. 在项目设置中点击"添加应用" → "Web应用"
2. 输入应用昵称并注册应用
3. 复制Firebase配置对象

## 步骤5: 更新代码配置

在 `index.html` 文件第13-21行，替换为你的Firebase配置：

```javascript
const firebaseConfig = {
    apiKey: "你的API密钥",
    authDomain: "你的项目ID.firebaseapp.com",
    databaseURL: "https://你的项目ID-default-rtdb.firebaseio.com",
    projectId: "你的项目ID",
    storageBucket: "你的项目ID.appspot.com",
    messagingSenderId: "你的发送者ID",
    appId: "你的应用ID"
};
```

## 数据结构

Firebase中的数据将按以下结构存储：

```
lol-5v5-booking/
├── teams/
│   ├── blue/
│   │   ├── 0: {nickname: "玩家1#1234", joinTime: "2024-01-01 10:00:00"}
│   │   └── 1: {nickname: "玩家2#5678", joinTime: "2024-01-01 10:01:00"}
│   └── red/
│       ├── 0: {nickname: "玩家3#9999", joinTime: "2024-01-01 10:02:00"}
│       └── 1: {nickname: "玩家4#1111", joinTime: "2024-01-01 10:03:00"}
└── presets/
    ├── preset_0: "自定义玩家1#1234"
    └── preset_1: "自定义玩家2#5678"
```

## 功能特性

✅ **实时同步**: 所有用户看到相同的队伍状态
✅ **自动重连**: 网络断开后自动切换到离线模式
✅ **状态指示**: 右上角显示连接状态
✅ **降级支持**: 连接失败时自动使用localStorage
✅ **预设同步**: 自定义ID在所有设备间同步

## 安全注意事项

1. **测试模式仅用于开发**: 生产环境需要配置适当的安全规则
2. **数据验证**: 建议添加服务器端数据验证
3. **用户认证**: 可以集成Firebase Authentication增强安全性

## 故障排除

- **连接失败**: 检查Firebase配置是否正确
- **权限错误**: 确认数据库规则允许读写操作
- **网络问题**: 应用会自动切换到离线模式