import { useState } from 'react'
import './assets/css/App.css'

function App() {

    return (
    <>
    <section id="inicio" class="section inicio-section">
      <div>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu" class="pikachu-img" />
      </div>
      <div className="text-inicio">
        <h1 class="title">PokeApi React</h1>
        <p class="description">¡Bienvenido a PokeApi React! Aquí podrás encontrar información sobre tus pokemones favoritos. ¡Haz click en el botón de abajo para comenzar!</p>
        <a href="/pokemon" class="Btn-inicio">Comenzar</a>
      </div>
    </section>
    </>
  )
}

export default App
