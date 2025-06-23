# Anti-Social Network – MongoDB Jojobros

Aplicación de red social con persistencia en MongoDB, Redis y soporte para carga de imágenes.

## Integrantes

- Cravero, Marcos 
- Bravetti, Jonathan
- García, Nicolás
- Depaulo, Federico

---

## Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- Redis (caching)
- Swagger (documentación de API)
- Multer (carga de imágenes)
- Docker + Docker Compose

---

## Instalación

```bash
git clone https://github.com/tu-usuario/anti-social-mongo-jojobros.git
cd anti-social-mongo-jojobros
npm install
```

Iniciar contenedores:

```bash
docker compose up -d
```

Iniciar el servidor:

```bash
npm run dev
```

---

## Pruebas

Recomendamos usar [Postman](https://www.postman.com/) para probar los endpoints.

Importar la colección `AntiSocial MongoDB.postman_collection.json`.

---

## Estructura del proyecto

```
├── assets/
├── coleccionesPostman/
│   └── AntiSocial MongoDB.postman_collection.json
├── docs/
│   └── swagger.yaml
├── src
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/      
│   └── index.js
├── uploads/
├── .env
├── .gitIgnore
├── docker-compose.yml
├── Modelo_documental.jpg
├── package-lock.json
├── package.json
├── README Consigna.md
└── README.md    
```

---

## Documentación

Acceda a la documentación Swagger desde:

```
http://localhost:3000/api-docs
```

---

## Cache con Redis

La ruta `GET /posts` implementa caching con una duración de 3 minutos.

---

## Bonus Implementados

- [x] Almacenamiento local de imágenes
- [x] Cache con Redis
- [x] Modelo Followers
