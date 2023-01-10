import React from 'react'
import { NavLink } from 'react-router-dom'

export function ToyPreview({ toy, onRemove }) {
    return (
        <div className="toy-card">
            <button onClick={() => onRemove(toy._id)} className="btn-remove">X</button>
            <div className='toy-name'>
                {toy.name}
            </div>
            <div className='toy-type'>
                {toy.type}
            </div>

            <img src={`https://robohash.org/${toy.name}?set=set2`} alt="" />

            <div>
                In Stock: {(toy.inStock) ? 'Yes' : 'No'}
            </div>
            <div>
                Price: {`${toy.price}`}
            </div>

            <section className="toy-prev-btns">
                <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink>
                <NavLink to={`/toy/details/${toy._id}`}>Details</NavLink>
            </section>
        </div>
    )
}
