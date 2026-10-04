//% block="Kapakai Robot" weight=100 color="#00A6FF" icon="\uf25b" 
namespace motionPlayer {

    type MotionFrame = {
        t: number
        o: number[][]
    }

    export function play(name: string) {
        const motion = getMotion(name)
        if (!motion || motion.length == 0) return

        for (const frame of motion) {
            for (const pair of frame.o) {
                servoDriver.write(pair[0], pair[1])
            }
            basic.pause(frame.t)
        }
    }

    function getMotion(name: string): MotionFrame[] {
        switch (name) {
            case "WalkForward": return motions.WalkForward
            case "WalkBack": return motions.WalkBack

            case "RaiseArms": return motions.RaiseArms
            case "WaveLeft": return motions.WaveLeft
            case "WaveRight": return motions.WaveRight

            case "KickLeft": return motions.KickLeft
            case "KickRight": return motions.KickRight

            case "Neutral": return motions.Neutral
            case "Breathing": return motions.Breathing

            case "ZombieWalk": return motions.ZombieWalk
            case "LiberationJoy": return motions.LiberationJoy
        }

        return []
    }
}
