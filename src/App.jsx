import { useState } from 'react'
import './assets/css/App.css'

function App() {

    return (
    <div className='contenedor-incio'>
        <div className='container'>
          <section id="inicio" class="section inicio-section">
          <div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu" class="pikachu-img" />
          </div>
          <div className="text-inicio">
            <h1 class="title">PokeGame</h1>
            <p class="description">¡Bienvenido a PokeGame React! Aquí podrás encontrar información sobre tus pokemones favoritos. ¡Haz click en el botón de abajo para comenzar!</p>
            <p>¡Encuentra a tu Pokemon favorito ahora!</p>
            <a href="/pokemon" class="Btn-inicio">Comenzar</a>
          </div>
        </section>
      </div>
      <div className='container'>
        <section id="inicio" class="section inicio-section">
          <div className="text-inicio">
              <h1 class="title">PokeGame</h1>
              <p class="description">Proyecto desarrollado con React y Firebase</p>
              <p>¿Quieres ser el Top 1 adivinando Pokemons?</p>
              <p>¡Adivina el Pokemon!</p>
              <a href="/juegoAdivinar" class="Btn-inicio">¡Jugar!</a>
            </div>
            <div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Pikachu" class="pikachu-img" />
            </div>
        </section>
      </div>
    </div>
  )
}

export default App
