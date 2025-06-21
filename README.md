# 🧠 Anti-Social Network – MongoDB Edition

Aplicación de red social minimalista con persistencia en MongoDB, Redis y soporte para carga de imágenes.

---

## 🚀 Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- Redis (caching)
- Swagger (documentación de API)
- Multer (carga de imágenes)
- Docker + Docker Compose

---

## ⚙️ Instalación

```bash
git clone https://github.com/tu-usuario/anti-social-mongo-jojobros.git
cd anti-social-mongo-jojobros
npm install
```

🐳 Iniciar contenedores:

```bash
docker compose up -d
```

🟢 Iniciar el servidor:

```bash
npm run dev
```

---

## 🧪 Pruebas

Recomendamos usar [Postman](https://www.postman.com/) para probar los endpoints.

Importar la colección `postman_collection.json`.

---

## 📂 Estructura del proyecto

```
├── src
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   ├── uploads/       
│   └── index.js
├── .env
├── docker-compose.yml
├── README.md
└── swagger.yaml       
```

---

## 📚 Documentación

Accedé a la documentación Swagger desde:

```
http://localhost:3000/api-docs
```

---

## 🧊 Cache con Redis

La ruta `GET /posts` implementa caching con una duración de 3 minutos.

---

## 📌 Bonus Implementados

- [x] Almacenamiento local de imágenes
- [x] Cache con Redis
- [x] Modelo Followers
