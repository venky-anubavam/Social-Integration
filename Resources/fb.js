function createAlbum(media, aTitle, aDescription) {
       Titanium.Facebook.requestWithGraphPath('me/albums', {name: aTitle, message: aDescription}, 'POST', function(e) {
           if(e.success) {
               if(e.result) {
                   var response = JSON.parse(e.result);
                   var message;
				   var path = response.id+'/photos'; 					
				   for (var m = 0; m < media.length; m++){
						Titanium.Facebook.requestWithGraphPath(path, media[m], 'POST', function(e){
						    if (e.success) {   
						        message = "Successfully posted in Facebook";
						    } else {
						        if (e.error) {
						             message = e.error;
						        } else {
						             message = "Unkown result";
						        }
						    }
						});
				   }
               }
           } else if(e.cancelled) {
           		message = "Cancelled";
           } else {
				message = "Failed to posted in Facebook";
				if (e.error) {
					message += "; " + e.error;
				}
           }
           alert(message);
       });
     
}

function craetePost(pTitle, pDescription) {
	var data = {
		name: pTitle,
		message: pDescription
	};
	Titanium.Facebook.requestWithGraphPath('me/feed', data, 'POST', function(e){
		var message = '';
		if (e.success) {
			message = "Successfully posted in Facebook";
		} else if (e.cancelled) {
			message = "Cancelled";
		} else {
			message = "Failed to posted in Facebook";
			if (e.error) {
				message += "; " + e.error;
			}
		}
		alert(message);
	});
} 