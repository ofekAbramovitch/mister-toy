
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ToyList } from '../cmps/toy-list'
import { ToyFilter } from '../cmps/toy-filter'
import { loadToys, removeToy } from '../store/actions/toy.action'
import { toyService } from '../services/toy.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ToySort } from '../cmps/toy-sort'

export function ToyIndex() {
    const toys = useSelector((state) => state.toyModule.toys)

    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilterBy())
    const [sort, setSort] = useState(toyService.getDefaultSort())

    useEffect(() => {
        async function fetchToys() {
            try {
                await loadToys(filterBy, sort)
                console.log('Loaded successfully')
            } catch (err) {
                showErrorMsg('Oops.. something went wrong, try again')
            }

        }
        fetchToys()
    }, [filterBy, sort])

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed successfully')
        } catch (err) {
            showErrorMsg('Cant remove toy, try again.')
        }
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = (field === "inStock") ? ev.target.checked : ev.target.value
        setFilterBy({ ...filterBy, [field]: value })
    }

    function onSetSort(sort) {
        setSort(sort)
    }

    if (!toys) return <div>Loading...</div>
    return (
        <div className="toy-app">
            <section className="main-control-container">
                <NavLink to="/toy/edit" className="btn-add">Add Toy</NavLink>

                <ToyFilter filterBy={filterBy} handleChange={handleChange} />
                <ToySort sort={sort} onSetSort={onSetSort} />
            </section>

            <ToyList toys={toys} onRemove={onRemoveToy} />
        </div>
    )
}



