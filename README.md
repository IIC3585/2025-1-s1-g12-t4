# T4 - Grupo 12

---

Demo de web-components (estándar): [https://t4-web-components.web.app/](https://t4-web-components.web.app/)

## Requisitos Previos

Para ejecutar los proyectos basados en Node.js (como `subscription-lit` y potencialmente otros que usen módulos de JS), necesitas tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados en tu sistema.

## Cómo Ejecutar cada Proyecto

A continuación se detallan las instrucciones para poner en marcha cada uno de los proyectos contenidos en este repositorio:

### 1. Proyecto `subscription` (Web Components Estándar)

Este proyecto implementa una tarjeta de suscripción utilizando Web Components nativos de JavaScript. No requiere un servidor web para su ejecución.

* **Ejecución:**
  1. Navega a la carpeta `subscription/`.
  2. Abre el archivo `index.html` directamente en tu navegador web (doble clic en el archivo).

### 2. Proyecto `subscription-lit` (Lit Element)

Este proyecto implementa una tarjeta de suscripción utilizando la librería Lit Element, lo que facilita el desarrollo de Web Components. Requiere un entorno de desarrollo Node.js con `npm` y Vite para un servidor local.

* **Instalación de Dependencias:**
    1. Abre tu terminal y navega a la carpeta `subscription-lit/`:

    ```bash
    cd subscription-lit
    ```

    2. Instala todas las dependencias del proyecto definidas en `package.json`:

    ```bash
    npm install
    ```

* **Ejecución:**
    1. Una vez instaladas las dependencias, inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

    2. Vite te proporcionará una URL (por ejemplo, `http://localhost:5173/`). Abre esta URL en tu navegador web. El servidor se recargará automáticamente cada vez que realices cambios en el código.

### 3. Proyecto `accordion`

Este proyecto es un componente de acordeón interactivo.

* **Ejecución:**
    1. Navega a la carpeta `accordion/`.
    2. Abre el archivo `index.html` directamente en tu navegador web.