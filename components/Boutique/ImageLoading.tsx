import React, { useState } from 'react';
import './imageLoading.css';

const ImageWithLoader: React.FC<{ src: string; alt: string } & React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="relative">
            {isLoading && (
                <div className="inset-0 flex items-center mt-12 my-8 justify-center">
                    {/* Indicateur de chargement */}
                    <div className="loader"></div>
                </div>
            )}
            <img
                src={src}
                alt={alt}
                onLoad={handleImageLoad}
                style={{ display: isLoading ? 'none' : 'block' }}
                {...props}
            />
        </div>
    );
};

export default ImageWithLoader;
