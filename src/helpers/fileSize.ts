export function byteToMb (byte: number = 0) {
    if (byte === 0) {
        return 0
    }

    return byte / Math.pow(1024, 2)
}
