import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPosts: null
    }

    // here we added 2 if checks as after first if check the componentDidUpdate goes in a infinite loop, to stop stat we add second if check
    // the reason the componentDidUpdate went on a infinite loop as the first check would always be true once id is sent to props
    componentDidUpdate() {
        if ( this.props.id ) {
            if( !this.state.loadedPosts || (this.state.loadedPosts && this.state.loadedPosts.id !== this.props.id)) {
                axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`)
                    .then(res => {
                        this.setState({loadedPosts: res.data})
                    });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`)
            .then(res => {
                console.log(res);
            });
    }

    render () {
        let post = <p style = {{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id) {
            post = <p style = {{textAlign: 'center'}}>Loading...</p>;
        }
        if(this.state.loadedPosts){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPosts.title}</h1>
                    <p>{this.state.loadedPosts.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler} >Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;