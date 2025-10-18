// Vercel API Route for managing team data
import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'teams.json');

// 确保数据目录存在
function ensureDataDir() {
  const dataDir = path.dirname(dataFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// 读取数据
function readData() {
  ensureDataDir();
  if (!fs.existsSync(dataFile)) {
    const initialData = {
      teams: { blue: [], red: [] },
      presets: [],
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
    return initialData;
  }

  const data = fs.readFileSync(dataFile, 'utf8');
  return JSON.parse(data);
}

// 写入数据
function writeData(data) {
  ensureDataDir();
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
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
      writeData(newData);
      res.status(200).json({ success: true, message: '数据保存成功' });
    }
    else {
      res.status(405).json({ error: '方法不允许' });
    }
  } catch (error) {
    console.error('API错误:', error);
    res.status(500).json({ error: '服务器错误', details: error.message });
  }
}