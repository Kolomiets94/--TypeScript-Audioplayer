const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 8000;
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Чтение пользователей из файла
const readUsers = () => {
  try {
    if (!fs.existsSync(USERS_FILE)) return [];
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Ошибка чтения users.json:', err);
    return [];
  }
};

// Запись пользователей в файл
const writeUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error('Ошибка записи users.json:', err);
  }
};

// Регистрация
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'пользователь уже существует' });
  }
  if (!username || !password || password.length < 6) {
    return res.status(400).json({ message: 'Имя пользователя и пароль от 6 символов обязательны' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ username, passwordHash });
  writeUsers(users);
  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'dev-secret-key', { expiresIn: '1h' });
  res.status(201).json({ message: 'пользователь успешно добавлен', token, user: { username } });
});

// Логин
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username);
  const passwordMatches = user
    ? user.passwordHash
      ? await bcrypt.compare(password, user.passwordHash)
      : user.password === password
    : false;
  if (!user || !passwordMatches) {
    return res.status(401).json({ message: 'произошла ошибка при авторизации — неверные данные' });
  }
  if (!user.passwordHash) {
    user.passwordHash = await bcrypt.hash(password, 10);
    delete user.password;
    writeUsers(users);
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'dev-secret-key', { expiresIn: '1h' });
  res.json({ message: 'авторизация прошла успешно', token, user: { username } });
});

// Получение треков
app.get('/api/tracks', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Требуется авторизация' });
  }
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-key');
  } catch {
    return res.status(401).json({ message: 'Недействительный токен' });
  }
  const tracks = [
    { id: '1', title: 'In Bloom', artist: 'Nirvana' },
    { id: '2', title: "Gangsta's Paradise", artist: 'Coolio, L.V.' },
    { id: '3', title: 'Разговоры о животных', artist: 'Подают студия Константина Петрова' },
    { id: '4', title: 'Animal I Have Become', artist: 'Three Days Grace' },
    { id: '5', title: 'Histoire Sans Nom', artist: 'Ludovico Einaudi, Czech National Symphony Orchestra' },
    { id: '6', title: 'To The Skies From A Hillside', artist: 'Maybeshewill' },
    { id: '7', title: 'Co-Conspirators', artist: 'Maybeshewill' },
    { id: '8', title: 'Surrounded By Spies', artist: 'Placebo' }
  ];
  res.json(tracks);
});

// Работа с избранным (заглушка, сохранять в файл можно позже)
app.get('/api/favorites', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Требуется авторизация' });
  }
  // Пока возвращаем пустой массив
  res.json([]);
});

app.post('/api/favorites', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Требуется авторизация' });
  }
  res.json({ message: 'композиция добавлена в избранное' });
});

app.delete('/api/favorites', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Требуется авторизация' });
  }
  res.json({ message: 'композиция убрана из избранного' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📁 Пользователи сохраняются в ${USERS_FILE}`);
});