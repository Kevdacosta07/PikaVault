"use client";

import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchFormProps {
    onSearch: (query: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.trim().toLowerCase();
        setSearchQuery(query);
        onSearch(query); // Appel direct pour la mise à jour dynamique
    };

    return (
        <form
            className="search-form flex justify-between w-[550px] bg-gray-200 shadow-sm shadow-gray-400 px-3 text-xl mt-7 py-3 rounded-lg"
        >
            <input
                name="query"
                value={searchQuery}
                onChange={handleChange}
                className="search-input outline-none bg-gray-200 w-[90%]"
                placeholder="Que cherchez-vous ?"
            />
            <button type="submit" className="search-btn bg-gray-200 text-black" aria-label="Rechercher">
                <FontAwesomeIcon icon={faSearch} className="bg-gray-200" />
            </button>
        </form>
    );
}
