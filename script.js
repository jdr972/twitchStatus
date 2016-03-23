$(document).ready(function() {

    $("#chg").click(function() {
        var name = document.getElementById("input").value;
        name = name.toLowerCase();
        getChannelInfo(name);
        isOnline(name);
    });

    function getChannelInfo(username) {
        var url = 'https://api.twitch.tv/kraken/channels/' +
            username;
        $.getJSON(url, function(object) {
            var iconUrl = object.logo;
            if(iconUrl !== null){$("#logo").attr("src", iconUrl);}
          else {$("#logo").attr("src","https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png")}
            $("#channel").html(object.display_name);
        });
    }

    function isOnline(username) {
        var streamUrl = " https://api.twitch.tv/kraken/streams/"+username;
        $.getJSON(streamUrl, function(obj) {
          if(obj.stream !== null){
            if(obj.stream.game !== null) {
                 var link = "https://twitch.tv/"+username;
                $("#game").html("<i>Playing : " + obj.stream.game +"</i>");
                $("#status").html("Status : <a href="+link+" target='blank_'>Online</a>");
                $("#title").html(obj.stream.channel.status)
            }

          }
           else {
             $("#status").html("Status : Offline");
             $("#game").html("");
             $("#title").html("");
           }
        });
    }
getChannelInfo("imaqtpie");
isOnline("imaqtpie");
});
