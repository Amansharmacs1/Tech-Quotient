import { getStoreData, markNotificationsRead, clearNotifications } from '../services/store.js';

export const getNotifications = async (req, res, next) => {
  try {
    const store = getStoreData();
    return res.json({
      success: true,
      notifications: store.notifications
    });
  } catch (error) {
    next(error);
  }
};

export const markRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notifications = markNotificationsRead(id);
    return res.json({
      success: true,
      notifications
    });
  } catch (error) {
    next(error);
  }
};

export const clearAll = async (req, res, next) => {
  try {
    const notifications = clearNotifications();
    return res.json({
      success: true,
      notifications
    });
  } catch (error) {
    next(error);
  }
};
