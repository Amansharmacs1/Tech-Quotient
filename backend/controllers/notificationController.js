import Notification from '../models/Notification.js';
import { getStoreData, markNotificationsRead } from '../services/store.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all notifications
// @route   GET /api/notifications
export const getNotifications = async (req, res, next) => {
  try {
    try {
      const notifications = await Notification.find().sort({ createdAt: -1 });
      if (notifications && notifications.length > 0) {
        return res.json({
          success: true,
          data: notifications,
          notifications
        });
      }
    } catch (dbErr) {}

    const notifications = getStoreData().notifications;
    return res.json({
      success: true,
      data: notifications,
      notifications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark notifications as read
// @route   POST /api/notifications/read
export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.body;

    try {
      if (id) {
        await Notification.findByIdAndUpdate(id, { unread: false });
      } else {
        await Notification.updateMany({}, { unread: false });
      }
    } catch (dbErr) {}

    const notifications = markNotificationsRead(id);
    return res.json({
      success: true,
      notifications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create announcement (Faculty only)
// @route   POST /api/notifications/announcement
export const createAnnouncement = async (req, res, next) => {
  try {
    const { title, content, targetCourse } = req.body;

    if (!title || !content) {
      return sendError(res, 'Title and content are required', 400);
    }

    const notificationData = {
      title,
      message: content,
      type: 'announcement',
      targetCourse: targetCourse || 'All Courses',
      time: 'Just now',
      unread: true
    };

    try {
      const created = await Notification.create(notificationData);
      return res.status(201).json({
        success: true,
        data: created,
        notification: created
      });
    } catch (dbErr) {
      const store = getStoreData();
      const newNotif = {
        id: Date.now(),
        customId: Date.now(),
        ...notificationData
      };
      store.notifications.unshift(newNotif);

      return res.status(201).json({
        success: true,
        data: newNotif,
        notification: newNotif
      });
    }
  } catch (error) {
    next(error);
  }
};
