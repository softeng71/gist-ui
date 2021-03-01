function FavoriteGistsButton(props) {

    function btnClicked(e) {
        e.preventDefault();
        props.triggerShowSearchResults("", true);
    }
    return (
        <button className={"favs-btn"} onClick={(e) => btnClicked(e)}>Show Favorite Gists</button>
    );
}

export default FavoriteGistsButton;
