import puter from '@heyputer/puter.js'

/**
 * Composable for Puter.js file operations
 */
export function usePuterFileSystem() {
    const uploadFile = async (file) => {
        try {
            const uploadedFile = await puter.fs.write(file.name, file)
            return uploadedFile
        } catch (error) {
            console.error('File write failed:', error)
            throw new Error('Fehler beim Speichern der Datei')
        }
    }

    const deleteFile = async (path) => {
        try {
            await puter.fs.delete(path)
        } catch (error) {
            console.warn('File deletion failed (non-critical):', error)
        }
    }

    return {
        uploadFile,
        deleteFile
    }
}
