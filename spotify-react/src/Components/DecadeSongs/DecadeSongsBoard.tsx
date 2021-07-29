import React from "react";
// import DuplicateSongs from './DuplicateSongs'
import {Button, Input, Form, FormGroup, Label} from "reactstrap";
import { connect } from "react-redux";
import {
  getLikedSongs,
  getPlaylistSongs,
  setCurrentSongList,
} from "../../flux/actions/spotifyActions";

const style = {
  cardBody: {
    width: "100%",
    color: "black",
  },
};

const DecadeSongBoard = (props) => {
  return (
    <div className ="song-board">
    <Form>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          1990
        </Label>
        <Label check>
          <Input type="checkbox" />{' '}
          1990
        </Label>
        <Label check>
          <Input type="checkbox" />{' '}
          1990
        </Label>
        <Label check>
          <Input type="checkbox" />{' '}
          1990
        </Label>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
});

export default connect(mapStateToProps, {})(DecadeSongBoard);

