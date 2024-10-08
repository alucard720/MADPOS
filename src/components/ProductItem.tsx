import React from 'react';
import beep from '../assets/beep-29.mp3';

const ProductItem = ({ product, onSelect }: any) => {
    return <div role="button" 
            onClick={() => { 
                onSelect(product);
                const sound = new Audio();
                sound.src = beep;
                sound.play();
            }} className="select-none cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg">
            <img src={product.image} alt={product.name} />
            <div className="flex pb-3 px-3 text-sm mt-5">
            <p className="flex-grow truncate mr-1">{product.name}</p>
            <p className="nowrap font-semibold">RD$ {product.price}</p>
            </div>
        </div>;
};

export default ProductItem; 