const pool = require('../data')
const { getUserInfos, verifyUser } = require('../repositories/repositories')

module.exports = class Goals {
    constructor(){}
    async setGoal(userId, goalName, targetAmount, currentAmount, deadline, status = "In progress.") {

        const user = await getUserInfos(userId)
        const userExist = await verifyUser(user.email)
        if (!userExist) {
            return 'User not found.'
        }

        const query = 'INSERT INTO goals (user_id, name, target_amount, current_amount, deadline, status) VALUES ($1, $2, $3, $4, $5, $6)'
        await pool.query(query, [userId, goalName, targetAmount, currentAmount, deadline, status])

        return 'Goal created successfully.'
    }

    async getGoals(userId) {
        const user = await getUserInfos(userId)
        const userExist = await verifyUser(user.email)
        if (!userExist) {
            return 'User not found.'
        }

        const query = 'SELECT * FROM goals WHERE user_id = $1';
        const goals = await pool.query( query, [ userId ] )

        if (goals.rows.length === 0) {
            return 'Goals not found.'
        }

        return goals.rows
    }

    async getGoalbyId(goalId, userId) {
        const user = await getUserInfos(userId)
        const userExist = await verifyUser(user.email)
        if (!userExist) {
            return 'User not found.'
        }

        const query = 'SELECT * FROM goals WHERE id = $1 and user_id = $2';
        const goal = await pool.query( query, [ goalId, userId ] )

        if (goal.rows.length === 0) {
            return 'Goal not found.'
        }

        return goal.rows
    }

    async deleteGoalById(goalId, userId) {

        const goalExist = await this.getGoalbyId(goalId, userId)

        if (goalExist === 'Goal not found.') {
            return 'Goal not found.'
        }

        const query = 'DELETE FROM goals WHERE id = $1 and user_id = $2';
        const goal = await pool.query( query, [ goalId, userId ] )

        return 'Goal successfully deleted.'
    }
}