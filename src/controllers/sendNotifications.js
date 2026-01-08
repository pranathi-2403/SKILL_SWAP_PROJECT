const db=require("../db/connection.js");

async function sendClassNotificationsForToday(req,res) {
    const uid=req.session.userId;
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    try{
        const tquery = `
            SELECT ct.date, ct.start_time, ct.end_time, ct.skill_id, s.user_id,s.name as skill_name
            FROM class_timings ct
            JOIN skills s ON ct.skill_id = s.skill_id
            WHERE ct.date = ? and s.user_id=?;
        `;
    
        const lquery = `
            SELECT ct.date, ct.start_time, ct.end_time, ct.skill_id, s.user_id,s.name as skill_name,u.address
            FROM class_timings ct
            JOIN skills s ON ct.skill_id = s.skill_id
            JOIN users u ON u.user_id = s.user_id
            JOIN participants p ON p.class_id = ct.class_id
            WHERE ct.date = ? and p.user_id=?;
        `;
    
        const [teachNotify]=await db.query(tquery, [today,uid]);
        const [learnNotify]=await db.query(lquery,[today,uid]);
    
        return res.status(200).json({success:true,teach:teachNotify,learn:learnNotify,message:"successfully retrieved notifications"});

    }catch(error){
        console.log(error);
        return res.status(400).json({message:'Server error'});
    }

}

module.exports={sendClassNotificationsForToday};