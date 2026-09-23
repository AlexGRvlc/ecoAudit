# 🌱 ecoAudit

Aplicación web interactiva que evalúa las respuestas del usuario a un cuestionario de sostenibilidad/hábitos ecológicos, calificando el resultado en el momento a partir de un conjunto de datos en formato JSON que emula una base de datos.

**🔗 Demo en producción:** [eco-audit-gamma.vercel.app](https://eco-audit-gamma.vercel.app/)

---

## ✨ Características

- 📝 Cuestionario interactivo sobre hábitos/impacto ambiental
- ⚙️ Motor de evaluación en el propio cliente: las respuestas se contrastan contra un JSON que simula una base de datos, sin necesidad de backend
- 📊 Resultado calculado y mostrado al instante en la misma página
- ⚡ Interfaz rápida y ligera gracias a Vite

## 🛠️ Stack tecnológico

- **React** — librería de UI
- **Vite** — bundler y servidor de desarrollo
- **Tailwind CSS** — estilos utility-first
- Datos locales en formato **JSON** como fuente de verdad para la evaluación (sin base de datos ni backend)

## 🏗️ Estructura del proyecto

```
ecoAudit/
├── public/
├── src/
│   ├── data/            # JSON con preguntas/reglas de evaluación
│   ├── components/
│   └── App.jsx
├── tailwind.config.js
└── vite.config.js
```

> Al ser una aplicación 100% cliente (sin servidor), toda la lógica de puntuación vive en el propio JavaScript del frontend, que compara las respuestas del usuario contra el JSON de datos y calcula el resultado final.

## 🚀 Puesta en marcha local

```bash
npm install
npm run dev
```

Para generar la build de producción:

```bash
npm run build
```

## 📌 Posibles mejoras futuras

- Persistencia de resultados (localStorage o backend ligero)
- Comparativa de resultados a lo largo del tiempo
- Más categorías/preguntas de evaluación
- Exportar o compartir el resultado obtenido

## 👤 Autor

**Alejandro Galera** — [GitHub](https://github.com/AlexGRvlc)
