// File upload component

FileUpload = React.createClass({

fetchUploadedFile() {
	var uploadedFile = React.findDOMNode(this.refs.fileUpload).value;
	React.findDOMNode(this.refs.textInput).value = uploadedFile;	
	this.showLoader();
	
	var wavesurfer = Object.create(WaveSurfer);
	wavesurfer.init({
        container: '#audioMap',
        height: 100,
        pixelRatio: 1,
        scrollParent: true,
        normalize: true,
        minimap: true,
        backend: 'WebAudio'
    });
    wavesurfer.load('DegreeOfSeparation.mp3');
	wavesurfer.on('ready', function () {
         ReactDOM.render(<AudioMap ws={wavesurfer} />, document.getElementById("audioMap"));
    });
},

showLoader() {
	var divElem = document.createElement('div');
	divElem.setAttribute('align','center');
	
	var imgElement = document.createElement("img");
	imgElement.setAttribute('id', 'loading');
	imgElement.setAttribute('src', 'http://blog.teamtreehouse.com/wp-content/uploads/2015/05/loading.gif');
	
	divElem.appendChild(imgElement);
	document.getElementById("audioMap").innerHTML = "";
	document.getElementById("audioMap").appendChild(divElem);
},

render() {
	return (
		<div className="text-center">
		 <input id="uploadFile" placeholder="Choose File" disabled="disabled" ref="textInput"/>
  		 <div className="fileUpload btn btn-primary">
    		<span>Upload your audio</span>
    		<input id="uploadBtn" type="file" ref="fileUpload" onChange={this.fetchUploadedFile} className="upload" accept="audio/*"/>
   		 </div>
    	</div>
	);
}

});