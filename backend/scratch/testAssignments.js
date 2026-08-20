const mongoose = require('mongoose');
require('dotenv').config();
const Assignment = require('../src/models/assignment.model');
const Student = require('../src/models/student.model');

async function testUpdatedFilter() {
    await mongoose.connect(process.env.MONGODB_URI);
    const students = await Student.find({ studentClass: '11' });
    for (const student of students) {
        const filter = {
            studentClass: { $in: [student.studentClass, "All"] },
            isActive: true,
        };

        if (student.subjects && student.subjects.length > 0) {
            filter.subject = {
                $in: student.subjects,
            };
        }

        if (student.stream) {
            filter.$or = [
                { stream: student.stream },
                { stream: "" },
                { stream: { $exists: false } },
            ];
        }

        const assignments = await Assignment.find(filter);
        console.log(`Student ${student.fullName} (Class ${student.studentClass}, Stream "${student.stream}") => Found ${assignments.length} assignments!`);
    }
    await mongoose.disconnect();
}
testUpdatedFilter();
