export const getAllCities = async () => {
    const url = `http://localhost:9090/cidades`

    const response = await fetch(url, { method: 'GET' })

    return await response.json()
}
