import {
  doc,
  getDoc,
} from "firebase/firestore/lite";
import { db } from "../conectadb";
import { useParams } from "react-router-dom";


const BuscarTotalAvaliacoes = async () =>{    
    const { id } = useParams();

    const docRef = doc(db, "hostel", id);
    const docSnap = await getDoc(docRef);
    const numtotalavaliacoes =  +docSnap.data().numtotalavaliacoes
   
    
    console.log("Buscar total avaliacoes", numtotalavaliacoes)
    
    return numtotalavaliacoes
}

export default BuscarTotalAvaliacoes;