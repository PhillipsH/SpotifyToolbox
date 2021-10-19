import React from 'react';
import { connect } from 'react-redux';
import gitImg from "../Icons/github.png";
import likedImg from "../Icons/like.png";
import playlistImg from "../Icons/playlist.png";
import followersImg from "../Icons/followers.png";


export const Sidenav = (props) => {

    let displayName = 'user'
    let profilePic = 'user'
    let followerCount = '-'
    let profileUrl = 'https://www.spotify.com'
    
    if(props.profile.display_name != undefined){
        displayName = props.profile.display_name
        profilePic = props.profile.images[0].url
        followerCount = props.profile.followers.total
        profileUrl = props.profile.external_urls.spotify
    }
    return (
        <div className="sidenav">
            <div className='user-div'>
                <h2>SpotifyTools</h2>
                <img className="user-img" src={profilePic}></img>
                <h4 className="user-name">{displayName}</h4>
            </div>
            <div>
                <h3>Stats</h3>
                <div>
                    <img className='side-img' src={likedImg}></img>
                    <h4>Liked Songs: <span>{props.likedSongs.list.length}</span></h4>
                </div>
                <div>
                <img className='side-img' src={playlistImg}></img>
                    <h4>Playlist Songs: <span>{props.playlistSongs.list.length}</span></h4>
                </div>
                <div>
                    <img className='side-img' src={followersImg}></img>
                    <h4>Followers: {followerCount}</h4>
                </div>
                <div>
                    <h3>Pages</h3>
                    <a href={profileUrl}>Spotify Profile</a>
                    <a href="#">How to Use</a>
                </div>
                <div className="sidenav-footer">
                    <img className='contact-img' src={gitImg}></img>
                    <a href="#">
                    <h6>Github Repo</h6>
                    </a>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    likedSongs: state.spotify.likedSongs,
    playlistSongs: state.spotify.playlistSongs,
    profile: state.spotify.profile,
});
  
export default connect(mapStateToProps, {})(Sidenav);
