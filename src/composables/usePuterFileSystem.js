import puter from '@heyputer/puter.js'

/**
 * Composable for Puter.js file operations
 */
export function usePuterFileSystem() {
    const uploadFile = async (file) => {
        try {
            const uploadedFile = await puter.fs.upload(file)
            return uploadedFile
        } catch (error) {
            console.error('File upload failed:', error)
            throw new Error('Fehler beim Hochladen der Datei')
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
