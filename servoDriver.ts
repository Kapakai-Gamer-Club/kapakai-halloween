namespace servoDriver {

    // Dirección I2C del PCA9685 en la placa para servos
    const PCA_ADDR = 0x6A

    // Registro base para los canales de servo
    const SERVO_BASE = 0x08

    let initialized = false

    /**
     * Inicializa el PCA9685 si aún no está inicializado
     */
    function init() {
        if (initialized) return
        initialized = true

        // Modo 1: reset
        pins.i2cWriteNumber(PCA_ADDR, 0x00, NumberFormat.UInt8LE)
        pins.i2cWriteNumber(PCA_ADDR, 0x10, NumberFormat.UInt8LE)

        // Frecuencia PWM = 50 Hz (para servos)
        pins.i2cWriteNumber(PCA_ADDR, 0xFE, NumberFormat.UInt8LE)
        pins.i2cWriteNumber(PCA_ADDR, 0x85, NumberFormat.UInt8LE)

        // Salir del modo sleep
        pins.i2cWriteNumber(PCA_ADDR, 0x00, NumberFormat.UInt8LE)
        pins.i2cWriteNumber(PCA_ADDR, 0x00, NumberFormat.UInt8LE)
    }

    /**
     * Escribe un ángulo a un servo específico
     * @param index número de servo (0–15)
     * @param angle ángulo en grados (-90 a 90)
     */
    export function write(index: number, angle: number) {
        init()

        // Convertir ángulo a pulso PWM
        // Mapeo rápido y ligero para micro:bit
        let pwm = Math.map(angle, -90, 90, 100, 500)

        let low = pwm & 0xFF
        let high = (pwm >> 8) & 0xFF

        // Registro ON_L
        pins.i2cWriteBuffer(PCA_ADDR, pins.createBufferFromArray([
            SERVO_BASE + index * 4,
            low
        ]))

        // Registro ON_H
        pins.i2cWriteBuffer(PCA_ADDR, pins.createBufferFromArray([
            SERVO_BASE + index * 4 + 1,
            high
        ]))
    }
}
