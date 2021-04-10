import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header'
import { getUserByUsername, getUserPhotosByUsername } from '../../services/firebase'
import Profile from '../../pages/profile';



export default function UserProfile({ user }) {

    const reducer = (state, newState) => ({ ...state, ...newState })
    const initialState = {
      profile: {},
      photosCollection: [],
      followerCount: 0,
    }
    
    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const [user] = await getUserByUsername(user.username);
            // const photos = getUserPhotosByUsername(username);
            // dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length})
        }

        if (user.username) {
            getProfileInfoAndPhotos()
        }
        
    }, [user.username])

    return <> <Header /></>
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
      followers: PropTypes.array.isRequired,
      following: PropTypes.array.isRequired,
      emailAddress: PropTypes.string.isRequired,
      dateCreated: PropTypes.number.isRequired,
      fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired
}