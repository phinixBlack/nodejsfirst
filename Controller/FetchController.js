const express = require('express');
const router = express.Router();
const leadModel = require('../Model/LeadModel');
// const app = express();
router.use(express.json()); // for JSON payloads
router.use(express.urlencoded({ extended: true })); 

router.get('/fetchdata', (req, res) => {
    leadModel.getAllLeads((err, leads) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching leads' });
        }
        return res.status(200).json(leads);
    });
});

router.post('/add-lead', (req, res) => {
    const leadData = req.body;

    leadModel.addLeads(leadData,(err, leads) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error fetching leads' });
        }
        return res.status(200).json(leads);
    });
});


module.exports = router;