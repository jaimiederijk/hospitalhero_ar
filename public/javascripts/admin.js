var adminHtmlElemenents = {
  adminDancePoints : document.querySelector('#admin_dance_points'),
  adminUserList: document.querySelector('#admin_user_list'),
  adminWhatGame: document.querySelector('#admin_what_game'),
  listOfSubButtons:[],
}

ioStuff = {
  origin : window.location.origin,
  socket : io.connect(this.origin + "/admin"),
  startListeners : () => {
    ioStuff.socket.on('adminupdatepoints', function (data) {
      viewChanges.updatePoints(data.newPoints);
      console.log(data);
    });
    ioStuff.socket.on('adminupdateuserlist', function (data) {
      console.log("updat user list");
      console.log(data);
      var htmlString = "";
      for (var i = 0; i < data.length; i++) {
        htmlString = htmlString + "<li>" + data[i].data.username + "<div>"+ data[i].points +"</div><div>"+ data[i].gametype +"</div><textarea></textarea><button>verstuur</button></li>";
      }
      viewChanges.updateUserList(htmlString);

    });

  },
  resetListeners : () => {
    for (var i = 0; i < adminHtmlElemenents.listOfSubButtons.length; i++) {
      adminHtmlElemenents.listOfSubButtons[i].addEventListener("click", ()=>{
        var userText = document.querySelectorAll("#admin_user_list textarea");
        // debugger
        var text = userText[0].value;

        console.log("clik button "+i);

        ioStuff.socket.emit('msg',{ msg:text})
      })
    }
  }

}

var viewChanges = {
  updateCatchUserList : (p) => {
    adminHtmlElemenents.adminDancePoints.innerHTML = p;
  },
  updateUserList : (l) => {
    adminHtmlElemenents.adminUserList.innerHTML = l;
    adminHtmlElemenents.listOfSubButtons= document.querySelectorAll("#admin_user_list button");
    ioStuff.resetListeners();
  }
}

var setup = () => {
  ioStuff.startListeners();
};

setup();
