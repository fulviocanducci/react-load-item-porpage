const url = {
    api(page, limit) {
        return `https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=${limit}`;
    }
}

export default url;