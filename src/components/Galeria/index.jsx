import styled from "styled-components"
import Titulo from "../Titulo"
import Populares from "./Populares"
import Tag from "./Tags"
import Imagen from "./Imagen"
import { use, useContext } from "react"
import { Contexto } from "../../Contexto/Contexto"

const GaleriaContainer = styled.div`
display: flex;
gap: 24px;
`

const SeccionFluida = styled.section`
flex-grow: 1;
`
const ImagenesContainer = styled.section`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
`


const Galeria = ({alSeleccionarFoto}) => {
    const {fotosDeGaleria, consulta, alAlternarFavorito, setFotoSeleccionada} = useContext(Contexto)
    return (
        <>
            <Tag />
            <GaleriaContainer>
                <SeccionFluida>
                    <Titulo>Navegue por la galería</Titulo>
                    <ImagenesContainer>
                        {fotosDeGaleria.filter(foto => {
                            return foto.titulo.toLowerCase().includes(consulta.toLowerCase())
                        }).map(foto => <Imagen
                        alSolicitarZoom ={foto => setFotoSeleccionada(foto) }
                            key={foto.id}
                            foto={foto} />)
                        }
                    </ImagenesContainer>
                </SeccionFluida>
                <Populares />

            </GaleriaContainer>
        </>
    )
}

export default Galeria