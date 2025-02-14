const ReportsModel = require('../models/services/reportsModel')

exports.getSummary = (async (req, res, next) => {
    const reports = new ReportsModel()
    const transactions = await reports.summary(req.userId)

    console.log(transactions[0].type);
    console.log(parseFloat(transactions[0].amount));

    res.status(200).json({transactions})
    
})