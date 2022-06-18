import React, { useState, useEffect } from 'react'
import './ListagemMedia.css'
import {
    collection,
    getDocs,
    query,
} from "firebase/firestore/lite";
import { db } from "../conectadb";

const ListagemMedia = (props) => {

    const [mediaIcons, setMediaIcons] = useState([])

    const buscaMedia = async () => {
        let sumAvaliacao = 0
        let contador = 0
        const hostelRef = query(collection(db, "hostel", props.id, "avaliacoes"));
        const querySnapshot2 = await getDocs(hostelRef);
        querySnapshot2.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //  console.log(doc.id, " subcollection BY ID Avaliação ==> ", doc.data().avaliacao);
            sumAvaliacao = sumAvaliacao + Number(doc.data().avaliacao)
            contador = contador + 1
        });

        let media = sumAvaliacao / contador
        media = aredondamento(media)
        //  setAvaliacaoMedia(media)

        icones(media)
        // return media
    };

    const aredondamento = (num) => {
        return Math.round(num * 2) / 2;
    }

    const icones = async (media) => {
        let mediaIcon = []
        const valorInteiro = Math.floor(media)
        if (valorInteiro > 0) {
            for (let i = 0; i < valorInteiro; i++) {
                mediaIcon.push(<i className="fas fa-star"></i>)
            }
            if (!Number.isInteger(media)) {
                mediaIcon.push(<i className="fas fa-star-half"></i>)
            }
        }

        setMediaIcons(mediaIcon)
        return mediaIcon
    }

    useEffect(() => {
        buscaMedia();
        icones();
    }, []);


    return (
        <div className="">
            {props.numtotalavaliacoes > 0 ?
                <p >Total de Avaliações: {props.numtotalavaliacoes}
                    <br />
                    Média: <span className="icon"> {mediaIcons}</span></p> :
                "Hostel ainda não avaliado"}
            <p></p>
        </div>
    )
}

export default ListagemMedia