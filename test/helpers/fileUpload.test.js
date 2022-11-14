import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'dn9cihky8',
    api_key: '898973635531656',
    api_secret: 'uumoycHhiIxk_tGteTmlFLtnlJM',
    secure: true
})

describe('pruebas en carga de archivos', () => {
    
    test('debe de subir el archivo correctamente a cloudinary', async() => {
        
        const imageUrl = 'https://th.bing.com/th/id/OIP.Q3i9MlwoLYZVv9gqRRaDgAHaJO?pid=ImgDet&rs=1'
        const resp = await fetch(imageUrl)
        const blob = await resp.blob()
        const file = new File([blob], 'foto.jpg')

        const url = await fileUpload(file)
        expect(typeof url).toBe('string')

        // Borrar imagen por id

        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')
        await cloudinary.api.delete_resources(['JournalApp/'+imageId])



    });

    test('debe retornar null', async() => {
        const file = new File([], 'foto.jpg')
        const url = await fileUpload(file)
        expect(url).toBe(null)
    });

});