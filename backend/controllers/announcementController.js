import Announcement from '../models/Announcement.js';

export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, targetCourse } = req.body;
    const newAnnouncement = new Announcement({
      title,
      content,
      targetCourse,
      author: req.user.id
    });
    const saved = await newAnnouncement.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 }).populate('author', 'name email');
    res.status(200).json({ success: true, data: announcements });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    await announcement.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
