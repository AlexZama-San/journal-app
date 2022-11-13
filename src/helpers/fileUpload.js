
export const fileUpload = async (file) => {
    if (!file) throw new Error('file not found')

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dn9cihky8/upload'
    const formData = new FormData()

    formData.append('upload_preset', 'ImagesReact')
    formData.append('file', file)

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        console.log(resp);

        if (!resp.ok) {
            throw new Error('Error uploading image')
        }
        const cloudResponse = await resp.json()

        return cloudResponse.secure_url

    } catch (error) {
        throw new Error(error.message)
    }
}