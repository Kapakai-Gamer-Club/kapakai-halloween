namespace motionPlayer {

    /**
     * Ejecuta un movimiento por nombre usando los arrays optimizados
     */
    export function play(name: string) {
        let motion = getMotion(name)
        if (!motion) return

        for (let frame of motion) {
            // frame.o = lista de pares [servoIndex, angle]
            for (let pair of frame.o) {
                servoDriver.write(pair[0], pair[1])
            }
            basic.pause(frame.t)
        }
    }

    /**
     * Devuelve el movimiento correspondiente al nombre
     */
    function getMotion(name: string): any[] {
        switch (name) {

            // BASIC
            case "WalkForward": return motions.WalkForward
            case "WalkBack": return motions.WalkBack

            // ARMS
            case "RaiseArms": return motions.RaiseArms
            case "WaveLeft": return motions.WaveLeft
            case "WaveRight": return motions.WaveRight

            // LEGS
            case "KickLeft": return motions.KickLeft
            case "KickRight": return motions.KickRight

            // SPECIAL
            case "Neutral": return motions.Neutral
            case "Breathing": return motions.Breathing

            // MINECRAFT
            case "ZombieWalk": return motions.ZombieWalk
            case "LiberationJoy": return motions.LiberationJoy

        }

        return null
    }
}
