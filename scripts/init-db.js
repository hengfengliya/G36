// 数据库初始化脚本
import { sql } from '@vercel/postgres';

async function initDatabase() {
  try {
    console.log('🚀 开始初始化数据库...');

    // 创建 teams 表
    await sql`
      CREATE TABLE IF NOT EXISTS teams (
        id SERIAL PRIMARY KEY,
        team_data JSONB NOT NULL,
        presets JSONB DEFAULT '[]'::jsonb,
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('✅ teams 表创建成功');

    // 创建索引以提高查询性能
    await sql`
      CREATE INDEX IF NOT EXISTS idx_teams_last_updated
      ON teams(last_updated DESC);
    `;
    console.log('✅ 索引创建成功');

    // 插入初始数据（如果表是空的）
    const result = await sql`SELECT COUNT(*) as count FROM teams;`;
    const count = parseInt(result.rows[0].count);

    if (count === 0) {
      await sql`
        INSERT INTO teams (team_data, presets)
        VALUES (
          '{"blue": [], "red": []}'::jsonb,
          '[]'::jsonb
        );
      `;
      console.log('✅ 初始数据插入成功');
    } else {
      console.log('ℹ️  数据表已有数据，跳过初始化');
    }

    console.log('🎉 数据库初始化完成！');
    process.exit(0);

  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    process.exit(1);
  }
}

initDatabase();
