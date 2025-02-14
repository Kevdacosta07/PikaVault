"use client";

import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useState, useRef } from "react";

const libraries: ("places")[] = ["places"];

export default function AddressAutocomplete({ onChange }: { onChange: (value: string) => void }) {
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

                    let streetNumber = "";
                    let streetName = "";

                    // 🔍 Recherche du numéro et du nom de la rue
                    for (const component of components) {
                        if (component.types.includes("street_number")) {
                            streetNumber = component.long_name;
                        }
                        if (component.types.includes("route")) {
                            streetName = component.long_name;
                        }
                    }

                    const formattedAddress = `${streetNumber} ${streetName}`.trim();

                    setInputValue(formattedAddress);
                    onChange(formattedAddress);
                }
            }}
        >
            <input
                type="text"
                placeholder="Adresse de résidence"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full outline-none shadow-md rounded text-md p-2 border border-gray-300"
            />
        </Autocomplete>
    );
}
