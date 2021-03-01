import React, {useState} from "react";
import {useQuery, useMutation, gql} from '@apollo/client';

import Gist from "./Gist";

const usernameQuery = gql`
    query getGistByUserName($userName: String!) {
        getGistsByUserName(userName: $userName) {
            url
            forks_url
            commits_url
            id
            node_id
            git_pull_url
            git_push_url
            html_url
            files {
                filename
                type
                language
                raw_url
                size
            }
            public
            created_at
            updated_at
            description
            comments
            user
            comments_url
            owner {
                login
                id
                node_id
                avatar_url
                gravatar_id
                url
                html_url
                followers_url
                following_url
                gists_url
                starred_url
                subscriptions_url
                organizations_url
                repos_url
                events_url
                received_events_url
                type
                site_admin
            }
            truncated
            favorite
        }
    }
`;

const favoriteQuery = gql`
    query {
        getFavoriteGists {
            gists {
                url
                forks_url
                commits_url
                id
                node_id
                git_pull_url
                git_push_url
                html_url
                files {
                    filename
                    type
                    language
                    raw_url
                    size
                }
                public
                created_at
                updated_at
                description
                comments
                user
                comments_url
                owner {
                    login
                    id
                    node_id
                    avatar_url
                    gravatar_id
                    url
                    html_url
                    followers_url
                    following_url
                    gists_url
                    starred_url
                    subscriptions_url
                    organizations_url
                    repos_url
                    events_url
                    received_events_url
                    type
                    site_admin
                }
                truncated
                favorite
            }
        }
    }`;

const addQuery = gql`
    mutation makeFavorite($gistId: ID!) {
        makeFavorite(gistId: $gistId)
    }`;

const removeQuery = gql`
    mutation removeFromFavorites($gistId: ID!) {
        removeFromFavorites(gistId: $gistId)
    }`;

function SearchResults(props) {
    const isFavs = props.favs;

    const [gists, setGists] = useState([]);

   const {loading: queryLoading, error: queryError, data, refetch} = useQuery(isFavs ? favoriteQuery : usernameQuery, {
        variables: {userName: props.searchQuery},
        onCompleted: (data) => {
            setGists((isFavs ? data.getFavoriteGists.gists : data.getGistsByUserName))
        },
       notifyOnNetworkStatusChange: true,
       fetchPolicy: "network-only",
    });

    const [addFavorite, { loading: addMutationLoading }] = useMutation(addQuery);
    const [removeFavorite, { loading: removeMutationLoading }] = useMutation(removeQuery);

    const triggerFavoriteAction = async (id) => {
        const gist = gists.find(el => el.id === id);
        if (gist) {
            if (!gist.favorite) {
                await addFavorite({variables: {gistId: id}});
                refetch();
            } else {
                await removeFavorite({variables: {gistId: id}});
                refetch();
            }
        }
    };

    const mapGists = (gists) => gists.map(gist => {
        return (
            <Gist gist={gist} updateFavorite={triggerFavoriteAction}/>
        )
    });

    if (queryLoading) return <p className={"search-results"}>Loading...</p>;
    if (addMutationLoading || removeMutationLoading) return <p className={"search-results"}>Updating Favorites...</p>;
    if (queryError) return <p className={"search-results"}>Error :(</p>;
    if (data) {
        console.log(gists);
        return (
            <div className={`search-results ${isFavs ? 'favs-results' : 'name-results'}`}>
                {mapGists(gists)}
            </div>
        );
    }
}

export default SearchResults;
