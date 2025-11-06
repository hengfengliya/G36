// Vercel API Route for managing team data
// 使用 Neon PostgreSQL 数据库进行持久化存储
import { sql } from '@vercel/postgres';

// 初始数据结构
const getInitialData = () => ({
  teams: { blue: [], red: [] },
  presets: [],
  lastUpdated: new Date().toISOString()
});

// 读取数据
async function readData() {
  try {
    // 确保表存在
    await sql`
      CREATE TABLE IF NOT EXISTS teams (
        id SERIAL PRIMARY KEY,
        team_data JSONB NOT NULL,
        presets JSONB DEFAULT '[]'::jsonb,
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 查询数据（获取最新记录）
    const result = await sql`
      SELECT team_data, presets, last_updated
      FROM teams
      ORDER BY last_updated DESC
      LIMIT 1;
    `;

    if (result.rows.length === 0) {
      // 如果没有数据，插入初始数据
      const initialData = getInitialData();
      await sql`
        INSERT INTO teams (team_data, presets)
        VALUES (${JSON.stringify(initialData.teams)}::jsonb, ${JSON.stringify(initialData.presets)}::jsonb)
      `;
      return initialData;
    }

    // 返回查询结果
    return {
      teams: result.rows[0].team_data,
      presets: result.rows[0].presets || [],
      lastUpdated: result.rows[0].last_updated
    };

  } catch (error) {
    console.error('读取数据失败:', error);
    // 返回初始数据作为降级方案
    return getInitialData();
  }
}

// 写入数据
async function writeData(data) {
  try {
    const { teams, presets } = data;

    // 使用 UPSERT 策略：更新最新记录或插入新记录
    const result = await sql`
      INSERT INTO teams (id, team_data, presets, last_updated)
      VALUES (
        1,
        ${JSON.stringify(teams)}::jsonb,
        ${JSON.stringify(presets || [])}::jsonb,
        CURRENT_TIMESTAMP
      )
      ON CONFLICT (id)
      DO UPDATE SET
        team_data = ${JSON.stringify(teams)}::jsonb,
        presets = ${JSON.stringify(presets || [])}::jsonb,
        last_updated = CURRENT_TIMESTAMP
      RETURNING last_updated;
    `;

    return {
      success: true,
      lastUpdated: result.rows[0].last_updated
    };

  } catch (error) {
    console.error('写入数据失败:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// 清理旧数据（可选：保留最近30天的历史记录）
async function cleanupOldData() {
  try {
    await sql`
      DELETE FROM teams
      WHERE created_at < NOW() - INTERVAL '30 days'
      AND id != 1;
    `;
  } catch (error) {
    console.error('清理旧数据失败:', error);
  }
}

export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // 读取数据
      const data = await readData();
      res.status(200).json(data);
    }
    else if (req.method === 'POST' || req.method === 'PUT') {
      // 写入数据
      const newData = req.body;

      // 数据验证
      if (!newData.teams || !newData.teams.blue || !newData.teams.red) {
        res.status(400).json({
          success: false,
          error: '数据格式错误：缺少 teams.blue 或 teams.red'
        });
        return;
      }

      const result = await writeData(newData);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: '数据保存成功',
          lastUpdated: result.lastUpdated
        });

        // 异步清理旧数据（不阻塞响应）
        cleanupOldData().catch(err => console.error('清理失败:', err));
      } else {
        res.status(500).json({
          success: false,
          error: '保存数据失败',
          details: result.error
        });
      }
    }
    else if (req.method === 'DELETE') {
      // 重置数据
      const initialData = getInitialData();
      const result = await writeData(initialData);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: '数据已重置'
        });
      } else {
        res.status(500).json({
          success: false,
          error: '重置失败'
        });
      }
    }
    else {
      res.status(405).json({ error: '方法不允许' });
    }
  } catch (error) {
    console.error('API错误:', error);
    res.status(500).json({
      error: '服务器错误',
      details: error.message
    });
  }
}
