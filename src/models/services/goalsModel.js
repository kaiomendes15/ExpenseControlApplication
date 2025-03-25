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

        const client = await pool.connect()
        // console.log("Entrou na função")
        try {
            await client.query('BEGIN')
            const query = `DELETE FROM goals WHERE id = $1 and user_id = $2`;

            await client.query(query, [goalId, userId]);
            await client.query('COMMIT')

            return 'Goal successfully deleted.'
            
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }
    }

    async updateGoal(goalId, userId, goalName, targetAmount, currentAmount, deadline, status = "In progress.") {
        const goalExist = await this.getGoalbyId(goalId, userId)

        if (goalExist === 'Goal not found.') {
            return 'Goal not found.'
        }

        const client = await pool.connect()
        // console.log("Entrou na função")
        try {
            await client.query('BEGIN')
            const query = `UPDATE goals SET name = $1, target_amount = $2,current_amount = $3, deadline = $4, status = $5 WHERE id = $6`;

            await client.query(query, [goalName, targetAmount, currentAmount, deadline, status, goalId]);
            await client.query('COMMIT')

            return 'Transaction updated successfully'
            
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }
    }
}