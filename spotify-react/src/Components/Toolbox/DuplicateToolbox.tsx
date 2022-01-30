import React, { useState } from "react";
import { connect } from "react-redux";
import { addToPlaylist, removeSongs } from "../../flux/actions/spotifyActions";
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
const DuplicateToolbox = ({
  masterSongs,
  currentSongs,
  setCurrentSongs,
  selectedSongs,
  setSelectedSongs,
  removeSongs,
  addToPlaylist,
}) => {
  const [modal, setModal] = useState(false);
  const [playlistDetails, setPlaylistDetails] = useState({
    name: "Spotify Tools Playlist",
    description: "Created By Spotify Tools",
    public: false,
  });
  const toggle = () => setModal(!modal);
  function removeAllSongs() {
    let dupeIds: string[] = [];
    for (let index in currentSongs) {
      for (
        let dupeSongsIndex = 0;
        dupeSongsIndex < currentSongs[index].list.length - 1;
        dupeSongsIndex++
      ) {
        const id =
          currentSongs[index].list[dupeSongsIndex].linked_from_id ??
          currentSongs[index].list[dupeSongsIndex].track_id;
        dupeIds.push(id);
      }
    }
    removeSongs(dupeIds);
  }

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
    console.log(value);
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
      <button className={`${HelperStyles.toolboxButton} ${HelperStyles.addButton}`} onClick={toggle}>
        Add to Playlist
      </button>
      <button className={`${HelperStyles.toolboxButton} ${HelperStyles.removeButton}`} onClick={removeAllSongs}>
        Remove Duplicates
      </button>
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
export default connect(null, { addToPlaylist, removeSongs})(DuplicateToolbox);
