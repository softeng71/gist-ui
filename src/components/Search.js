import React, { useState } from 'react';

function Search(props) {
    const [value, setValue] = useState("");

    const submitForm = (e, props) => {
        e.preventDefault();
        props.triggerShowSearchResults(value, false);
    }
    return (
        <form className={'search'} onSubmit={(e) => submitForm(e, props)}>
            <label htmlFor={"user-name-input"}> Search for Gists by User</label>
            <input type={"text"} className={"search-input"} name={"user-name-input"} value={value} onChange={e => setValue(e.target.value)} />
            <button type={"submit"} className={"search-btn"}>Search</button>
        </form>
    );
}

export default Search;
