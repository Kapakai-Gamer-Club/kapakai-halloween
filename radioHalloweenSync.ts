namespace kapakaiHalloweenSync {

    let pendingMotion = ""   // movimiento pendiente de ejecutar

    // ---------------------------------------------------------
    // INICIALIZAR RADIO
    // ---------------------------------------------------------

    //% block="kapakai Halloween Sync iniciar grupo %group"
    export function init(group: number) {
        radio.setGroup(group)
    }

    // ---------------------------------------------------------
    // TRANSMISOR: ENVIAR PASO DE COREOGRAFÍA
    // ---------------------------------------------------------

    //% block="kapakai Halloween Sync enviar paso %cmd"
    export function sendStep(cmd: kapakai.MotionZombie) {

        let text = ""

        switch(cmd) {
            case kapakai.MotionZombie.ZombieWalk:
                text = "ZOMBIE_WALK"
                break

            case kapakai.MotionZombie.LiberationJoy:
                text = "LIBERATION_JOY"
                break
        }

        radio.sendString("STEP:" + text)
    }

    // ---------------------------------------------------------
    // TRANSMISOR: ENVIAR TICK DE SINCRONIZACIÓN
    // ---------------------------------------------------------

    //% block="kapakai Halloween Sync enviar TICK"
    export function sendTick() {
        radio.sendString("TICK")
    }

    // ---------------------------------------------------------
    // RECEPTOR: ACTIVAR COREOGRAFÍAS SINCRONIZADAS
    // ---------------------------------------------------------

    //% block="kapakai Halloween Sync activar coreografías"
    export function enableReceiver() {

        radio.onReceivedString(function (cmd) {

            // -----------------------------------------
            // PASO DE COREOGRAFÍA (se guarda)
            // -----------------------------------------

            if (cmd.startsWith("STEP:")) {

                pendingMotion = cmd.substr(5)

                //  RESET AUTOMÁTICO ANTES DEL TICK
                kapakai.playSpecial(kapakai.MotionSpecial.Neutral)
            }

            // -----------------------------------------
            // TICK → ejecutar movimiento pendiente
            // -----------------------------------------

            if (cmd == "TICK" && pendingMotion != "") {

                //  MOVIMIENTO ZOMBIE (PELIGRO)
                if (pendingMotion == "ZOMBIE_WALK")
                    kapakai.playZombie(kapakai.MotionZombie.ZombieWalk)

                //  MOVIMIENTO DE LIBERACIÓN (GOZO)
                if (pendingMotion == "LIBERATION_JOY")
                    kapakai.playZombie(kapakai.MotionZombie.LiberationJoy)

                pendingMotion = "" // limpiar
            }
        })
    }
}
