import React, {useContext, useEffect, useState} from "react";
import qualityService from "../app/services/quality.service";
import {toast} from "react-toastify";

const QualitiesContex = React.createContext()
export const useQualities = () => {
    return useContext(QualitiesContex)
}
export const QualitiesProvider = ({children}) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() =>{
        const getQualities = async () => {
            try {
               const {content} = await qualityService.fetchAll();
                setQualities(content);
                setLoading(false);
            }catch (error) {
                const {message} = error.response.data;
                setError(message)
            }
        };
        getQualities();

    }, [])

    const addQuality = async (data)=>{
        try {
           const {content} = await qualityService.create(data);
           setQualities(prevState => [...prevState,content])
            return content;
        }
        catch (error){
            const {message} = error.response.data;
            setError(message)
        }
    }

    const getQuality = (id) => {
        return qualities.find((q)=>q._id===id)
    }
    const updateQuality = async ({_id: id, ...data}) => {
        try {
            const {content} = await qualityService.update(id, data)
            setQualities((prevState) => prevState.map((item)=>{
                if(item._id===content._id){
                    return content;
                }
                return item;
            })
            );
            return content;
        } catch (error) {
            const {message} = error.response.data
            setError(message)
        }
    };

    return <QualitiesContex.Provider value={{qualities, getQuality, updateQuality, addQuality}}>
              {!isLoading?children:<h1>Qualities Loading...</h1>}
           </QualitiesContex.Provider>;
};



