import { toyService } from "../../services/toy.service.js"
import { store } from "../store.js"
import { userService } from "../../services/user.service.js"


export function getActionRemoveToy(toyId) {
    return {
        type: 'REMOVE_TOY',
        toyId
    }
}
export function getActionAddToy(toy) {
    return {
        type: 'ADD_TOY',
        toy
    }
}
export function getActionUpdateToy(toy) {
    return {
        type: 'UPDATE_TOY',
        toy
    }
}

export async function loadToys() {
    try {
        const toys = await toyService.query()
        console.log(' toys from DB:', toys)
        store.dispatch({
            type: 'SET_TOYS',
            toys
        })

    } catch (err) {
        console.log('Cannot load  toys', err)
        throw err
    }

}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch(getActionRemoveToy(toyId))
    } catch (err) {
        console.log('Cannot remove  toy', err)
        throw err
    }
}

export async function addToy(toy) {
    try {
        const savedToy = await toyService.save(toy)
        console.log('Added toy', savedToy)
        store.dispatch(getActionAddToy(savedToy))
        return savedToy
    } catch (err) {
        console.log('Cannot add toy', err)
        throw err
    }
}

export function updateToy(toy) {
    return toyService.save(toy)
        .then(savedToy => {
            console.log('Updated toy:', savedToy)
            store.dispatch(getActionUpdateToy(savedToy))
            return savedToy
        })
        .catch(err => {
            console.log('Cannot save toy', err)
            throw err
        })
}

export function addToCart(toy) {
    store.dispatch({
        type: 'ADD_TO_CART',
        toy
    })
}

export function removeFromCart(toyId) {
    store.dispatch({
        type: 'REMOVE_FROM_CART',
        toyId
    })
}

export async function checkout(total) {
    try {
        const score = await userService.changeScore(-total)
        store.dispatch({ type: 'SET_SCORE', score })
        store.dispatch({ type: 'CLEAR_CART' })
        return score
    } catch (err) {
        console.log('ToyActions: err in checkout', err)
        throw err
    }
}
