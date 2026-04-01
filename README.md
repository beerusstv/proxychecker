# Proxy Checker API

API kiểm tra proxy hoạt động hay không, trả về HTTP status.

## Cài đặt

```bash
npm install
node index.js
```

Mặc định chạy trên port `3000`. Đổi port qua biến môi trường:

```bash
PORT=8080 node index.js
```

## API

### POST /check

**Query param:** `proxy=host:port:username:password`

- `type` mặc định là SOCKS5
- `username` và `password` không bắt buộc

**Ví dụ có auth:**
```
POST /check?proxy=1.2.3.4:1080:user:pass
```

**Ví dụ không auth:**
```
POST /check?proxy=1.2.3.4:1080
```

**Response:**
- `200` — Proxy hoạt động
- `400` — Proxy lỗi hoặc không kết nối được
