//% block="Kapakai Robot" weight=100 color="#00A6FF" icon="\uf25b" 
namespace kapakai {

    // ---------------------------------------------------------
    // ENUMS POR CATEGORÍA (Dropdowns en MakeCode)
    // ---------------------------------------------------------
    //% group="Category"
    //% block="Basic Motion"
    export enum MotionBasic {
        WalkForward,
        WalkBack
    }
    //% group="Category"
    //% block="Arm Motion"
    export enum MotionArms {
        RaiseArms,
        WaveLeft,
        WaveRight
    }
    //% group="Category"
    //% block="Leg Motion"
    export enum MotionLegs {
        KickLeft,
        KickRight
    }
    //% group="Category"
    //% block="Special Motion"
    export enum MotionSpecial {
        Neutral,
        Breathing
    }
    //% group="Category"
    export enum MotionZombie {
        ZombieWalk,
        LiberationJoy
    }

    // ---------------------------------------------------------
    // BLOQUES PARA EJECUTAR MOVIMIENTOS
    // ---------------------------------------------------------
    //% group="Beginner Moves"
    //% block="play basic motion %motion"
    export function playBasic(motion: MotionBasic) {
        switch (motion) {
            case MotionBasic.WalkForward: motionPlayer.play("WalkForward"); break
            case MotionBasic.WalkBack: motionPlayer.play("WalkBack"); break
        }
    }
    //% group="Beginner Moves"
    //% block="play arm motion %motion"
    export function playArms(motion: MotionArms) {
        switch (motion) {
            case MotionArms.RaiseArms: motionPlayer.play("RaiseArms"); break
            case MotionArms.WaveLeft: motionPlayer.play("WaveLeft"); break
            case MotionArms.WaveRight: motionPlayer.play("WaveRight"); break
        }
    }
    //% group="Beginner Moves"
    //% block="play leg motion %motion"
    export function playLegs(motion: MotionLegs) {
        switch (motion) {
            case MotionLegs.KickLeft: motionPlayer.play("KickLeft"); break
            case MotionLegs.KickRight: motionPlayer.play("KickRight"); break
        }
    }
    //% group="Beginner Moves"
    //% block="play special motion %motion"
    export function playSpecial(motion: MotionSpecial) {
        switch (motion) {
            case MotionSpecial.Neutral: motionPlayer.play("Neutral"); break
            case MotionSpecial.Breathing: motionPlayer.play("Breathing"); break
        }
    }
    //% group="Customized Moves"
    //% block="set servo %index to %angle degrees"
    //% angle.min=-90 angle.max=90
    export function setServo(index: number, angle: number) {
        servoDriver.write(index, angle)
    }
    //% group="Customized Moves"
    //% block="play zombie/liberation motion %m"
    export function playZombie(m: MotionZombie) {
        switch(m) {
            case MotionZombie.ZombieWalk: motionPlayer.play("ZombieWalk"); break
            case MotionZombie.LiberationJoy: motionPlayer.play("LiberationJoy"); break
        }
    }
}
