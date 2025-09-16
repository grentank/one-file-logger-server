const http = require('http');

const server = http.createServer((req, res) => {
    let body = '';
    
    // Собираем тело запроса
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
        // Парсим URL для получения query параметров
        const url = new URL(req.url, `http://${req.headers.host}`);
        const queryParams = Object.fromEntries(url.searchParams.entries());
        
        // Формируем объект с информацией о запросе
        const requestInfo = {
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: body,
            queryParams: queryParams,
            timestamp: new Date().toISOString()
        };
        
        // Выводим в консоль
        console.log('=== НОВЫЙ ЗАПРОС ===');
        console.log('Метод:', req.method);
        console.log('URL:', req.url);
        console.log('Query параметры:', queryParams);
        console.log('Тело запроса:', body);
        console.log('Заголовки:', req.headers);
        console.log('Время:', new Date().toISOString());
        console.log('====================\n');
        
        // Отправляем ответ
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }
        
        res.writeHead(200);
        res.end(JSON.stringify(requestInfo, null, 2));
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Откройте http://localhost:${PORT} в браузере`);
    console.log('Сервер будет логировать все запросы...\n');
});
