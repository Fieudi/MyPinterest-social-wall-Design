
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
	//load different message
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
}


//load contents for main screen
function loadMain(items){
	for (var i = 0; i < 20; i ++){
	if(items[i].service_name == "Manual"){
			post.append('<div class="post-contains post-manual"><span class="label manualstamp"><br /><p class="manualstampfont">AFF</p></span><img id="manual-image" src=' + items[i].item_data.image_url + '>' + '<br/><p>' + items[i].item_data.text 
			+ '<p><br /><a href="' + items[i].item_data.link + '">' + items[i].item_data.link_text + '</a></div>');
		}else if(items[i].service_name == "Twitter"){
			var str = items[i].item_data.tweet;
			str = parseURL(str);
			str = parseMentions(str);
			str = parseHashtag(str);
			post.append('<div class="post-contains"><span class="label tweetstamp fa fa-twitter fa-lg" aria-hidden="true">&nbsp;</span><div class="post-twitter"><h3><b>' + items[i].item_data.user.username + '</b></h3><br /><p>' + str + '</p></div></div>');
		}
		else{
			var str = items[i].item_data.caption;
			str = parseInsHashtag(str);
			post.append('<div class="post-contains post-instagram"><span class="label instamp fa fa-instagram fa-lg" aria-hidden="true">&nbsp;</span><a src="' + items[i].item_data.link + '"><img id="ins-image" src="' + items[i].item_data.image.medium + '"></img></a><br /><h4>'
			+ items[i].item_data.user.username +'</h4><br /><p>' + str + '</p></div>');
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
			post.append('<div class="post-contains post-manual"><span class="label manualstamp"><br /><p class="manualstampfont">AFF</p></span><img id="manual-image" src=' + items[i].item_data.image_url + '>' + '<br/><p>' + items[i].item_data.text 
			+ '<p><br /><a href="' + items[i].item_data.link + '">' + items[i].item_data.link_text + '</a></div>');
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
			post.append('<div class="post-contains"><span class="label tweetstamp fa fa-twitter fa-lg" aria-hidden="true">&nbsp;</span><div class="post-twitter"><h3><b>' + items[i].item_data.user.username + '</b></h3><br /><p>' + str + '</p></div></div>');
		}	
	}
}

//load ins message list
function loadIns(){
	for (var i = 0; i < items.length; i ++){
		if(items[i].service_name == "Instagram"){
			var str = items[i].item_data.caption;
			str = parseInsHashtag(str);
			post.append('<div class="post-contains post-instagram"><span class="label instamp fa fa-instagram fa-lg" aria-hidden="true">&nbsp;</span><a src="' + items[i].item_data.link + '"><img id="ins-image" src="' + items[i].item_data.image.medium + '"></img></a><br /><h4>'
			+ items[i].item_data.user.username +'</h4><br /><p>' + str + '</p></div>');
		}	
	}
}

loadData();


/*<div class="col-md-4">
	<div>AFF</div>
	<img src=""></img><br />
	<p>text</p><br />
	<a href="link">link_text</a>
</div>
/*<div class="col-md-4">
	<h2>items[i].item_data.user.username</h2><br />
	<p>items[i].item_data.tweet</p>
</div>*/
/*<div class="col-md-4">
	<a src="items[i].item_data.link"><img src="items[i].image.medium"></img></a><br />
	<h2>items[i].user.username></h2><br />
	<p>items[i].item_data.caption</p>
</div>*/