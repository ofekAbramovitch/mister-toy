import React from 'react'

export function ToyFilter({ handleChange, filterBy }) {
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
        </form>
    </div>
}

