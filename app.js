var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "MedryBW"];

$('#searchBox').hide(); 

var loaded_first_time = false; 

//calls  createEachUser function
function getUserHTML(users){ 
  var users = users.join()
  var url = 'https://api.twitch.tv/kraken/users?login='+users+'&api_version=5'

  $.ajax({
    headers: { 
    'Client-ID': clientId,
    'Accept' : "application/vnd.twitchtv.v5+json"
    },
    type: 'GET',
    url: url,
    success: function(data) {
        createEachUser(data)
    }
  });
};

//loads page for the first time for all
if(!loaded_first_time){
 getUserHTML(channels)
 loaded_first_time = true; 
}; 

//creates html to user appends to page
function createEachUser(data){

  var getUserHTML = function(){
    if($('#users').children().length === 0) {
    _.each(data, function(userArr){
      _.each(userArr, function(userObj){
        if(userObj.logo){
          $('#users').append('<li class="non_live_channel"><img id="user_img" src='+userObj.logo+'><a target="_blank" href=https://www.twitch.tv/'+userObj.name+'><h1>'+userObj.display_name+'</h1></a><h4 id="title"></h4><div class="live_status_circle" id='+userObj.name+'></div></li>');
            } else {
          $('#users').append('<li class="non_live_channel"><img id="user_img" src=bolt.png><a target="_blank" href=https://www.twitch.tv/'+userObj.name+'><h1>'+userObj.display_name+'</h1></a><h4 id="title"></h4><div class="live_status_circle" id='+userObj.name+'></div></li>');
        }
      })
    })
  }
}; 

  getUserHTML()
  checkLiveStream(data)
}; 

//checks if user is live
function checkLiveStream(data){
  function checkEachId(id){ 
    var url = 'https://api.twitch.tv/kraken/streams/'+id 
    $.ajax({
      headers: { 
        'Client-ID': clientId,
        'Accept' : 'application/vnd.twitchtv.v5+json'
      },
      type: 'GET',
      url: url,
      success: function(data) {
        if(data.stream !== null){
        var live_channel = document.getElementById(data.stream.channel.name);
        $(live_channel).css( "background-color", "#74FF31"); 
        $(live_channel).parent().addClass("live");
        $(live_channel).parent().removeClass('non_live_channel'); 
        var channelName = data.stream.channel.name;
        var divs = document.getElementById('users');
        var user = divs.getElementsByClassName('live')
        
        for(var i = 0; i < user.length; i++){
          
          if(user[i].innerText.toUpperCase() === channelName.toUpperCase()){
            console.log(user[i].innerText, channelName, data.stream.channel.status)
            var channelName = channelName.toLowerCase(); 
             $('#'+channelName).prev()[0].innerText = data.stream.channel.status
          }
        }
        
        } 
      }
    });
  };

  _.each(data, function(userArr){ 
    _.each(userArr, function(eachObj){
        checkEachId(eachObj._id)
    })
  });
};



$('#all').on('click', function(){
  $('#searchBox').hide();
  $('#users').css({'margin-top': '141px'}) 
  $('#search').show();
  $('.non_live_channel').show();
  $('.live').show();
});

$('#online').on('click', function(){
  $('#searchBox').hide();
  $('#users').css({'margin-top': '141px'}) 
  $('#search').show();
  var users = channels.join()
  var url = 'https://api.twitch.tv/kraken/users?login='+users+'&api_version=5'

  var ajaxOptions = {
  headers: { 
    'Client-ID': clientId,
    'Accept' : "application/vnd.twitchtv.v5+json"
    },
    type: 'GET',
    url: url,
    success: function(data) {
        createEachUser(data)
    }
  };

  $.ajax(ajaxOptions).done(function(){
    $('.non_live_channel').hide();
    $('.live').show();
  })
});

$('#offline').on('click', function(){
  $('#searchBox').hide();
  $('#users').css({'margin-top': '141px'}) 
  $('#search').show();
  var users = channels.join()
  var url = 'https://api.twitch.tv/kraken/users?login='+users+'&api_version=5'

  var ajaxOptions = {
  headers: { 
    'Client-ID': clientId,
    'Accept' : "application/vnd.twitchtv.v5+json"
    },
    type: 'GET',
    url: url,
    success: function(data) {
        createEachUser(data)
    }
  };

  $.ajax(ajaxOptions).done(function(){
    $('.non_live_channel').show();
    $('.live').hide();
  })
});

$('#search').on('click', function(){
  $('#searchBox').show();
  $('#users').css({'margin-top': '0'}) 
  }); 

$('#srch-term').keyup(function(event) {
  var wholeWord =""; 
  var wordTyped = $("#srch-term").val();
  wholeWord += wordTyped;
  filterDom(wholeWord);

 });

//need to modify so can search specific elements
function filterDom(word){
   
  // Declare variables
  var filter, ul, li, a, i;
  filter = word.toUpperCase();
  ul = document.getElementById("users");
  li = ul.getElementsByTagName('li');
  // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
    a = li[i];
    if (a.innerText.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      } else {
      li[i].style.display = "none"
    }
  }
};