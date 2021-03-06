import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts : [],
        selectedPostId: null,
        error: null
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author : 'Logan'
                    }
                })
                this.setState({ posts : updatedPosts });
                // console.log(response);
            }).catch(error => {
                this.setState({error: error.message});
            });
    }

    selectPostHandler = (id) => {
        this.setState({selectedPostId : id});
    }

    // here where we did this.selectPostHandler.bind(this, post.id)
    // we could hav also done () => this.selectPostHandler(post.id)

    render () {
        let posts = <p style = {{textAlign: 'center'}}>{this.state.error}</p>;
        if(!this.state.error){
            posts = this.state.posts.map( post => {
                return <Post 
                            key={post.id} 
                            title={post.title} 
                            author={post.author}
                            clicked={this.selectPostHandler.bind(this, post.id)}
                        />
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id = {this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;