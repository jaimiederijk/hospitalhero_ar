var adminHtmlElemenents = {
  adminDancePoints : document.querySelector('#admin_dance_points'),
  adminUserList: document.querySelector('#admin_user_list'),
  adminWhatGame: document.querySelector('#admin_what_game'),
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
      var htmlString = "";
      for (var i = 0; i < data.length; i++) {
        htmlString = htmlString + "<li>" + data[i] + "</li>";
      }
      viewChanges.updateUserList(htmlString);
      console.log(data);
    });
  },

}

var viewChanges = {
  updatePoints : (p) => {
    adminHtmlElemenents.adminDancePoints.innerHTML = p;
  },
  updateUserList : (l) => {
    adminHtmlElemenents.adminUserList.innerHTML = l;
  }
}

var setup = () => {
  ioStuff.startListeners();
};

setup();
