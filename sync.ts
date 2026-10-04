//% block="Kapakai Sync" color="#269a6f" icon="\uf6e7"
namespace kapakai.sync {

    let pendingMotion = ""

    // ---------------------------------------------------------
    // INICIALIZAR RADIO
    // ---------------------------------------------------------
    //% group="Config syncronization"
    //% block="Kapakai Sync iniciar grupo %group"
    export function init(group: number) {
        radio.setGroup(group || 1)
    }

    // ---------------------------------------------------------
    // ENVIAR PASO
    // ---------------------------------------------------------
    //% group="Send syncronized moves"
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
    //% group="Prepare for syncronization"
    //% block="Kapakai Sync enviar TICK"
    export function sendTick() {
        radio.sendString("TICK")
    }

    // ---------------------------------------------------------
    // RECEPTOR
    // ---------------------------------------------------------
    //% group="Activate coreography"
    //% block="Kapakai Sync activar coreografías"
    export function enableReceiver() {

        radio.onReceivedString(function (cmd: string) {

            // STEP → guardar movimiento
            if (cmd.substr(0, 5) == "STEP:") {
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
