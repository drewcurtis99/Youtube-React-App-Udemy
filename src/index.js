import _ from 'lodash'; //this library needed to be added to our modules. In order to do that you go to your terminal in your project folder and type "npm install --save lodash"
import React, { Component } from 'react'; // When using import if you type a variable like "React" you will be importing an entire object from the 'react' library. If you use the ES6 syntax of { component } then you are simply pulling a property from 'react';
import ReactDOM from 'react-dom'; // This is a library in the react framework. No need for relative reference because there will only be one file with the name of 'react-dom'. The interpreter knows to go to node_modules then look for this library.
import SearchBar from './components/search_bar'; // this is a file that we created ourselves. We need to provide the relative file path.
import YTSearch from 'youtube-api-search'; //You also need to download a YouTube package(module) for this project. I opened the terminal on the project folder location. Type: "npm install --save youtube-api-search". This command adds this module to our node_modules folder. the --save command adds this to the package.json file as a dependency along with all other dependencies/modules.
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail'
const API_KEY = 'AIzaSyBCleHTNlvnoUOQoWiPKas_1iOD0HJLRy0'; //This API_KEY was obtained by going to console.developers.google.com. You search the library of API's there to find the YouTube API, enable it, then use the key you are provided with.



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos,
        selectedVideo: videos[0]
      });
    });
  }


  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300); // this limits the SearchBar refresh rate. Makes it look less laggy because once anything is typed it instantly renders new results. This limits that with a 300 milisecond gap.

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'))

//Notes


//To start a project you need to create a folder location. Then in the terminal open that folder and run the following code: "npm install". This installs npm for the project which is required. This needs to be done for each project folder. Once ready to open the project on you localhost in your browser run: "npm start". This will make your terminal into a interpreter for the project. It is a great resource to debug code when you run into errors.
//This index.js file has the App component on it. This is the main(parent) component that all other components link to.
//All classes have state. State is interesting but know that it can only be set in the constructor scope. Outside of that the only way to change it is with the method this.setState().
//All Javascript variable need to be surrounded by {}
//"Downwords Data Flow" - Only the most parent component of an application should be responsible for fetching data like from an API. That's why in this application the App class (the parent element/component) pulls the YouTube data from the API into it's state then funnels that information to the other components.
//Tags that don't have any information between them self close.
//When creating a component you need to decide to create eather a simple(functional) component or a class component. The main difference is that class components have state which is the ability to rememeber data and has a lot more functionality from helper methods from the Component class. Functional components are a lot more basic. They simply take in as many properties you want to pass in and return static JSX.
//React implements a lot of ES6 functionality for a cleaner look. Please refer to following url for commonly used syntax: https://www.taniarascia.com/es6-syntax-and-feature-overview/
//Component variables can have properties. For example: VideoList has a properties of videos and onVideoSelect that get passed to the VideoList component. That means if you go to the video_list.item.js file to the VideoList function the (props) argument has access to both of those properties.
//onVideoSelect is a good example of data being passed from the App component to the VideoList component then to the VideoListItem component. This is done because once a videoListItem <li> is clicked on then that value gets updated, passed all the way back to App to update the selectedVideo state. Which in turn updates the embeded video on the browser. If you need to do pass information like this beyond 2 components than consider a different approach. Because it becomes a treasure hunt when looking at your code and understanding why variables are being passed again and a again.


