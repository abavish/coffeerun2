(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    // $.post(this.serverUrl, val, function(serverResponse) {
    //   console.log(serverResponse);
    // });
    this.Remove(key);

    $.ajax(this.serverUrl, {
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(val),
      success: function(coffeOrderData) {
        console.log(coffeOrderData.id);
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });
  };

  RemoteDataStore.prototype.getAll = function() {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      //cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function(key) {
    $.get(this.serverUrl + "/" + key, function(serverResponse) {
      console.log(serverResponse);
      //cb(serverResponse);
    });
  };

  // RemoteDataStore.prototype.remove = function(key) {
  //   $.ajax(this.serverUrl + '/' + key, {
  //     type: 'DELETE'
  //   });
  // };

  RemoteDataStore.prototype.remove = function(key) {
    $.get(this.serverUrl + "?emailAddress=" + key, function(serverResponse) {
      console.log(serverResponse[0].id);
      $.ajax(this.serverUrl + '/' + serverResponse[0].id, {
        type: 'DELETE'
      });
    }.bind(this));
    //console.log(coffeeOrderId);
    // $.ajax(this.serverUrl + '?emailAddress=' + key, {
    //   type: 'DELETE'
    // });
  };


  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
