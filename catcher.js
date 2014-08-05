/* 
 * Console Catcher:
 *
 * Beam otherwise unreachable console.logs to a websocket 
 * (i.e PhoneGap).
 #
 # Console Catcher sends your console.logs to a desired
 # websocket, where you can now happily tail the unreachable.   
 # The standard console.log message will not be blocked.
 # 
 # To start:
 # catcher = new ConsoleCatcher({url: location of websocket})
 #
 */

function ConsoleCatcher(options) {
  this.socket = new SocketHandler(options);
  this.Catch();
} 

ConsoleCatcher.prototype.Catch = function() {
  var self = this;
  var log = console.log;
  console.log = function () {
    var msg = Array.prototype.slice.call(arguments);
    log.apply(this, msg);
    self.socket.SendMessage(msg);
  };
};

function SocketHandler(options) {
  this.socket = null;
  this.pendingMessages = [];

  this.socketUrl = options.url;
}

SocketHandler.prototype.SendMessage = function(m) {
  if (!this.socket || this.socket.readyState != 1) {
    this.pendingMessages.push(m);
    this._Connect();
  } else {
    this.socket.send(m);
  }
};

SocketHandler.prototype._Connect = function() {
  this.socket = new WebSocket(this.socketUrl);
  this._SocketListeners();
};

SocketHandler.prototype._SocketListeners = function() {
  var self = this;
   self.socket.onopen = function() {
    self._SendPendingMessages();
  };
};

SocketHandler.prototype._SendPendingMessages = function() {
  if (!this.pendingMessages) return;

  var self = this;
  for (var i = 0; i < self.pendingMessages.length; i++) {
    var m = self.pendingMessages[i];
    self.SendMessage(m);
  }
  self.pendingMessages = [];
};
