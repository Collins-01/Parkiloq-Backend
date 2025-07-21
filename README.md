# Parkiloq Backend

A clean, scalable Node.js backend for the Parkiloq parking space marketplace, built with TypeScript, Clean Architecture, Supabase Auth, and PostgreSQL.

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd parkiloq-backend
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=4000
```

### 3. Run the Server

#### Development (auto-reload with ts-node-dev)
```bash
npm run dev
```

#### Development (auto-reload with nodemon)
```bash
npm run nodemon
```

#### Production
```bash
npm run build
npm start
```

---

## 🛣️ API Endpoints

- `GET /health` — Health check

### Auth
- `POST /auth/register` — Register user (email, password)
- `POST /auth/login` — Login user (email, password)
- `GET /auth/me` — Get current user (by token)
- `POST /auth/logout` — Logout user

### User Profile
- `GET /auth/profile` — Get profile (by token)
- `PUT /auth/profile` — Update profile (name, avatar, phone)

---

## 🧑‍💻 Project Structure

```
src/
├── domain/
│   ├── entities/
│   └── usecases/
├── interfaces/
│   ├── repositories/
│   └── controllers/
├── infrastructure/
│   ├── repositories/
│   └── supabaseClient.ts
├── routes/
├── index.ts
├── server.ts
```

---

## 🧪 Testing

Test the API with Postman, Insomnia, or curl. Example:

```bash
curl http://localhost:4000/health
```

---

## 📄 License

MIT
