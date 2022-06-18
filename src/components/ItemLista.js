import React from 'react'
import { Link } from "react-router-dom"
import ListagemMedia from './ListagemMedia';
import './ItemLista.css'


const ItemLista = (props) => {
   


    return (

        <div className="card" key={props.id}>
            <img className="card-img-top" src={props.foto} alt="Foto do Hostel" />
            <div className="card-body">
                <h4>{props.nome}</h4>
                <p>Cidade: {props.cidade}</p>
                <p className="descricao">{props.descricao}</p>

                <p></p>

                <ListagemMedia id={props.id} numtotalavaliacoes={props.numtotalavaliacoes}/>
                <Link to={`/avaliacao/${props.id}`} className="btn btn-block btn-info">
                    Avaliar
                </Link>
            </div>
        </div>
    )
}

export default ItemLista;