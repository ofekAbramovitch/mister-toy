import React from 'react'
import { Route, Routes } from 'react-router'
import { Header } from './cmps/header'
import { ToyIndex } from './pages/toy-index'
import { ToyEdit } from './pages/toy-edit'
import { ToyDetails } from './pages/toy-details'
import { HomePage } from './pages/home-page'
import { UserMsg } from './cmps/user-msg'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { Chart } from './pages/dashboard'

export function App() {
  return (
    <Provider store={store}>
      <main className="main-toy-app">
        <Header />
        <Routes>
          <Route element={<ToyDetails />} path="/toy/details/:toyId" />
          <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
          <Route element={<ToyEdit />} path="/toy/edit" />
          <Route element={<ToyIndex />} path="/toy" />
          <Route element={<HomePage />} path="/" />
          <Route element={<Chart />} path="/chart" />
        </Routes>
        <UserMsg />
      </main >
    </Provider>
  )
}


