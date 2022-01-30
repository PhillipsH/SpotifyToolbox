import React, { useState } from "react";
import { connect } from "react-redux";
import { addToPlaylist } from "../../flux/actions/spotifyActions";
import HelperStyles from '../Styles/Components/Helper/Helper.module.scss'

import {
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
const Toolbox = ({
  masterSongs,
  currentSongs,
  setCurrentSongs,
  selectedSongs,
  setSelectedSongs,
  addToPlaylist,
}) => {
  const [modal, setModal] = useState(false);
  const [playlistDetails, setPlaylistDetails] = useState({
    name: "Spotify Tools Playlist",
    description: "Created By Spotify Tools",
    public: false,
  });
  const toggle = () => setModal(!modal);

  function addSongsToPlaylist(event) {
    event.preventDefault();
    toggle();
    const playlistSongs = Object.values(selectedSongs);
    addToPlaylist(playlistSongs, playlistDetails);
  }

  function filterList(event) {
    const searchQuery = event.target.value;
    setCurrentSongs(
      masterSongs.filter((song) => {
        const songName = song.track_name.toLowerCase();
        const artistName = song.artist.artist_name.toLowerCase();
        if (
          songName.includes(searchQuery.toLowerCase()) ||
          artistName.includes(searchQuery.toLowerCase())
        ) {
          return true;
        }
        return false;

        // return songName.includes(searchQuery.toLowerCase());
      })
    );
  }
  const handleForm = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPlaylistDetails((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className={HelperStyles.toolbox}>
      <Modal isOpen={modal} toggle={toggle}>
        <form onSubmit={addSongsToPlaylist}>
          <ModalHeader toggle={toggle}>
            Create Playlist With Selected Songs
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Playlist Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="New Playlist"
                onChange={handleForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                id="description"
                name="description"
                type="textarea"
                onChange={handleForm}
              />
            </FormGroup>
            {/* </Form> */}
          </ModalBody>
          <ModalFooter>
            <input type="submit" onClick={addSongsToPlaylist} />
            <Button onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </form>
      </Modal>

      <h4>Current Songs</h4>
      <button className={HelperStyles.toolboxButton + " " + HelperStyles.bluerColor} onClick={toggle}>
        Add to Playlist
      </button>
      <div></div>
      <div></div>
      <Input
        className={HelperStyles.searchBox}
        type="text"
        placeholder="Search"
        onInput={filterList}
      ></Input>
    </div>
  );
};

// export default Toolbox;
export default connect(null, { addToPlaylist })(Toolbox);
