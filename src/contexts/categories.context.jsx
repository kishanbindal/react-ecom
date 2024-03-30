import { createContext, useState, useEffect } from "react";
import SHOP_DATA from '../shop-data.js';
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";



export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {

    
    // Running first time to upload data to firebase db
    // Not recommended.
    // useEffect(()=> {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])

    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async() => {
            const categoryMap = await(getCategoriesAndDocuments());
            setCategoriesMap(categoryMap);   
        }

        getCategoriesMap();
            // let categoryMap = []
            // getCategoriesAndDocuments()
            // .then(data => {
            //     categoryMap = data;
            //     console.log(categoryMap);
            // })
        }, []);

    const value={categoriesMap};
    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}