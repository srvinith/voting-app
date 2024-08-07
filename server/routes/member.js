const express = require('express');
const router = express.Router();
const Member = require('../models/member');

// GET all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).send('Server Error');
  }
});

// POST to vote for a member
router.post('/vote', async (req, res) => {
    const { memberId } = req.body;
    try {
      if (!memberId) {
        return res.status(400).send('Member ID is required');
      }
      const member = await Member.findById(memberId);
      if (!member) {
        return res.status(404).send('Member not found');
      }
      await Member.findByIdAndUpdate(memberId, { $inc: { votes: 1 } });
      res.sendStatus(200);
    } catch (error) {
      console.error('Error voting for member:', error);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;
