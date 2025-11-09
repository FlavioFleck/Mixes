import NotificationService from "../services/NotificationService";

export default class NotificationController {
    constructor(connection) {
        this.notificationService = new NotificationService(connection)
    }

    ListAllNotificationsByUserId = async (req, res) => {
        const payload = {
            ...req.user
        }
        const result = await this.notificationService.getNotificationsByUserId(payload)
        res.send({result: result})
    }
}