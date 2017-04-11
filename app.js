var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "MedryBW"]; 
$('#searchBox').hide(); 
var loaded_first_time = false; 

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

if(!loaded_first_time){
 getUserHTML(channels)
 loaded_first_time = true; 
}; 

function createEachUser(data){

  var getUserHTML = function(){
    if($('#users').children().length === 0) {
    _.each(data, function(userArr){
      _.each(userArr, function(userObj){
        if(userObj.logo){
          $('#users').append('<div class="non_live_channel"><img id="user_img" src='+userObj.logo+'><a target="_blank" href=https://www.twitch.tv/'+userObj.name+'><h1>'+userObj.display_name+'</h1></a><div class="live_status_circle" id='+userObj.name+'></div></div>');
            } else {
          $('#users').append('<div class="non_live_channel"><img id="user_img" src=bolt.png><a target="_blank" href=https://www.twitch.tv/'+userObj.name+'><h1>'+userObj.display_name+'</h1></a><div class="live_status_circle" id='+userObj.name+'></div></div>');
        }
      })
    })
  }
}; 

  getUserHTML()
  checkLiveStream(data)
}; 

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

// function labelNonLive(){    
//  var non_live_channel = document.getElementsByClassName('user');
//  $(non_live_channel).addClass("not_live");
//  $(non_live_channel).removeClass("user");
//  $('.live').hide();
//  $('.not_live').show();
// }

// function filterNotLive(data){
//   console.log('two')
//   $('.non_live_channel').show();
//   $('.live').hide();
// }

function hideSearchBox(){
  $('#search').hide();
  $('#users').css({'margin-top': '141px'}) 
  $('#searchBox').hide();
}

$('#all').on('click', function(){
  $('#searchBox').hide();
  $('#users').css({'margin-top': '141px'}) 
  $('#search').show();
  $('.non_live_channel').show();
  $('.live').show();
});

$('#online').on('click', function(){
 var users = channels.join()
  var url = 'https://api.twitch.tv/kraken/users?login='+users+'&api_version=5'
  hideSearchBox()

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
   var users = channels.join()
  var url = 'https://api.twitch.tv/kraken/users?login='+users+'&api_version=5'
  hideSearchBox()

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