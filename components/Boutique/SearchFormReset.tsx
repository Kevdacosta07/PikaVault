"use client"

import {faX} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SearchFormReset = () => {

    const reset = () => {
        const input = document.querySelector(".search-form input") as HTMLFormElement;

        if (input) input.value = "";
    }

    return (
        <button type="button" onClick={reset} className={"search-btn text-black bg-white"}>
            <FontAwesomeIcon icon={faX} className={""} />
        </button>
    );
};

export default SearchFormReset;