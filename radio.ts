namespace kapakaiRadio {

    // ---------------------------------------------------------
    // ENUM PARA DROPDOWN
    // ---------------------------------------------------------

    //% block="Radio Command"
    export enum RadioCommand {
        WalkForward,
        WalkBack,
        ArmsRaise,
        ArmsWaveLeft,
        ArmsWaveRight,
        KickLeft,
        KickRight,
        Neutral,
        Breathing
    }

    // ---------------------------------------------------------
    // INICIALIZAR RADIO
    // ---------------------------------------------------------

    //% block="radio kapakai iniciar grupo %group"
    export function init(group: number) {
        radio.setGroupNumber(group)
    }

    // ---------------------------------------------------------
    // ENVIAR COMANDO
    // ---------------------------------------------------------

    //% block="radio kapakai enviar movimiento %cmd"
    export function sendCommand(cmd: RadioCommand) {
        switch(cmd) {

            case RadioCommand.WalkForward: radio.sendString("WALK_FORWARD"); break
            case RadioCommand.WalkBack: radio.sendString("WALK_BACK"); break

            case RadioCommand.ArmsRaise: radio.sendString("ARMS_RAISE"); break
            case RadioCommand.ArmsWaveLeft: radio.sendString("ARMS_WAVE_LEFT"); break
            case RadioCommand.ArmsWaveRight: radio.sendString("ARMS_WAVE_RIGHT"); break

            case RadioCommand.KickLeft: radio.sendString("KICK_LEFT"); break
            case RadioCommand.KickRight: radio.sendString("KICK_RIGHT"); break

            case RadioCommand.Neutral: radio.sendString("NEUTRAL"); break
            case RadioCommand.Breathing: radio.sendString("BREATHING"); break
        }
    }

    // ---------------------------------------------------------
    // ENVIAR SERVO + ÁNGULO
    // ---------------------------------------------------------

    //% block="radio kapakai enviar servo %index ángulo %angle"
    //% index.min=0 index.max=7
    //% angle.min=-90 angle.max=90
    export function sendServoAngle(index: number, angle: number) {
        radio.sendString("SERVO:" + index + ":" + angle)
    }

    // ---------------------------------------------------------
    // RECEPTOR
    // ---------------------------------------------------------

    //% block="radio kapakai activar movimientos"
    export function enableReceiver() {

        radio.onReceivedString(function (cmd: string) {

            // BASIC
            if (cmd == "WALK_FORWARD") kapakai.playBasic(kapakai.MotionBasic.WalkForward)
            if (cmd == "WALK_BACK") kapakai.playBasic(kapakai.MotionBasic.WalkBack)

            // ARMS
            if (cmd == "ARMS_RAISE") kapakai.playArms(kapakai.MotionArms.RaiseArms)
            if (cmd == "ARMS_WAVE_LEFT") kapakai.playArms(kapakai.MotionArms.WaveLeft)
            if (cmd == "ARMS_WAVE_RIGHT") kapakai.playArms(kapakai.MotionArms.WaveRight)

            // LEGS
            if (cmd == "KICK_LEFT") kapakai.playLegs(kapakai.MotionLegs.KickLeft)
            if (cmd == "KICK_RIGHT") kapakai.playLegs(kapakai.MotionLegs.KickRight)

            // SPECIAL
            if (cmd == "NEUTRAL") kapakai.playSpecial(kapakai.MotionSpecial.Neutral)
            if (cmd == "BREATHING") kapakai.playSpecial(kapakai.MotionSpecial.Breathing)

            // SERVO
            if (cmd.startsWith("SERVO:")) {
                let parts = cmd.split(":")
                let index = parseInt(parts[1])
                let angle = parseInt(parts[2])
                kapakai.setServo(index, angle)
            }
        })
    }
}
