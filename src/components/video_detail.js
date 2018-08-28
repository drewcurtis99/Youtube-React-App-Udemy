import React from 'react';


//This method is the ES5 way of passing in an argument into the VideoDetail function. The ES6 method is below with the {video}. That method is a shorthand for exactly the commented out code below.
// const VideoDetail = (props) {
//   const video = props.video;
// }

const VideoDetail = ({video}) => {

  //React wants to run data faster than it can API's can query for it. Much like how Javascript has a Document.ready() function. This if statement addresses when a function pulls a value of "undefined" because that data has not been received yet.
  if (!video) {
    return <div>Loading...</div>;
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={url}></iframe>
      </div>
      <div className="details">
        <div>{video.snippet.title}</div>
        <div>{video.snippet.description}</div>
      </div>
    </div>
  );
};

export default VideoDetail;