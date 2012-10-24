/**
 * This is a really simple social app that demonstrates how to post to Twitter using Appcelerator Titanium.
 * 
 * Get API access to Twitter here: https://dev.twitter.com/apps
 * The consumer key and secret will be used later in this app. Make sure you check "Read & Write"!
 */

Ti.include('fb.js');
var social = require('social');

var win = Ti.UI.createWindow({
	backgroundColor : '#fff'
});
var twittButton = Ti.UI.createButton({
	width : 200,
	top : 10,
	left:10,
	height : 50,
	title : 'Tweet status'
});
win.add(twittButton);

var twittImageButton = Ti.UI.createButton({
	width : 200,
	top : 60,
	left:10,
	height : 50,
	title : 'Tweet Image'
});
win.add(twittImageButton);

var fbButton = Ti.UI.createButton({
	width : 200,
	top : 110,
	left:10,
	height : 50,
	title : 'Facebbook status'
});
win.add(fbButton);

var fbImageButton = Ti.UI.createButton({
	width : 200,
	top : 160,
	left:10,
	height : 50,
	title : 'Facebbook image'
});
win.add(fbImageButton);

win.open();

var CONSUMER_KEY = '46STS57WEiBXn9GtMdg';
var CONSUMER_SECRET = 'TxvQwIwZFsy4iD7Oyt9a9tVSSULKig2VjJb9JvSg4g';

Titanium.Facebook.appid = "379809418766008"; //Production
Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];

//Create a Twitter client for this module
var twitter = social.create({
	consumerSecret : CONSUMER_SECRET,
	consumerKey : CONSUMER_KEY
});
/**
 * And when the user clicks on the button, share a message with the world!
 * Note that this will show the authorization UI, if necessary.
 */
twittButton.addEventListener('click', function() {
	twitter.share({
		message : "Test image upload with appcelerator & social.js on android",
		success : function() {
			alert('Tweeted!');
		},
		error : function() {
			alert('ERROR Tweeted!');
		}
	});
});

twittImageButton.addEventListener('click', function() {
	twitter.shareImage({
		message : "Test image upload with appcelerator & social.js on android",
		image : (Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "KS_nav_ui.png")).read(),
		success : function() {
			alert('Tweeted!');
		},
		error : function() {
			alert('ERROR Tweeted!');
		}
	});
});

fbButton.addEventListener('click', function() {		 
	 if(Titanium.Network.online){
	     if(Titanium.Facebook.loggedIn){	     	    
	          craetePost('Sample','Testing');
	     }else{
	        Titanium.Facebook.authorize();
	        
			Titanium.Facebook.addEventListener('login', function(e) {
				if (e.success) {
					Titanium.Facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
					    if (e.success) {
					        var response = JSON.parse(e.result); 
							craetePost('Sample','Testing');
					    } else if (e.error) {
					        alert('',"Error = "+e.error);
					    } else {
					        alert('','Unknown response');
					    }
					});
				}else if (e.error) {
					alert('',"Error = "+e.error);
			    } else if (e.cancelled) {
			    }
			});
	        //showAlert('',"Please Link your facebook Account at settings Page");
	     }
	 }else{
	     alert("This requires internet connection");
	 }
});

fbImageButton.addEventListener('click', function() {
	var media = [];	        
	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "KS_nav_ui.png");	
	var blob = file.read();	
    media.push({'message': 'Testing', 'picture': blob});		
    
    if(Titanium.Network.online){
	     if(Titanium.Facebook.loggedIn){
	          createAlbum(media,'Sample','Testing');
	     }else{
	        Titanium.Facebook.authorize();
	        
			Titanium.Facebook.addEventListener('login', function(e) {
				if (e.success) {
					Titanium.Facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
					    if (e.success) {
					        var response = JSON.parse(e.result); 
							createAlbum(media,'Sample','Testing');
					    } else if (e.error) {
					        alert('',"Error = "+e.error);
					    } else {
					        alert('','Unknown response');
					    }
					});
				}else if (e.error) {
					alert('',"Error = "+e.error);
			    } else if (e.cancelled) {
			    }
			});
	        //showAlert('',"Please Link your facebook Account at settings Page");
	     }
	 }else{	     
	     alert("This requires internet connection");
	 }
});

/**
 * Finally, here are some other methods you might want to use:
 */
/*
 twitter.isAuthorized();
 twitter.authorize(function() {
 alert('Authorized!');
 });
 twitter.deauthorize();
 */