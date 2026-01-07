# 🧘 Meditation App

Una aplicación web simple de meditación guiada que combina **audio ambiental**, **video de fondo** y un **temporizador visual**, pensada para sesiones cortas de relajación y foco.

👉 **Demo online:**  
https://meditation-manuelm3z.vercel.app/

---

## ✨ Features

- ▶️ Reproducción de audio ambiental (rain / beach)
- 🎥 Video de fondo sincronizado con el audio
- ⏱️ Temporizador configurable (2, 5 y 10 minutos)
- ⭕ Progreso visual circular en tiempo real
- ⏯️ Control Play / Pause con estado consistente
- 📱 Diseño responsive

---

## 🧠 Enfoque técnico

El proyecto fue refactorizado con foco en **claridad de estado y separación de responsabilidades**:

- **Estado explícito** (`PlayerState`) como fuente de verdad
- **Acciones del player** centralizadas (`play`, `pause`, `stop`, `setMedia`, `setDuration`)
- Separación entre:
  - lógica de negocio (`core`)
  - acceso al DOM (`ui`)
  - wiring de eventos (`main.ts`)

Este enfoque evita que el DOM sea quien decida el estado de la aplicación y facilita la extensión futura.

---

## 🛠️ Stack

- **TypeScript**
- **Vite**
- **Vanilla JS (sin frameworks)**
- **SCSS**
- **HTML5 Audio / Video**
- **Deploy:** Vercel

---

## 🚀 Desarrollo local

`pnpm i`

`pnpm dev`

`pnpm build`

---