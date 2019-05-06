import axios from 'axios';
import _ from 'lodash';
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
