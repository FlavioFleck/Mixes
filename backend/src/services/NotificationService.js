import Notification from "../models/Notification";
import NotificationRepository from "../repositories/NotificationRepository.js";

export default class NotificationService {
    constructor(connection) {
        this.notificationRepository = new NotificationRepository(connection)
    }

    async createNotification(payload) {
        const notification = new Notification(payload)
        const result = await this.notificationRepository.add(notification)
        return result
    }

    async deleteNotification(payload) {
        const result = await this.notificationRepository.delete(payload)
        return result
    }

    async getNotificationsByUserId(payload) {
        const result = await this.notificationRepository.getByUserId(payload)
        return result
    }
}