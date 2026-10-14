/**
 * mini-figma — запуск страницы скачивания (desktop-download/).
 *
 * Поднимает крошечный статический сервер только на 127.0.0.1 и открывает
 * страницу в браузере — ровно так, как она будет открываться на хостинге.
 * Зависимостей нет, нужен только Node.js.
 *
 *   node serve-page.mjs            # запустить и открыть браузер
 *   node serve-page.mjs --no-open  # только запустить (напечатает адрес)
 *   PORT=8080 node serve-page.mjs  # свой порт вместо случайного свободного
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const ROOT = fileURLToPath(new URL('./desktop-download/', import.meta.url));
const NO_OPEN = process.argv.includes('--no-open');
const PORT = Number(process.env.PORT ?? 0);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.zip': 'application/zip',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
};

function openBrowser(url) {
  if (NO_OPEN) return;
  const opts = { detached: true, stdio: 'ignore' };
  try {
    if (process.platform === 'win32') spawn('cmd', ['/c', 'start', '', url], opts).unref();
    else if (process.platform === 'darwin') spawn('open', [url], opts).unref();
    else spawn('xdg-open', [url], opts).unref();
  } catch {
    /* не удалось открыть — адрес напечатан ниже */
  }
}

const server = createServer(async (req, res) => {
  try {
    const rel = normalize(decodeURIComponent(new URL(req.url, 'http://localhost').pathname))
      .replace(/^(\.\.[/\\])+/, '')
      .replace(/^[/\\]+/, '');
    const file = join(ROOT, rel || 'index.html');
    if (!file.startsWith(ROOT)) throw new Error('forbidden');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[extname(file).toLowerCase()] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('not found');
  }
});

server.on('error', (err) => {
  console.error('Не удалось запустить сервер: ' + err.message);
  process.exit(1);
});

server.listen(PORT, '127.0.0.1', () => {
  const { port } = server.address();
  const url = `http://127.0.0.1:${port}/`;
  console.log('Страница скачивания запущена: ' + url);
  console.log('Чтобы остановить — закройте это окно (Ctrl+C).');
  openBrowser(url);
});
