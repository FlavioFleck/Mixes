import NotificationService from "../services/NotificationService";

export default class NotificationController {
    constructor(connection) {
        this.notificationService = new NotificationService(connection)
    }

    ListAllNotifications = async (req, res) => {
        const result = await this.notificationService.getAllNotifications()
        res.send({result: result})
    }
}