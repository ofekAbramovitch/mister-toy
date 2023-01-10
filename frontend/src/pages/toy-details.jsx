import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"

import { showErrorMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'

export function ToyDetails() {
    const [toy, setToy] = useState(null)

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    })

    function loadToy() {
        toyService.getById(toyId)
            .then(setToy)
            .catch((err) => {
                showErrorMsg('Cant load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    return (
        <div className="toy-details">
            <h2>Name: <span>{toy.name}</span></h2>
            <h2>Price: <span>{toy.price}</span></h2>
            <h2>Type: <span>{toy.type}</span></h2>
            <h2>Created at: <span>{toy.createdAt}</span></h2>
            <h2>In Stock: <span>{(toy.inStock) ? 'yes' : 'no'}</span></h2>
        </div>
    )
}



