export const getAllStates = async () => {
    const url = `http://localhost:9090/estados`

    const response = await fetch(url, { method: 'GET' })

    return await response.json()
}
