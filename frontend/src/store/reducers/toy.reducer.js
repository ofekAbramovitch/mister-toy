const initialState = {
    toys: [],
    cart:[],
    lastRemovedToy: null
}
export function toyReducer(state = initialState, action) {
    var newState = state
    var toys
    var cart
    switch (action.type) {
        case 'SET_TOYS':
            newState = { ...state, toys: action.toys }
            break
        case 'REMOVE_TOY':
            const lastRemovedToy = state.toys.find(toy => toy._id === action.toyId)
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            newState = { ...state, toys, lastRemovedToy}
            break
        case 'ADD_TOY':
            newState = { ...state, toys:[...state.toys, action.toy]}
            break
        case 'UPDATE_TOY':
            toys = state.toys.map(toy => (toy._id === action.toy._id)? action.toy : toy)
            newState = { ...state, toys}
            break
        case 'ADD_TO_CART':
            newState = { ...state, cart:[...state.cart, action.toy]}
            break
        case 'REMOVE_FROM_CART':
            cart = state.cart.filter(toy => toy._id !== action.toyId)
            newState = { ...state, cart}
            break
        case 'CLEAR_CART':
            newState = { ...state, cart: []}
            break
        case 'UNDO_REMOVE_TOY':
            if (state.lastRemovedToy) {
                newState = { ...state, toys: [...state.toys, state.lastRemovedToy], lastRemovedToy: null}
            }
            break
        default:
    }
    return newState
}
