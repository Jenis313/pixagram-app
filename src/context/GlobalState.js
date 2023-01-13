// In order to pass data over components, all the components need to be in the component tree, which means eithr that component needs to be child, grandchild, parent, grandparent etc. and that can be done using state and props, but what if you need to use one component's data to other component and they are not in the same component tree, there's where global state kicks in. In our case header's picture needs to be updated when user switches their account or updates profile picture and header doesn't belong to the login and edit profile component tree that's why we are using globalstate

//https://www.youtube.com/watch?v=XLJN4JfniH4
//https://stackblitz.com/edit/react-rzuyc3?file=MyContext.js
//https://www.youtube.com/watch?v=ch8kiuRJc7I&t=517s
import React, { Component } from 'react';
export const GlobalContext = React.createContext();
// Then create a provider Component
export class MyProvider extends Component {
    setCurrentProfile = picture => {
        // console.log('this came through and picture is -->', picture)
		this.setState({ currentProfilePic: picture });
	};
    state = {
        currentProfilePic: '',
        setCurrentProfile: this.setCurrentProfile,
    };
    render() {
        // console.log('context state -->', this.state);
        return (
        <GlobalContext.Provider value={{
            state: this.state,
            changeProfile: (newProfile) => this.setState({
            currentProfilePic : newProfile
            })
        }}>
            {this.props.children}
        </GlobalContext.Provider>
        )
    }
}
export default GlobalContext;