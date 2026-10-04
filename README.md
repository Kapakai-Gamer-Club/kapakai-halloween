---

# **Kapakai Robot — MakeCode Extension**

Una librería optimizada para controlar el robot Kapakai de **8 servos**, diseñada para micro:bit y compatible con **MakeCode**, **radio**, y futuras integraciones con **Minecraft**.  
Incluye un sistema de animaciones modular, rápido y eficiente, basado en arrays numéricos para máxima velocidad de reacción.

---

## Características principales

- Control de **8 servos** usando la placa Kitronik (PCA9685).
- Sistema de animaciones **ultra rápido** (sin JSON, sin parsing).
- Movimientos organizados por **categorías** con dropdowns en MakeCode:
  - Basic Motion  
  - Arm Motion  
  - Leg Motion  
  - Special Motion  
- Compatible con **radio micro:bit ↔ micro:bit**.
- Preparado para integrarse con **Minecraft** (comandos → movimientos).
- Código limpio, modular y fácil de extender.

---

## Estructura del proyecto

```
kapakai-robot/
│
├── index.ts            ← Bloques MakeCode + dropdowns por categoría
├── servoDriver.ts      ← Controlador PCA9685 (Kitronik)
├── motionPlayer.ts     ← Motor de animaciones
├── motions.ts          ← Movimientos optimizados (arrays)
│
├── pxt.json            ← Configuración de la extensión
└── README.md           ← Documentación
```

---

## Concepto de animaciones

Los movimientos están definidos como **arrays numéricos optimizados**, por ejemplo:

```ts
export const RaiseArms = [
    { t: 300, o: [ [0,45], [4,45] ] }
]
```

Donde:

- `t` = tiempo de transición en milisegundos  
- `o` = lista de pares `[servoIndex, angle]`  

Este formato es:

- rápido  
- ligero  
- ideal para micro:bit  
- perfecto para radio y Minecraft  

---

## Uso en MakeCode

Una vez instalada la extensión, verás bloques como:

### Basic Motion
```
play basic motion [ WalkForward ▼ ]
```

### Arm Motion
```
play arm motion [ RaiseArms ▼ ]
```

### Leg Motion
```
play leg motion [ KickLeft ▼ ]
```

### Special Motion
```
play special motion [ Neutral ▼ ]
```

Y también:

```
set servo [index] to [angle] degrees
```

---

## Ejemplo de uso

```ts
kapakai.playBasic(kapakai.MotionBasic.WalkForward)
basic.pause(500)

kapakai.playArms(kapakai.MotionArms.RaiseArms)
basic.pause(500)

kapakai.playSpecial(kapakai.MotionSpecial.Breathing)
```

---

## Integración con radio

La librería está diseñada para reaccionar **instantáneamente** a comandos por radio:

```ts
radio.onReceivedString(function (cmd) {
    if (cmd == "WALK") kapakai.playBasic(kapakai.MotionBasic.WalkForward)
    if (cmd == "ARMS") kapakai.playArms(kapakai.MotionArms.RaiseArms)
})
```

Esto permite:

- control remoto  
- sincronización entre robots  
- activación desde Minecraft  
- eventos interactivos  

---

## Hardware compatible

- BBC micro:bit v1/v2  
- Kitronik Robotics Board (PCA9685 @ 0x6A)  
- Servos estándar de 180°  

---

## Extender la librería

Puedes añadir nuevos movimientos editando `motions.ts`:

```ts
export const DanceStep = [
    { t: 200, o: [ [0,20], [4,-20] ] },
    { t: 200, o: [ [0,-20], [4,20] ] }
]
```

Luego agrégalo al enum correspondiente en `index.ts`.

---

## Instalación en MakeCode

1. Abre MakeCode micro:bit  
2. Ve a **Extensiones**  
3. Ingresa la URL del repositorio GitHub  
4. Importa la extensión **kapakai-robot**

---

## Licencia

MIT License — libre para usar, modificar y extender.
