import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  collectionGroup,
  updateDoc,
} from "firebase/firestore/lite";
import { db } from "../conectadb";
import { useForm } from "react-hook-form";
import BuscarTotalAvaliacoes from "./BuscarTotalAvaliacoes";

const Avaliacao = () => {
  // console.log("Avaliação", BuscarTotalAvaliacoes());

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [hostel, setHostel] = useState({});
  const [aviso, setAviso] = useState("");
  let [count, setCount] = useState(
    BuscarTotalAvaliacoes().then((res) => {
      count = res;
    })
  );

  const onSubmit = async (data) => {
    // const docRef = await(doc(db, "hostel", id, "avaliacoes"), data);

    try {
      const docRef2 = data;
      console.log(docRef2.email);
      const testeEmail = docRef2.email;
      console.log("teste email", testeEmail);
      // const pesquisaEmail = busca(docRef2.email)
      const q = query(
        collectionGroup(db, "avaliacoes"),
        where("email", "==", testeEmail)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        
        if (testeEmail === doc.data().email) {
          throw new Error("...Email já utilizado");
        }
      });

      const docRef = await addDoc(
        collection(db, "hostel", id, "avaliacoes"),
        data
      );

      setAviso(`Ok! Avaliação cadastrada com sucesso! Código: ${docRef.id}`);
      Updatecontagem(id);
    } catch (erro) {
      // console.log(erro)
      setAviso(`${erro}`);
    }

    setValue("nome", "");
    setValue("email", "");
    setValue("avaliacao", "");
  };



  const Updatecontagem = async (id) => {
    setCount(count + 1);

    const countRef = doc(db, "hostel", id);
    await updateDoc(countRef, {
      numtotalavaliacoes: count + 1,
    });
  };



  const getHostels = async (id) => {
    const docRef = doc(db, "hostel", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setHostel({ id: docSnap.id, ...docSnap.data() });
    } else {
      // doc.data() will be undefined in this case
      console.log("Erro! Hostel não encontrado!");
    }
  };

  useEffect(() => {
    getHostels(id);
  }, [id]);



  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 mt-2">
            <div className="card">
              <img
                src={hostel.foto}
                className="card-img-top img-fluid"
                alt="Foto do Hostel"
              />
              <div className="card-body">
                <h4>{hostel.nome}</h4>
                <h6>Cidade: {hostel.cidade}</h6>
                <p className="card-text">{hostel.descricao}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 mt-2">
            <h1 className="display-4">Deixe uma avaliação!!</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Seu nome completo"
                  id="nome"
                  {...register("nome", {
                    required: true,
                    minLength: 10,
                    maxLength: 30,
                  })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Seu email"
                  id="email"
                  {...register("email", {
                    required: true,
                    minLength: 10,
                    maxLength: 30,
                  })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="avaliacao">Avaliação:</label>
                <select
                  className="form-control"
                  {...register("avaliacao", { required: true })}
                >
                  <option>--Selecione um valor--</option>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                  <option value="3.5">3.5</option>
                  <option value="4">4</option>
                  <option value="4.5">4.5</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div
                className={
                  (errors.nome || errors.email || errors.avaliacao) &&
                  "alert alert-danger mt-3"
                }
              >
                {(errors.nome || errors.email) && (
                  <span>Preencha todos os campos;</span>
                )}
                {errors.valor && (
                  <span> Selecione uma avaliação mínima...</span>
                )}
              </div>
              <div className={aviso && "alert alert-success mt-3"}>
                {aviso && <span>{aviso}</span>}
              </div>
              <Link to="/" className="btn btn-danger float-left mt-3">
                Voltar
              </Link>
              <button
                type="submit"
                className="btn btn-primary float-right mt-3"
              // onClick={Updatecontagem}
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avaliacao;
