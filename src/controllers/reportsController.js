const ReportsModel = require('../models/services/reportsModel')

exports.Income = (async (req, res, next) => {
    const reports = new ReportsModel()
    const income = await reports.income(req.userId)

    console.log(income);

    res.status(200).json({receita: income[0], numReceitas: income[1]})
    
})

exports.Expenses = (async (req, res, next) => {
    const reports = new ReportsModel()
    const expenses = await reports.expenses(req.userId)

    console.log(expenses);

    res.status(200).json({receita: expenses[0], numReceitas: expenses[1]})
    
})

