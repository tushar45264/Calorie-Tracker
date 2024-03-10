import Calorie from "../models/calorie.js";
import moment from "moment";

export const CalorieIntake = async (req, res) => {
    const { id } = req.params;
    const { date, calories } = req.body;

    try {
        const startOfDay = moment(date).startOf('day').toDate();
        const endOfDay = moment(date).endOf('day').toDate();
        let existingEntry = await Calorie.findOne({
            userId:id,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (existingEntry) {
            existingEntry.calories += Number(calories);
            await existingEntry.save();
            res.status(200).json({ message: "Calories added successfully" });
        } else {
            const newEntry = new Calorie({
                userId:id,
                date,
                calories
            });
            await newEntry.save();
            res.status(201).json({ message: "Calories added successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
        console.log(error);
    }
};

export const getWeeklyCalorieIntake = async (req, res) => {
    const { id } = req.params;
    try {
        
        const startOfPreviousWeek = moment().subtract(1, 'week').startOf('week').add(2, 'day').toDate();
        const endOfPreviousWeek = moment().startOf('week').add(1, 'day').toDate();
        const weeklyCalories = await Calorie.find({
            userId: id,
            date: { $gte: startOfPreviousWeek, $lte: endOfPreviousWeek },
        });

        let totalCalories = 0;
        let n = 0;
        weeklyCalories.forEach((calorie) => {
            totalCalories += calorie.calories;
            n++;
        });
        const averageCalories = totalCalories / n;

        res.status(200).json({ weeklyCalories,totalCalories,averageCalories });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
        console.log(error);
    }
};
