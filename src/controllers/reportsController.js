const ReportsModel = require('../models/services/reportsModel')

exports.Income = (async (req, res, next) => {
    const reports = new ReportsModel()
    const income = await reports.income(req.userId)

    // console.log(income);

    res.status(200).json({income})
    
})

exports.Expenses = (async (req, res, next) => {
    const reports = new ReportsModel()
    const expenses = await reports.expenses(req.userId)

    // console.log(expenses);

    res.status(200).json({expenses})
    
})

exports.Summary = (async (req, res, next) => {
    const id = req.userId;
    const category = req.params.category

    const reports = new ReportsModel();
    const summary = await reports.summary(id, category)

    // console.log(summary)

    res.status(200).json({summary})
})

