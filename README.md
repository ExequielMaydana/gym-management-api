# Gym Management API

API REST desarrollada en **Node.js** y **Express.js** con una base de datos **MongoDB**, gestionada mediante **Docker**, para administrar los clientes y pagos de un gimnasio. Este proyecto está diseñado para optimizar la administración, permitiendo el registro, consulta y actualización de información de los clientes de forma rápida y eficiente.

## 🚀 Características

- **Gestión de clientes:**
  - Crear, actualizar y eliminar clientes.
  - Consultar información detallada de cada cliente.
- **Registro de pagos:**
  - Control de pagos asociados a los clientes.
  - Historial de pagos por fecha.
- **Seguridad:**
  - Autenticación con **JWT**.
  - Validación de datos con **Express Validator**.
- **Despliegue preparado en** **Railway** para backend y base de datos.
- **Uso de Docker** para contenerizar tanto la API como la base de datos MongoDB, asegurando un entorno de desarrollo y producción reproducible.

## 🛠️ Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en backend.
- **Express.js**: Framework minimalista y flexible para construir APIs.
- **MongoDB**: Base de datos NoSQL para almacenamiento de datos.
- **Mongoose**: ODM para modelar datos de MongoDB en Node.js.
- **JWT (JSON Web Token)**: Autenticación segura.
- **dotenv**: Gestión de variables de entorno.
- **bcryptjs**: Cifrado de contraseñas.
- **Docker**: Para contenerizar tanto la API como la base de datos, garantizando una configuración sencilla y un entorno replicable.

## 📂 Estructura del proyecto

```plaintext
src/
├── config/        # Configuración de base de datos y variables de entorno
├── controllers/   # Controladores para lógica de negocio
├── middlewares/   # Middlewares personalizados (auth, validaciones)
├── models/        # Modelos de Mongoose
├── routes/        # Definición de rutas de la API
├── utils/         # Funciones auxiliares
├── server.js      # Punto de entrada del servidor
```

## Autor

Desarrollado por Hernán Exequiel Maydana. Si te gusta este proyecto, no dudes en contactarme o revisar mi portafolio para más soluciones interesantes.
