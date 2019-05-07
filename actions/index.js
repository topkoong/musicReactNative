import axios from 'axios';
import _ from 'lodash';
import {AsyncStorage} from 'react-native';
const API_KEY = '33e802b756msh381dd8c31907de7p1a8dedjsna9e64d99829f';
const axiosInstance = axios.create({
	baseURL: 'https://deezerdevs-deezer.p.rapidapi.com/',
	timeout: 1000,
	headers: { 'X-RapidAPI-Key': API_KEY }
});

export const searchTracks = artist => {
    return axiosInstance.get(`search?q=${artist}`)
        .then(({data}) => {
            data = data.data;
            const albums = data.map(item => item.album);
            const uniqueAlbums = _.uniqBy(albums, 'title');
            return uniqueAlbums;
        });
}

export const getAlbumTracks = albumId => {
    return axiosInstance.get(`album/${albumId}`)
        .then(({data}) => {
            const tracks = data.tracks.data;
            return tracks;
        })
}

export const storeData = async (key, value) => {
    const stringifyValue = JSON.stringify(value);
	try {
        await AsyncStorage.setItem(key, stringifyValue);
        return value;
	} catch (error) {
		// Error saving data
	}
};

export const retrieveData = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			// We have data!!
			return JSON.parse(value);
		}
	} catch (error) {
		// Error retrieving data
	}
};

export const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      // Error saving data
    }
  }
