export class WebNotifications {
  // true iff the browser supports notifications and the user hasn't blocked us
  static canNotify() {
    return "Notification" in window && Notification.permission !== "denied";
  }

  // requests permission from the user to send notifications later
  static requestPermission(callback) {
    if (WebNotifications.canNotify() && Notification.permission !== "granted") {
      Notification.requestPermission(callback);
    }
  }

  static send(message, options) {
    if (!WebNotifications.canNotify()) return;
    const notify = () => {
      const notification = new Notification(message, options);
      if (options.timeout) {
        setTimeout(() => {
          notification.close();
        }, options.timeout);
      }
    };
    if (Notification.permission === "granted") {
      notify();
    } else {
      WebNotifications.requestPermission(() => {
        if (Notification.permission === "granted") notify();
      });
    }
  }
}
