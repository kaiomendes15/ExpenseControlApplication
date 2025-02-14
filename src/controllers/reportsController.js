const ReportsModel = require('../models/services/reportsModel')

exports.getSummary = (async (req, res, next) => {
    const reports = new ReportsModel()
    const income = await reports.summary(req.userId)

    console.log(income);

    res.status(200).json({income})
    
})