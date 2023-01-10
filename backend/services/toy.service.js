
const fs = require('fs')
const toys = require('../data/toy.json')

module.exports = {
    query,
    getById,
    save,
    remove
}

function query(filterBy, sort) {
    if (!filterBy) return Promise.resolve(toys)

    filterBy.maxPrice = (filterBy.maxPrice) ? filterBy.maxPrice : Infinity
    filterBy.minPrice = (filterBy.minPrice) ? filterBy.minPrice : -Infinity

    // TODO: ADD filter by tags.
    const filteredToys = toys.filter((toy) => {
        return toy.name.toLowerCase().includes(filterBy.search.toLowerCase()) &&
            (filterBy.type === 'All' || toy.type === filterBy.type) &&
            (toy.price <= filterBy.maxPrice && toy.price >= filterBy.minPrice) &&
            (filterBy.inStock === toy.inStock || !filterBy.inStock)
    })

    // sort either by price or by name - when sorting by string we need more 
    // complex conditions, thats for you to figure out ;)
    // we use the asc key in the sort to determin which way to sort
    // ascending or descending. so when we change the number to pos \ neg 
    // it will change the direction of the sort
    filteredToys.sort((toy1, toy2) => {
        const dir = sort.asc ? 1 : -1
        if (sort.by === 'price') return (toy1.price - toy2.price) * dir
        if (sort.by === 'name') return toy1.name.localeCompare(toy2.name) * dir
    })

    return Promise.resolve(filteredToys);
}

function getById(_id) {
    const toy = toys.find(toy => toy._id === _id)
    return Promise.resolve(toy);
}

function remove(_id) {
    const idx = toys.findIndex(toy => toy._id === _id)
    toys.splice(idx, 1);
    _saveToysToFile()
    return Promise.resolve();
}

function save(toy) {
    if (toy._id) {
        const idx = toys.findIndex(currToy => currToy._id === toy._id)
        toys[idx] = { ...toys[idx], ...toy }
    } else {
        toy.createdAt = new Date(Date.now());
        toy._id = _makeId();
        toys.unshift(toy);
    }
    _saveToysToFile();
    return Promise.resolve(toy);
}



function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveToysToFile() {
    fs.writeFileSync('data/toy.json', JSON.stringify(toys, null, 2));
}
