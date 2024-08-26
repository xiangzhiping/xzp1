import server from '../utils/requester.js'

export const personalAvatarLinkGet = async () => {
    return await server.get('/xzp/personal/avatar/download/link/get')
}


export const personalAvatarDownload = async (url) => {
    return await server.get(url, {}, {responseType: 'blob'})
}


export const personalAvatarUpload = async (file) => {
    return server.post('/xzp/personal/avatar/upload', file)
}
