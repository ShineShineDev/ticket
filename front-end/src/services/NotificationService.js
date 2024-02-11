export default {
    showNotification(message) {
        if (Notification.permission === "granted") {
            const notification = new Notification("New Notification", {
                body: message,
                icon: process.env.BASE_URL + 'user-avatar.png',
                sound: process.env.BASE_URL + 'noti.mp3',
            });

            setTimeout(() => {
                notification.close();
            }, 5000);
        } else {
            alert("Please Grant Noti Permission")
        }
    },
    RequestNotificationPermission() {
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    console.log("Notification permission granted!");
                }
            });
        }
    },
};
