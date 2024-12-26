import react, { createContext, useEffect, useState } from "react";   //Importamos createContext

export const Contexto = createContext();   //creamos una instancia de createContext

const ContextoProvider = ({children}) => {  //creamos un componente el cual sera el que provea el contexto a la app y recibira como prop a los demas componentes
    const [consulta, setConsulta] = useState("")
    const [fotosDeGaleria, setFotosDeGaleria] = useState([])
    const [fotoSeleccionada, setFotoSeleccionada] = useState(null)


    useEffect(()=>{
        const funcionApi = async () => {
        const solicitud = await fetch("http://localhost:3000/fotos")
        const solicitudJson = await solicitud.json()
        console.log(solicitudJson)
        return setFotosDeGaleria([...solicitudJson])
        }

        funcionApi()
    },[])


    const alAlternarFavorito = (foto) => {
        if (foto.id === fotoSeleccionada?.id) {
        setFotoSeleccionada({
            ...fotoSeleccionada,
            favorita: !fotoSeleccionada.favorita
        })
        }

        setFotosDeGaleria(fotosDeGaleria.map(fotoDeGaleria => {
        return {
            ...fotoDeGaleria,
            favorita: fotoDeGaleria.id === foto.id ? !foto.favorita : fotoDeGaleria.favorita
        }
        }))
    }
   
   return (
   <Contexto.Provider value={{consulta, setConsulta, fotosDeGaleria, setFotosDeGaleria, fotoSeleccionada, setFotoSeleccionada, alAlternarFavorito}}>  
        {children}
    </Contexto.Provider>
   )
}

export default ContextoProvider