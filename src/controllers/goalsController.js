const GoalModels = require('../models/services/goalsModel');

exports.SetGoal = (async (req, res, next) => {
    // params
    const userId = req.userId
    const { goalName, targetAmount, currentAmount, deadline, status } = req.body

    // goal methods
    const services = new GoalModels();
    const newGoal = await services.setGoal(userId, goalName, targetAmount, currentAmount, deadline, status)

    if (newGoal === 'User not found.') {
        return res.status(404).json({message: 'User not found.'})
    }

    return res.status(200).json({newGoal})

})

exports.GetGoals = (async (req, res, next) => {
    // params
    const userId = req.userId

    // goal methods
    const services = new GoalModels();
    const goals = await services.getGoals(userId);

    if (goals === 'Goals not found.') {
        return res.status(404).json({message: 'Goals not found.'})
    }

    return res.status(200).json({goals})

})

exports.GetGoalById = (async (req, res, next) => {
    // params
    const userId = req.userId
    const goalId = req.params.id

    // goal methods
    const services = new GoalModels();
    const goal = await services.getGoalbyId(goalId, userId);

    if (goal === 'Goal not found.') {
        return res.status(404).json({message: 'Goal not found.'})
    }

    return res.status(200).json({goal})

})

exports.DeleteGoalById = (async (req, res, next) => {
    // params
    const userId = req.userId
    const goalId = req.params.id

    // goal methods
    const services = new GoalModels();
    const goal = await services.deleteGoalById(goalId, userId);

    if (goal === 'Goal not found.') {
        return res.status(404).json({message: 'Goal not found.'})
    }

    return res.status(200).json({message: goal})

})