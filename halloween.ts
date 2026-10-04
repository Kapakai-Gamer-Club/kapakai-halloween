namespace kapakai.halloween {

    let personalGroup = 0
    let eventGroup = 99
    let witchGroup = 55

    let mode = "NORMAL"   // NORMAL / EVENT / WITCH

    // ---------------------------------------------------------
    // CONFIGURAR GRUPOS
    // ---------------------------------------------------------

    //% block="kapakai Halloween set grupo personal %group"
    export function setPersonalGroup(group: number) {
        personalGroup = group
        radio.setGroupNumber(group)
    }

    //% block="kapakai Halloween set grupo evento %group"
    export function setEventGroup(group: number) {
        eventGroup = group
    }

    //% block="kapakai Halloween set grupo bruja %group"
    export function setWitchGroup(group: number) {
        witchGroup = group
    }

    // ---------------------------------------------------------
    // ACTIVAR SISTEMA HALLOWEEN
    // ---------------------------------------------------------

    //% block="kapakai Halloween activar sistema"
    export function enableHalloweenSystem() {

        radio.onReceivedString(function (cmd: string) {

            // 1. ENTRAR EN ZONA ZOMBIE
            if (cmd == "ENTER_ZOMBIE_ZONE") {
                mode = "WITCH"
                radio.setGroupNumber(witchGroup)
                kapakai.playZombie(kapakai.MotionZombie.ZombieWalk)
            }

            // 2. LIBERACIÓN
            if (cmd == "LEVER_RECOVER") {
                mode = "NORMAL"
                radio.setGroupNumber(personalGroup)
                kapakai.playZombie(kapakai.MotionZombie.LiberationJoy)
            }

            // 3. EVENTO GLOBAL
            if (cmd == "EVENT_OVERRIDE") {
                mode = "EVENT"
                radio.setGroupNumber(eventGroup)
                kapakai.playSpecial(kapakai.MotionSpecial.Neutral)
            }

            // 4. FIN DEL EVENTO GLOBAL
            if (cmd == "EVENT_END") {
                mode = "NORMAL"
                radio.setGroupNumber(personalGroup)
                kapakai.playZombie(kapakai.MotionZombie.LiberationJoy)
            }

            // 5. COMANDOS SEGÚN MODO

            // MODO BRUJA
            if (mode == "WITCH") {
                if (cmd == "ZOMBIE_WALK")
                    kapakai.playZombie(kapakai.MotionZombie.ZombieWalk)

                if (cmd == "ZOMBIE_ATTACK")
                    kapakai.playLegs(kapakai.MotionLegs.KickLeft)

                if (cmd == "ZOMBIE_ARMS")
                    kapakai.playArms(kapakai.MotionArms.RaiseArms)
            }

            // MODO EVENTO GLOBAL
            if (mode == "EVENT") {
                if (cmd == "GLOBAL_STEP")
                    kapakai.playSpecial(kapakai.MotionSpecial.Breathing)
            }

            // MODO NORMAL → no hace nada especial
        })
    }
}
