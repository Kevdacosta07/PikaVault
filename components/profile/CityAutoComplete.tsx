"use client";

import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useState, useRef } from "react";

const libraries: ("places")[] = ["places"];

export default function CityAutocomplete({ onChange }: { onChange: (value: string) => void }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries,
    });

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const [inputValue, setInputValue] = useState("");

    if (!isLoaded) return <p>Chargement...</p>;

    return (
        <Autocomplete
            onLoad={(autocomplete: google.maps.places.Autocomplete) => {
                autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={() => {
                if (autocompleteRef.current) {
                    const place: google.maps.places.PlaceResult = autocompleteRef.current.getPlace();
                    const components: google.maps.GeocoderAddressComponent[] = place.address_components || [];

                    let cityName = "";

                    for (const component of components) {
                        if (component.types.includes("locality")) {
                            cityName = component.long_name;
                            break; // Arrête la boucle dès qu'une ville est trouvée
                        }
                    }

                    setInputValue(cityName);
                    onChange(cityName);
                }
            }}
        >
            <input
                type="text"
                placeholder="Ville de résidence"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full outline-none shadow-md rounded text-md p-2 border border-gray-300"
            />
        </Autocomplete>
    );
}
