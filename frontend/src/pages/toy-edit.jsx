import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { MultiSelect } from '../cmps/multiselect'
import { toyService } from '../services/toy.service'
import { saveToy } from "../store/actions/toy.action"
import { showErrorMsg, showSuccessMsg } from './../services/event-bus.service'

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!toyId) return
        toyService.getById(toyId).then(toy => {
            setToyToEdit(toy)
        })
    }, [])

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        setToyToEdit({ ...toyToEdit, [field]: value })
    }

    function onSetLabels(labels) {
        setToyToEdit({ ...toyToEdit, labels })
    }

    function onSave(ev) {
        ev.preventDefault()

        const newToy = {
            ...toyToEdit,
            inStock: (toyToEdit.inStock === 'true') ? true : false
        }
        
        saveToy(newToy)
            .then(() => {
                showSuccessMsg('Toy saved successfully')
                navigate('/toy')
            })
            .catch(err => {
                showErrorMsg('Can not save toy, please try again')
            })
    }

    function getYesNo() {
        return toyToEdit.inStock
    }

    if (!toyToEdit) return <div>Loading...</div>
    return (
        <form onSubmit={onSave} className="container edit-form" action="">
            <div>
                <label>
                    <span>Name</span>
                    <input
                        className="edit-input name-input"
                        value={toyToEdit.name}
                        onChange={handleChange}
                        type="text"
                        name="name" />
                </label>
            </div>
            <div>
                <label>
                    <span>Price</span>
                    <input
                        className="edit-input price-input"
                        value={toyToEdit.price}
                        onChange={handleChange}
                        type="number"
                        name="price" />
                </label>
            </div>
            <div>
                <MultiSelect onSetLabels={onSetLabels} />
                {/* <select value={toyToEdit.type || '1'} onChange={handleChange} name="type" className='edit-input'>
                    <option value={'1'} disabled>
                        Type
                    </option>
                    <option value="Funny">Funny</option>
                    <option value="Adult">Adult</option>
                    <option value="Educational">Educational</option>
                </select> */}
            </div>
            <div>
                <select value={getYesNo() || '1'} onChange={handleChange} name="inStock" className='edit-input'>
                    <option value={'1'} disabled>
                        In Stock
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <button onClick={onSave} className="save-toy-btn">Save</button>
        </form>
    )
}