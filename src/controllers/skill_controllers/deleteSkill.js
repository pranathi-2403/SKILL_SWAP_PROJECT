const db = require('../../db/connection.js');

const deleteSkill = async (req, res) => {
    const skill_id = req.params.skillId;

    // Validate input
    if (!skill_id) {
        return res.status(400).json({ status: 'error', message: 'Skill ID is required' });
    }

    try {
        // Check if the skill exists
        const [skill] = await db.query('SELECT * FROM skills WHERE skill_id = ?', [skill_id]);
        if (skill.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Skill not found' });
        }

        // Delete the skill
        await db.query('DELETE FROM skills WHERE skill_id = ?', [skill_id]);

        return res.status(200).json({ status: 'success', message: 'Skill deleted successfully', success: true });
    } catch (error) {
        console.error('Error deleting skill:', error.message);
        return res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

module.exports = { deleteSkill };
