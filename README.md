# 🔍 Detective de Fuentes

> **Pensamiento Crítico: Validación de Fuentes Confiables**  
> Un juego educativo en Canvas (HTML5 + JavaScript vanilla) para desarrollar habilidades de evaluación crítica de información.

[![Jugar ahora](https://img.shields.io/badge/🎮%20Jugar%20ahora-GitHub%20Pages-6366f1?style=for-the-badge)](https://davidangarita1.github.io/source_validation_game/)
[![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-10b981?style=flat-square)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-f59e0b?style=flat-square&logo=javascript)](https://developer.mozilla.org/es/docs/Web/JavaScript)

---

## 🎮 Jugar

👉 **[https://davidangarita1.github.io/source_validation_game/](https://davidangarita1.github.io/source_validation_game/)**

---

## ¿De qué trata?

El jugador asume el rol de un **Detective de Fuentes** y debe evaluar 5 escenarios aleatorios (tomados de un banco de 20 preguntas) para determinar si una fuente de información es **confiable** o **no confiable**.

Cada escenario cubre un criterio diferente del pensamiento crítico:

| Criterio | Ejemplo de escenario |
|---|---|
| Credibilidad del autor | Blog anónimo con clickbait |
| Sesgo comercial | Influencer con enlace de afiliado |
| Verificabilidad | Periódico con documentos cifrados |
| Rigor metodológico | Revista científica indexada |
| Falsa autoridad | "Médicos por la verdad" sin estudios |
| Triangulación de fuentes | Sitio web creado hace 2 meses |
| Transparencia de datos | Banco Mundial con datos abiertos |
| Conflicto de interés | Comunicado corporativo propio |
| … y más | 20 preguntas en total |

Al finalizar, el jugador obtiene su **puntuación**, **porcentaje**, **rango** y un resumen por criterio.

---

## 🏆 Rangos

| Puntaje | Rango |
|---|---|
| 5/5 (100%) | 🏆 Detective Maestro |
| 4/5 (80%) | 🥇 Investigador Experto |
| 3/5 (60%) | 🥈 Analista Competente |
| 2/5 (40%) | 🥉 Aprendiz Curioso |
| 0-1/5 | 📚 Novato en Formación |

---

## 🛠 Estructura del proyecto

```
/
├── index.html          # Punto de entrada
├── styles.css          # Estilos de la página
├── scripts/
│   ├── config.js       # Constantes: colores, fuentes, dimensiones
│   ├── questions.js    # Banco de 20 preguntas + factory
│   ├── renderer.js     # Primitivas de dibujo sobre Canvas
│   ├── screens.js      # Pantallas: Welcome, Playing, Results, Partículas
│   └── game.js         # Game loop, estado y orquestación
├── LICENSE
└── README.md
```

---

## 🚀 Correr localmente

No requiere instalación ni dependencias. Solo abre `index.html` en tu navegador **o** sirve con cualquier servidor estático:

```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

Luego abre [http://localhost:8080](http://localhost:8080).

---

## ⚙️ Principios de diseño

- **Programación funcional** — funciones puras, `Object.freeze`, sin mutación directa de estado
- **Single Responsibility** — cada archivo tiene una responsabilidad única
- **Factory Pattern** — `createRenderer`, `createGameState`, `createParticleSystem`, etc.
- **Strategy Pattern** — cada pantalla encapsula su lógica de dibujo e interacción
- **Clean Code** — sin comentarios innecesarios, nombres descriptivos, funciones cortas
- **Zero dependencias** — HTML5 Canvas vanilla, sin frameworks ni bundlers

---

## 📄 Licencia

[MIT](LICENSE) © 2026 David Angarita
