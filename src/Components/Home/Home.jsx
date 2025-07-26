import React from 'react'
import Products from '../Products/Products'
import MySlider from '../MySlider/MySlider'

export default function Home() {
    return (
        <>
            <div className="container">
                <MySlider/>
                <Products/>
            </div>
        </>
    )
}
