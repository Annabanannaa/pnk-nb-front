export function isFilesEqual (first: File, second: File): boolean {
    return first.name === second.name &&
        first.size === second.size &&
        first.type === second.type &&
        first.lastModified === second.lastModified
}
