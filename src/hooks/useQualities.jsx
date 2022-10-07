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
    function errorCatcher (error){
        const {message} = error.response.data;
        setError(message);
    }
    useEffect(() =>{
        const getQualities = async () => {
            try {
               const {content} = await qualityService.fetchAll();
                setQualities(content);
                setLoading(false);
            }catch (error) {
                errorCatcher(error);
            }
        };
        getQualities();

    }, [])

    const addQuality = async (data)=>{
        try {
           const {content} = await qualityService.create(data);
           setQualities(prevState => [...prevState,content]);
            return content;
        }
        catch (error){
           errorCatcher(error);
        }
    }
    useEffect(() => {
        if(error!==null){
            toast(error);
            setError(null);
        }
    },[error])

    const getQuality = (id) => {
        return qualities.find((q)=>q._id===id);
    }
    const deleteQuality = async (id) => {
    try {
        const {content} = await qualityService.delete(id);
        setQualities(prevState => {
            return prevState.filter(item=>item._id!==content._id);
        })
    } catch (error) {
       errorCatcher(error);
    }
    }
    const updateQuality = async ({_id: id, ...data}) => {
        try {
            const {content} = await qualityService.update(id, data);
            setQualities((prevState) => prevState.map((item)=>{
                if(item._id===content._id){
                    return content;
                }
                return item;
            })
            );
            return content;
        } catch (error) {
           errorCatcher(error);
        }
    };

    return <QualitiesContex.Provider value={{qualities, getQuality, updateQuality, addQuality, deleteQuality}}>
              {!isLoading?children:<h1>Qualities Loading...</h1>}
           </QualitiesContex.Provider>;
};



