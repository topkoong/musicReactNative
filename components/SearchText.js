import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default class SearchText extends React.Component {
	constructor() {
		super();
		this.state = {
            artistName: ''
		};
		// this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        
    }
	handleChange(value) {
		this.setState({artistName: value});
	}
	handleSubmit() {
        const { handleSubmitTrack } = this.props;
        handleSubmitTrack(this.state.artistName);
	}

	render() {
		return (
			<React.Fragment>
				<Input
					containerStyle={styles.center}
                    label="Search an artist"
                    onChangeText={artist => this.handleChange(artist)}
				/>
				<Button title="Search" onPress={() => this.handleSubmit()} />
			</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	center: {
		alignItems: 'center'
	}
});
