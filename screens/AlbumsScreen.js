import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import CardList from '../components/CardList';
import SearchText from '../components/SearchText';
import * as actions from '../actions';

export default class AlbumsScreen extends React.Component {
	static navigationOptions = {
		title: 'Albums'
	};
	constructor() {
		super();
		this.state = {
			albums: [],
			isFetching: false,
			artist: ''
		};
		this.handleSearchTracks = this.handleSearchTracks.bind(this);
		this.renderBottomNavigation = this.renderBottomNavigation.bind(this);
	}

	handleSearchTracks(artist) {
		this.setState({ isFetching: true, albums: [], artist });
		actions
			.searchTracks(artist)
			.then(albums => this.setState({ albums, isFetching: false }))
			.catch(err => this.setState({ albums: [], isFetching: false }));
	}

	renderBottomNavigation(album) {
		const { artist } = this.state;
		return (
			<View style={styles.albumMenu}>
				<Icon
					onPress={() => {}}
					raised
					name="play"
					type="font-awesome"
					color="#f50"
					size={30}
				/>
				<Icon
                    onPress={() => { this.props.navigation.navigate('AlbumDetail', {album, artist}) }}
					raised
					name="info"
					type="font-awesome"
					color="#f50"
					size={30}
				/>
				<Icon
					onPress={() => {}}
					raised
					name="thumbs-up"
					type="font-awesome"
					color="#f50"
					size={30}
				/>
			</View>
		);
	}

	renderAlbumView() {
		const { albums, isFetching } = this.state;
		return (
			<ScrollView style={styles.container}>
				<SearchText handleSubmitTrack={this.handleSearchTracks} />
				{albums.length > 0 && !isFetching && (
					<CardList
						data={albums}
						imageKey={'cover_big'}
						titleKey={'title'}
						buttonText="See the detail"
						bottomView={this.renderBottomNavigation}
					/>
				)}
				{albums.length > 0 && !isFetching && (
					<Text>Loading Albums...</Text>
				)}
			</ScrollView>
		);
	}

	render() {
		return this.renderAlbumView();
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: '#fff'
	},
	albumMenu: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});
