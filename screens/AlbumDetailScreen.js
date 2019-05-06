import React from 'react';
import {
	ScrollView,
	StyleSheet,
	View,
	Linking,
	Alert,
	FlatList
} from 'react-native';
import {
	Avatar,
	Text,
	Icon,
	Divider,
	List,
	ListItem
} from 'react-native-elements';

import * as actions from '../actions';

export default class AlbumDetailScreen extends React.Component {
	static navigationOptions = {
		title: 'Album Detail'
	};
	constructor() {
		super();
		this.state = {
			tracks: []
		};
	}

	componentDidMount() {
		const album = this.props.navigation.getParam('album', {});
		actions
			.getAlbumTracks(album.id)
			.then(tracks => this.setState({ tracks }))
			.catch(err => console.error(err));
	}

	renderTracks() {
		const { tracks } = this.state;
		if (tracks && tracks.length > 0) {
			return tracks.map((track, index) => {
				return (
					<ListItem
						key={index}
						title={track.title}
						leftIcon={{ name: 'play-arrow', onPress: () => {} }}
						rightIcon={
							<Icon
								raised
								name="star"
								type="font-awesome"
								color="#f50"
								onPress={() => {}}
							/>
						}
					/>
				);
			});
		}
    }
    
    keyExtractor = (item, index) => index.toString()

	render() {
		const album = this.props.navigation.getParam('album', {});
		const artist = this.props.navigation.getParam('artist', '');
		if (album.id) {
			return (
				<ScrollView style={styles.container}>
					<View>
						<Avatar
							xlarge
							rounded
							source={{ uri: album.cover_medium }}
						/>
						<View>
							<Text h4>{album.title}</Text>
							<Text h4>{artist}</Text>
							<Icon
								raised
								name="play"
								type="font-awesome"
								color="#f50"
								size={30}
								onPress={() => {}}
							/>
						</View>
					</View>
					<Divider style={{ backgroundColor: 'black' }} />
					<View>
						{this.renderTracks()}
                    </View>
				</ScrollView>
			);
		} else {
			return (
				<View>
					<Text>Loading...</Text>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: '#fff'
	}
});
