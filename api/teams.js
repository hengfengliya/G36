// Vercel API Route for managing team data
// 使用/tmp目录存储数据（Vercel Serverless Functions的临时存储）
import fs from 'fs';
import path from 'path';

// 使用/tmp目录，这是Vercel Serverless Functions唯一可写的目录
const dataFile = path.join('/tmp', 'teams.json');

// 初始数据
const getInitialData = () => ({
  teams: { blue: [], red: [] },
  presets: [],
  lastUpdated: new Date().toISOString()
});

// 读取数据
function readData() {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('读取数据失败:', error);
  }
  // 如果文件不存在或读取失败，返回初始数据
  return getInitialData();
}

// 写入数据
function writeData(data) {
  try {
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('写入数据失败:', error);
    return false;
  }
}

export default function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // 读取数据
      const data = readData();
      res.status(200).json(data);
    }
    else if (req.method === 'POST' || req.method === 'PUT') {
      // 写入数据
      const newData = req.body;
      const success = writeData(newData);

      if (success) {
        res.status(200).json({ success: true, message: '数据保存成功' });
      } else {
        res.status(500).json({ success: false, error: '保存数据失败' });
      }
    }
    else {
      res.status(405).json({ error: '方法不允许' });
    }
  } catch (error) {
    console.error('API错误:', error);
    res.status(500).json({ error: '服务器错误', details: error.message });
  }
}