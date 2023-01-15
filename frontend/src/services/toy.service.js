import { httpService } from './http.service'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilterBy,
    getDefaultSort,
    getLabels,
    addToyMsg
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

function query(filterBy, sort) {
    return httpService.get('toy', { params: { filterBy, sort } })
}

function getLabels() {
    return labels
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

async function save(toy) {
    var savedToy
    if (toy._id) {
        savedToy = await httpService.put(`toy/${toy._id}`, toy)
    } else {
        savedToy = await httpService.post('toy', toy)
    }
    return savedToy
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        type: '',
        inStock: ''
    }
}

function getDefaultFilterBy() {
    return {
        search: '',
        maxPrice: Infinity,
        type: 'All',
        inStock: null
    }
}

function getDefaultSort() {
    return {
        by: 'name',
        asc: true
    }
}

async function addToyMsg(toyId, txt) {
    const savedMsg = await httpService.post(`toy/${toyId}/msg`, {txt})
    return savedMsg
}

