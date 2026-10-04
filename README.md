##  Kapakai Robot — Extensión para micro:bit  
Sistema modular para controlar el robot Kapakai de 8 servos, incluyendo:

- **Movimientos básicos y avanzados**
- **Sistema Halloween (posesión, bruja, evento global)**
- **Coreografías sincronizadas (STEP + TICK)**
- **Control por radio (movimientos, servos, comandos narrativos)**

Compatible con **MakeCode para micro:bit**.

---

#  Arquitectura de la extensión

La extensión está organizada en **4 módulos**, cada uno con su propia categoría de bloques en MakeCode:

---

##  1. Kapakai Robot  
**Namespace:** `kapakai`  
**Archivo:** `index.ts`, `motions.ts`, `motionPlayer.ts`, `servoDriver.ts`

Incluye:

- Movimientos básicos (caminar, retroceder)  
- Movimientos de brazos  
- Movimientos de piernas  
- Movimientos especiales  
- Movimientos zombie / liberación  
- Control directo de servos  
- Enums para dropdowns  

---

##  2. Kapakai Halloween  
**Namespace:** `kapakai.halloween`  
**Archivo:** `halloween.ts`

Sistema narrativo para el evento Halloween:

- Entrar en zona zombie (posesión)  
- Salir de zona zombie  
- Entrar en evento global  
- Salir de evento global  
- Configurar grupos:
  - grupo personal  
  - grupo evento  
  - grupo bruja  
- Ejecutar movimientos según modo:
  - NORMAL  
  - WITCH  
  - EVENT  

---

##  3. Kapakai Sync  
**Namespace:** `kapakai.sync`  
**Archivo:** `sync.ts`

Coreografías sincronizadas:

- Enviar **STEP** (movimiento pendiente)  
- Enviar **TICK** (ejecutar movimiento)  
- Enviar **RESET**  
- Activar receptor de sincronización  
- Sistema de `pendingMotion`  
- Reset automático antes del TICK  

---

##  4. Kapakai Radio  
**Namespace:** `kapakai.radio`  
**Archivo:** `radio.ts`

Control por radio:

- Enviar movimientos desde dropdown  
- Enviar servo + ángulo  
- Activar receptor de radio  
- Interpretar comandos narrativos:
  - WALK_FORWARD  
  - ARMS_RAISE  
  - KICK_LEFT  
  - NEUTRAL  
  - BREATHING  
  - SERVO:index:angle  

---

#  Archivos incluidos

```
main.ts
index.ts
halloween.ts
sync.ts
radio.ts
servoDriver.ts
motionPlayer.ts
motions.ts
pxt.json
```

---

#  Instalación

En MakeCode:

1. Abrir un proyecto nuevo  
2. Ir a **Extensions**  
3. Pegar la URL del repositorio GitHub  
4. Esperar a que aparezcan las categorías:
   - Kapakai Robot  
   - Kapakai Halloween  
   - Kapakai Sync  
   - Kapakai Radio  

---

#  Ejemplo básico

```ts
kapakai.playBasic(kapakai.MotionBasic.WalkForward)
kapakai.halloween.enableHalloweenSystem()
kapakai.sync.enableReceiver()
kapakai.radio.enableReceiver()
```

---

#  Ejemplo Halloween

```ts
kapakai.halloween.setPersonalGroup(12)
kapakai.halloween.setWitchGroup(55)
kapakai.halloween.setEventGroup(99)

kapakai.halloween.enableHalloweenSystem()
```

---

#  Ejemplo Sync

```ts
kapakai.sync.init(42)
kapakai.sync.sendStep(kapakai.MotionZombie.ZombieWalk)
kapakai.sync.sendTick()
```

---

#  Ejemplo Radio

```ts
kapakai.radio.init(7)
kapakai.radio.sendCommand(kapakai.radio.RadioCommand.ArmsRaise)
kapakai.radio.sendServoAngle(3, -45)
```

---

#  Estructura de categorías en MakeCode

- **Kapakai Robot** → movimientos y servos  
- **Kapakai Halloween** → modos narrativos  
- **Kapakai Sync** → coreografías sincronizadas  
- **Kapakai Radio** → control remoto  

---

#  Notas técnicas

- Todos los módulos usan el namespace raíz `kapakai`.  
- Los sub-namespaces (`kapakai.halloween`, `kapakai.sync`, `kapakai.radio`) crean categorías separadas.  
- No se usan namespaces duplicados.  
- Todos los archivos están listados en `pxt.json`.  
- `main.ts` está vacío para compatibilidad con MakeCode.  

---


