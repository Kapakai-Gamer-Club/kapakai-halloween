//% weight=100 color=#00A6FF icon="\uf085" block="Kapakai Robot"
namespace kapakai {

    // ---------------------------------------------------------
    // ENUMS POR CATEGORÍA (Dropdowns en MakeCode)
    // ---------------------------------------------------------

    //% block="Basic Motion"
    export enum MotionBasic {
        WalkForward,
        WalkBack
    }

    //% block="Arm Motion"
    export enum MotionArms {
        RaiseArms,
        WaveLeft,
        WaveRight
    }

    //% block="Leg Motion"
    export enum MotionLegs {
        KickLeft,
        KickRight
    }

    //% block="Special Motion"
    export enum MotionSpecial {
        Neutral,
        Breathing
    }

    // ---------------------------------------------------------
    // ZOMBIE + LIBERATION ENUM
    // ---------------------------------------------------------

    export enum MotionZombie {
        ZombieWalk,
        LiberationJoy
    }

    // ---------------------------------------------------------
    // BLOQUES PARA EJECUTAR MOVIMIENTOS
    // ---------------------------------------------------------

    //% block="play basic motion %motion"
    export function playBasic(motion: MotionBasic) {
        switch (motion) {
            case MotionBasic.WalkForward: motionPlayer.play("WalkForward"); break
            case MotionBasic.WalkBack: motionPlayer.play("WalkBack"); break
        }
    }

    //% block="play arm motion %motion"
    export function playArms(motion: MotionArms) {
        switch (motion) {
            case MotionArms.RaiseArms: motionPlayer.play("RaiseArms"); break
            case MotionArms.WaveLeft: motionPlayer.play("WaveLeft"); break
            case MotionArms.WaveRight: motionPlayer.play("WaveRight"); break
        }
    }

    //% block="play leg motion %motion"
    export function playLegs(motion: MotionLegs) {
        switch (motion) {
            case MotionLegs.KickLeft: motionPlayer.play("KickLeft"); break
            case MotionLegs.KickRight: motionPlayer.play("KickRight"); break
        }
    }

    //% block="play special motion %motion"
    export function playSpecial(motion: MotionSpecial) {
        switch (motion) {
            case MotionSpecial.Neutral: motionPlayer.play("Neutral"); break
            case MotionSpecial.Breathing: motionPlayer.play("Breathing"); break
        }
    }

    // ---------------------------------------------------------
    // BLOQUE DIRECTO PARA CONTROLAR SERVOS
    // ---------------------------------------------------------

    //% block="set servo %index to %angle degrees"
    //% angle.min=-90 angle.max=90
    export function setServo(index: number, angle: number) {
        servoDriver.write(index, angle)
    }

    // ---------------------------------------------------------
    // BLOQUE PARA ZOMBIE / LIBERATION
    // ---------------------------------------------------------

    //% block="play zombie/liberation motion %m"
    export function playZombie(m: MotionZombie) {
        switch(m) {
            case MotionZombie.ZombieWalk: motionPlayer.play("ZombieWalk"); break
            case MotionZombie.LiberationJoy: motionPlayer.play("LiberationJoy"); break
        }
    }
}

// ---------------------------------------------------------
// NUEVAS CATEGORÍAS PARA HALLOWEEN
// ---------------------------------------------------------

//% color="#FF7518" icon="\uf6e8" block="Kapakai Halloween"
namespace kapakai.halloween {
    // vacío — MakeCode solo necesita ver el namespace
}

//% color="#FF9F43" icon="\uf6e7" block="Kapakai Halloween Sync"
namespace kapakai.sync {
    // vacío — MakeCode solo necesita ver el namespace
}

//% block="Kapakai Radio" color="#6c5ce7" icon="\uf1eb"
namespace kapakai.radio {
    // bloques de radio
}