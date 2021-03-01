function FavoriteActionButton(props) {

    function btnClicked(e) {
        e.preventDefault();
        props.btnClicked();
    }
    return (
        <button className={"favs-action-btn"} onClick={btnClicked}>
            {(props.isFav === true) ? "Remove from Favorites" : "Add to Favorites"}
        </button>
    );
}

export default FavoriteActionButton;
