namespace kapakai.halloween {

    let personalGroup = 0      // grupo del joven
    let eventGroup = 99        // grupo global del evento
    let witchGroup = 55        // grupo de la bruja / zona zombie

    let mode = "NORMAL"        // NORMAL / EVENT / WITCH

    // ---------------------------------------------------------
    // CONFIGURAR GRUPOS
    // ---------------------------------------------------------

    //% block="kapakai Halloween set grupo personal %group"
    export function setPersonalGroup(group: number) {
        personalGroup = group
        radio.setGroup(group)
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

        radio.onReceivedString(function (cmd) {

            // -------------------------------------------------
            // 1. ENTRAR EN ZONA ZOMBIE (POSESIÓN)
            // -------------------------------------------------

            if (cmd == "ENTER_ZOMBIE_ZONE") {
                mode = "WITCH"
                radio.setGroup(witchGroup)

                // movimiento de peligro
                kapakai.playZombie(kapakai.MotionZombie.ZombieWalk)
            }

            // -------------------------------------------------
            // 2. LIBERACIÓN POR PALANCA / PUZZLE
            // -------------------------------------------------

            if (cmd == "LEVER_RECOVER") {
                mode = "NORMAL"
                radio.setGroup(personalGroup)

                // movimiento de celebración
                kapakai.playZombie(kapakai.MotionZombie.LiberationJoy)
            }

            // -------------------------------------------------
            // 3. EVENTO GLOBAL (POSESIÓN MASIVA)
            // -------------------------------------------------

            if (cmd == "EVENT_OVERRIDE") {
                mode = "EVENT"
                radio.setGroup(eventGroup)

                kapakai.playSpecial(kapakai.MotionSpecial.Neutral)
            }

            // -------------------------------------------------
            // 4. FIN DEL EVENTO GLOBAL
            // -------------------------------------------------

            if (cmd == "EVENT_END") {
                mode = "NORMAL"
                radio.setGroup(personalGroup)

                kapakai.playZombie(kapakai.MotionZombie.LiberationJoy)
            }

            // -------------------------------------------------
            // 5. COMANDOS SEGÚN EL MODO
            // -------------------------------------------------

            // MODO BRUJA / ZOMBIE
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

            // MODO NORMAL
            if (mode == "NORMAL") {
                // El robot escucha solo al joven (grupo personal)
            }
        })
    }
}
