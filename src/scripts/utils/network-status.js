const NetworkStatus = {
  _callbacks: {
    online: [],
    offline: [],
    statusChange: [],
  },

  _isOnline: window.navigator.onLine,

  init() {
    window.addEventListener("online", this._handleOnline.bind(this));
    window.addEventListener("offline", this._handleOffline.bind(this));
  },

  _handleOnline() {
    this._isOnline = true;
    this._notifyCallbacks("online");
    this._notifyCallbacks("statusChange", true);
  },

  _handleOffline() {
    this._isOnline = false;
    this._notifyCallbacks("offline");
    this._notifyCallbacks("statusChange", false);
  },

  _notifyCallbacks(eventType, data) {
    this._callbacks[eventType].forEach((callback) => {
      callback(data);
    });
  },

  addOnlineCallback(callback) {
    this._callbacks.online.push(callback);
  },

  addOfflineCallback(callback) {
    this._callbacks.offline.push(callback);
  },

  addStatusChangeCallback(callback) {
    this._callbacks.statusChange.push(callback);
  },

  isOnline() {
    return this._isOnline;
  },
};

export default NetworkStatus;
