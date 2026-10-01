import { useState } from 'react'
import Inicio from './components/basicos/Inicio'
import './App.css'
const secciones = [
  { id: 'inicio', titulo: 'inicio' },
  { id: 'catalogo', titulo: 'catalogo' },
  {id: 'misbuilds',titulo: 'misbuilds'},
  {id: 'compatibilidad',titulo: 'compatibilidad'},
  {id: 'cotizacion',titulo: 'cotizacion'},
]

function App() {
 return (
 <main>
  <Inicio />

 <h1>Hola, React</h1>
 <p>Mi primera aplicacion.</p>
 </main>
 )
 }

 export default App;