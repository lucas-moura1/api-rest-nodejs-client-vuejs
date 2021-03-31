export const getAllDatas = async (endPoint) => {
    const url = `http://localhost:9090/${endPoint}`

    const response = await fetch(url, { method: 'GET' })

    return await response.json()
}
