const db = require('../../db/connection.js');

const updateSkill = async (req, res) => {
    const { skill_id, name, description } = req.body;

    // Validate input
    if (!skill_id) {
        return res.status(400).json({ status: 'error', message: 'Skill ID is required' });
    }

    if (!name && description.trim() === "") {
        return res.status(400).json({ status: 'error', message: 'At least one field (name or description) must be provided for update' });
    }

    try {
        // Check if the skill exists
        const [skill] = await db.query('SELECT * FROM skills WHERE skill_id = ?', [skill_id]);
        if (skill.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Skill not found' });
        }

        // Build the update query dynamically
        const fields = [];
        const values = [];

        if (name) {
            fields.push('name = ?');
            values.push(name);
        }

        if (description.trim() !== "") {
            fields.push('description = ?');
            values.push(description);
        }

        values.push(skill_id);

        const query = `UPDATE skills SET ${fields.join(', ')} WHERE skill_id = ?`;
        await db.query(query, values);

        return res.status(200).json({ status: 'success', message: 'Skill updated successfully', success: true });
    } catch (error) {
        console.error('Error updating skill:', error.message);
        return res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

module.exports = { updateSkill };
