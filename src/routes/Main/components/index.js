import React, {Component} from 'react';
import {Button, Spin} from 'antd';

import {storageMarkersKey, mapAPIkey} from '../../../common/constants';
import GoogleMap from '../../../components/Map';
import Centralizer from '../../../components/Centralizer';

import {StyledButtonGroup} from './styled';

export class Main extends Component {
    constructor(props) {
        super(props);

        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(props.setCurrentPosition);
        }
    }



    loadCafe = () => {
        const type = 'cafe';
        // TODO: Solve the issue with CORS and free account limitations
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${mapAPIkey}&location=${this.props.currentPosition.lat}, ${this.props.currentPosition.lng}&radius=1000&keyword=${type}`)
            .then((res) => console.log(res));
    };


    saveMarkers = () => {
        localStorage.setItem(storageMarkersKey, JSON.stringify(this.props.places));
    };

    loadMarkers = () => {
        this.props.saveMarkers(JSON.parse(localStorage.getItem(storageMarkersKey)));
    };

    render() {
        const {places, addMarker, removeMarker, currentPosition} = this.props;

        return (
            <div>
                <StyledButtonGroup>
                    <Button type={'primary'} onClick={this.saveMarkers}>SAVE</Button>
                    <Button type={'primary'} onClick={this.loadMarkers}>LOAD</Button>
                    <Button onClick={this.loadCafe}>LOAD CAFE</Button>
                </StyledButtonGroup>
                {currentPosition.lat ?
                    <GoogleMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapAPIkey}`}
                        loadingElement={<div style={{height: `700px`}}/>}
                        containerElement={<div style={{height: `700px`}}/>}
                        mapElement={<div style={{height: `700px`}}/>}
                        places={places}
                        defaultCenter={currentPosition}
                        addMarker={addMarker}
                        deleteMarker={removeMarker}
                    />
                    : <Centralizer><Spin size={25}/></Centralizer>
                }


            </div>
        )
    }
}

export default Main
