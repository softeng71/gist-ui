import moment from "moment";

import FavoriteActionButton from "./FavoriteActionButton";

function Gist(props) {

    function triggerFavoriteAction() {
        props.updateFavorite(props.gist.id);
    };

    return (
        <div key={`${props.gist.id}`} className={"gist-container"}>
            <div className={"gist-actions"}>
                <div>{"Gist ID: "}<a href={props.gist.url} className={"gist-id"}>{props.gist.id}</a></div>
                <FavoriteActionButton isFav={props.gist.favorite} btnClicked={triggerFavoriteAction} />
            </div>
            <div className={"owner-name"}>Owner: {props.gist.owner.login}</div>
            <div className={"file-list-container"}>
                <h4>Files in Gist</h4>
                <ul className={"files-list"}>
                    {props.gist.files.map(file => (<li className={"file-item"}>{file.filename}</li>))}
                </ul>
            </div>
            <div className={"created"}>Created: {moment(props.gist.created_at).format("MM/DD/YYYY kk:mm")}</div>
            <div className={"last-updated"}>Last
                Updated: {moment(props.gist.updated_at).format("MM/DD/YYYY kk:mm")}</div>
        </div>
    )
};

export default Gist;
