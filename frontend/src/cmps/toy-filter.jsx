import React from 'react'
import { useEffect, useRef, useState } from "react"
import Select from "react-select"

import { toyService } from "../services/toy.service.js"

export function ToyFilter({ handleChange, filterBy }) {
    const [selectedOptions, setSelectedOptions] = useState()

    function handleSelect(labels) {
        setSelectedOptions(labels)
        const labelsToSet = labels.length ? labels.map(i => i.value) : []
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, label: labelsToSet }))
    }

    return <div className="filter-container">
        <form className={'form-filter'}>
            <label className='filter-label'>
                <span className='filter-label'>Search</span>
                <input
                    value={filterBy.search}
                    onChange={handleChange}
                    type="search"
                    className="search-input"
                    name="search" />
            </label>
            <label className='filter-label'>
                <span className='filter-label'>Min-price</span>
                <input
                    onChange={handleChange}
                    type="number"
                    className="min-price"
                    name="minPrice" />
            </label>
            <label className='filter-label'>
                <span className='filter-label'>Max-price</span>
                <input
                    onChange={handleChange}
                    type="number"
                    className="max-price"
                    name="maxPrice" />
            </label>
            <label className='filter-label'>
                <span className='filter-label'>Filter By</span>
                <select
                    onChange={handleChange}
                    name="type"
                    value={filterBy.type}>
                    <option value="All"> None </option>
                    <option value="Funny">Funny</option>
                    <option value="Adult">Adult</option>
                    <option value="Educational">Educational</option>
                </select>
            </label>
            <label className='filter-label'>
                <span className='filter-label'>In stock</span>
                <input
                    type="checkbox"
                    onChange={handleChange}
                    name="inStock"
                    className="check-box"
                />
            </label>
            <Select
                options={toyService.getLabels().map((label) => ({ value: label, label }))}
                placeholder="Select labels"
                value={selectedOptions}
                onChange={handleSelect}
                isMulti={true}
            />
        </form>
    </div>
}

