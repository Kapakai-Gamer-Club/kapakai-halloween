//% block="Kapakai Sync" color="#FF9F43" icon="\uf6e7"
namespace kapakai.sync {

    let pendingMotion = ""

    // ---------------------------------------------------------
    // INICIALIZAR RADIO
    // ---------------------------------------------------------

    //% block="Kapakai Sync iniciar grupo %group"
    export function init(group: number) {
        radio.setGroupNumber(group)
    }

    // ---------------------------------------------------------
    // ENVIAR PASO
    // ---------------------------------------------------------

    //% block="Kapakai Sync enviar paso %cmd"
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
    // ENVIAR TICK
    // ---------------------------------------------------------

    //% block="Kapakai Sync enviar TICK"
    export function sendTick() {
        radio.sendString("TICK")
    }

    // ---------------------------------------------------------
    // RECEPTOR
    // ---------------------------------------------------------

    //% block="Kapakai Sync activar coreografías"
    export function enableReceiver() {

        radio.onReceivedString(function (cmd: string) {

            // STEP → guardar movimiento
            if (cmd.startsWith("STEP:")) {
                pendingMotion = cmd.substr(5)
                kapakai.playSpecial(kapakai.MotionSpecial.Neutral)
            }

            // TICK → ejecutar movimiento
            if (cmd == "TICK" && pendingMotion != "") {

                if (pendingMotion == "ZOMBIE_WALK")
                    kapakai.playZombie(kapakai.MotionZombie.ZombieWalk)

                if (pendingMotion == "LIBERATION_JOY")
                    kapakai.playZombie(kapakai.MotionZombie.LiberationJoy)

                pendingMotion = ""
            }
        })
    }
}
