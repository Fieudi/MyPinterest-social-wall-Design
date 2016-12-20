
var post = $('#post');
function loadData(){
	var status = "main";
	loadMain(items);
	// load more button click
	$('#loadmorebutton').on('click', function(){
		if(status == "main"){
			loadMain(items);
		}else if(status == "manual"){
			loadManual();
		}else if(status == "tweet"){
			loadTweet();
		}else if(status == "ins"){
			loadIns();
		}
	})
	//load different message, filter message
	$('.filter-manual').on('click',	function(){
		post.text("");
		status = "manual";
		loadManual();
	});
	$('.filter-tweet').on('click', function(){
		post.text("");
		status = "tweet";
		loadTweet();
	});
	$('.filter-ins').on('click', function(){
		post.text("");
		status = "ins";
		loadIns();
	});
	$('.reset').on('click', function(){
		status == "main";
		post.text("");
		loadMain(items);
	});
	
	$(window).on('resize', function() {
		if($(window).width() > 980) {
			$('.tweetstamp, .instamp').addClass('fa-2x');
			$('.tweetstamp, .instamp').removeClass('fa-4x');
		}else{
			$('.tweetstamp, .instamp').addClass('fa-4x');
			$('.tweetstamp, .instamp').removeClass('fa-2x');
		}
	})
}
//when load real api, should use $.ajax and $.json

//load contents for main screen
function loadMain(items){
	for (var i = 0; i < 20; i ++){
	if(items[i].service_name == "Manual"){
			post.append('<div class="post-contains"><span class="label manualstamp"><br /><p class="manualstampfont">AFF</p></span><div class="post-manual"><img id="manual-image" src=' + items[i].item_data.image_url + '>' + '<br/><p>' + items[i].item_data.text 
			+ '<p><br /><a href="' + items[i].item_data.link + '">' + items[i].item_data.link_text + '</a></div></div>');
		}else if(items[i].service_name == "Twitter"){
			var str = items[i].item_data.tweet;
			str = parseURL(str);
			str = parseMentions(str);
			str = parseHashtag(str);
			post.append('<div class="post-contains"><span class="label tweetstamp fa fa-twitter fa-2x" aria-hidden="true"><p>&nbsp;</p></span><div class="post-twitter"><h3><b>' + items[i].item_data.user.username + '</b></h3><br /><p>' + str + '</p></div></div>');

		}
		else{
			var str = items[i].item_data.caption;
			str = parseInsHashtag(str);
			post.append('<div class="post-contains"><span class="label instamp fa fa-instagram fa-2x" aria-hidden="true">&nbsp;</span><div class="post-instagram"><a src="' + items[i].item_data.link + '"><img id="ins-image" src="' + items[i].item_data.image.medium + '"></img></a><br /><h4>'
			+ items[i].item_data.user.username +'</h4><br /><p>' + str + '</p></div></div>');
		}
	}
}

//parse tweet URL, mentions, hashtag from the string
function parseURL(str){
	str = str.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
		return url.link(url);
	});
	return str;
}

function parseMentions(str){
	str = str.replace(/[@]+[A-Za-z0-9_]+/g,function(s){
		var user_name = s.replace('@','');
		return s.link("http://twitter.com/"+user_name);
	});
	return str;
}

function parseHashtag(str){
	str = str.replace(/[#]+[A-Za-z0-9_]+/g,function(s){
		var hashtag = s.replace('#','');
		return s.link("http://twitter.com/search?q="+hashtag);
	}); 
	return str;
}

//parse Ins hashtag from the string
function parseInsHashtag(str){
	str = str.replace(/[#]+[A-Za-z0-9_]+/g,function(s){
		var hashtag = s.replace('#','');
		return s.link("https://instagram.com/" + hashtag);
	}); 
	return str;
} 

//load manual message list
function loadManual(){
	for (var i = 0; i < items.length; i ++){
		if(items[i].service_name == "Manual"){
			post.append('<div class="post-contains"><span class="label manualstamp"><br /><p class="manualstampfont">AFF</p></span><div class="post-manual"><img id="manual-image" src=' + items[i].item_data.image_url + '>' + '<br/><p>' + items[i].item_data.text 
			+ '<p><br /><a href="' + items[i].item_data.link + '">' + items[i].item_data.link_text + '</a></div></div>');
		}	
	}
	for (var i = 0; i < items.length; i ++){
		if(items[i].service_name == "Manual"){
			post.append('<div class="post-contains"><span class="label manualstamp"><br /><p class="manualstampfont">AFF</p></span><div class="post-manual"><img id="manual-image" src=' + items[i].item_data.image_url + '>' + '<br/><p>' + items[i].item_data.text 
			+ '<p><br /><a href="' + items[i].item_data.link + '">' + items[i].item_data.link_text + '</a></div></div>');
		}	
	}
}

//load tweet message list
function loadTweet(){
	for (var i = 0; i < items.length; i ++){
		if(items[i].service_name == "Twitter"){
			var str = items[i].item_data.tweet;
			str = parseURL(str);
			str = parseMentions(str);
			str = parseHashtag(str);
			post.append('<div class="post-contains"><span class="label tweetstamp fa fa-twitter fa-2x" aria-hidden="true"><p>&nbsp;</p></span><div class="post-twitter"><h3><b>' + items[i].item_data.user.username + '</b></h3><br /><p>' + str + '</p></div></div>');
		}	
	}
	for (var i = 0; i < items.length; i ++){
		if(items[i].service_name == "Twitter"){
			var str = items[i].item_data.tweet;
			str = parseURL(str);
			str = parseMentions(str);
			str = parseHashtag(str);
			post.append('<div class="post-contains"><span class="label tweetstamp fa fa-twitter fa-2x" aria-hidden="true"><p>&nbsp;</p></span><div class="post-twitter"><h3><b>' + items[i].item_data.user.username + '</b></h3><br /><p>' + str + '</p></div></div>');
		}	
	}
}

//load ins message list
function loadIns(){
	for (var i = 0; i < items.length; i ++){
		if(items[i].service_name == "Instagram"){
			var str = items[i].item_data.caption;
			str = parseInsHashtag(str);
			post.append('<div class="post-contains"><span class="label instamp fa fa-instagram fa-2x" aria-hidden="true">&nbsp;</span><div class="post-instagram"><a src="' + items[i].item_data.link + '"><img id="ins-image" src="' + items[i].item_data.image.medium + '"></img></a><br /><h4>'
			+ items[i].item_data.user.username +'</h4><br /><p>' + str + '</p></div></div>');
		}	
	}
	for (var i = 0; i < items.length; i ++){
		if(items[i].service_name == "Instagram"){
			var str = items[i].item_data.caption;
			str = parseInsHashtag(str);
			post.append('<div class="post-contains"><span class="label instamp fa fa-instagram fa-2x" aria-hidden="true">&nbsp;</span><div class="post-instagram"><a src="' + items[i].item_data.link + '"><img id="ins-image" src="' + items[i].item_data.image.medium + '"></img></a><br /><h4>'
			+ items[i].item_data.user.username +'</h4><br /><p>' + str + '</p></div></div>');
		}	
	}

}

loadData();
