import { combineReducers } from 'redux';

import brandsSortReducer from "./brandsSortReducer";
import prodInfoReducer from "./prodInfoReducer";
import brandsReducer from './BrandsReducer';
import newsReducer from './NewsReducer';
import productsReducer from './ProductsReducer';
import aboutReducer from './AboutReducer';

let combinedReducer=combineReducers({
    // редьюсер countersReducer отвечает за раздел state под именем counters
    brandsSort: brandsSortReducer, 
    prodInfo: prodInfoReducer,
    brands: brandsReducer,   //Файл с брендами и их описанием
    news: newsReducer,   //Файл с новостями 
    products: productsReducer, 
    about: aboutReducer,  //Файл с товарами и их описанием
    // + другие редьюсеры
});

export default combinedReducer;
