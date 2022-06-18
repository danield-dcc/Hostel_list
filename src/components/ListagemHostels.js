import React, { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../conectadb";
import ItemLista from './ItemLista';


const ListagemHostels = () => {

    const [hostels, setHostels] = useState([])
    // Get a list of cities from your database
    const getHostels = async () => {
        const hostelCol = collection(db, "hostel");
        const hostelSnapshot = await getDocs(hostelCol);
        const hostelList = hostelSnapshot.docs.map((doc) => {
            const dados = doc.data();
            const id = doc.id;
            //  console.log(doc.data().numtotalavaliacoes)
            return { id, ...dados }
        });
        setHostels(hostelList)
    }


    useEffect(() => {
        getHostels();
    }, []);


    return (

        <div className="container mt-2">
            <div className="card-columns ">
                {hostels.map(hostel => (
                    <ItemLista
                        key={hostel.id}
                        id={hostel.id}
                        cidade={hostel.cidade}
                        descricao={hostel.descricao}
                        nome={hostel.nome}
                        foto={hostel.foto}
                        numtotalavaliacoes={hostel.numtotalavaliacoes} />
                ))}
            </div>
        </div>
    )

}

export default ListagemHostels;