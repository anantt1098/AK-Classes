const Assignment = require("../models/assignment.model");

// ==========================================
// Create Assignment (Teacher)
// ==========================================
const createAssignment = async (req, res) => {
    try {

        const {
            title,
            description,
            studentClass,
            subject,
            dueDate,
            attachment,
        } = req.body;

        if (
            !title ||
            !description ||
            !studentClass ||
            !subject ||
            !dueDate
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields are required.",
            });
        }

        const assignment =
            await Assignment.create({

                title,

                description,

                studentClass,

                subject,

                dueDate,

                attachment:
                    attachment || "",

                uploadedBy:
                    req.user.id,

            });

        await assignment.populate(
            "uploadedBy",
            "username email"
        );

        return res.status(201).json({

            success: true,

            message:
                "Assignment created successfully.",

            assignment,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};
// ==========================================
// Get All Assignments
// ==========================================
const getAllAssignments = async (req, res) => {
    try {

        const {
            page = 1,
            limit = 10,
            studentClass,
            subject,
            search,
        } = req.query;

        const filter = {};

        if (studentClass) {
            filter.studentClass = studentClass;
        }

        if (subject) {
            filter.subject = subject;
        }

        if (search) {

            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];

        }

        const assignments =
            await Assignment.find(filter)
                .populate(
                    "uploadedBy",
                    "username email"
                )
                .sort({
                    createdAt: -1,
                })
                .skip(
                    (Number(page) - 1) *
                        Number(limit)
                )
                .limit(Number(limit));

        const total =
            await Assignment.countDocuments(
                filter
            );

        return res.status(200).json({

            success: true,

            page: Number(page),

            totalPages: Math.ceil(
                total / Number(limit)
            ),

            totalRecords: total,

            assignments,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};

// ==========================================
// Get Assignment By ID
// ==========================================
const getAssignmentById = async (req, res) => {
    try {

        const assignment =
            await Assignment.findById(
                req.params.id
            ).populate(
                "uploadedBy",
                "username email"
            );

        if (!assignment) {

            return res.status(404).json({

                success: false,

                message:
                    "Assignment not found.",

            });

        }

        return res.status(200).json({

            success: true,

            assignment,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};
// ==========================================
// Update Assignment
// ==========================================
const updateAssignment = async (req, res) => {
    try {

        const assignment =
            await Assignment.findById(
                req.params.id
            );

        if (!assignment) {

            return res.status(404).json({

                success: false,

                message:
                    "Assignment not found.",

            });

        }

        const {
            title,
            description,
            studentClass,
            subject,
            dueDate,
            attachment,
            isActive,
        } = req.body;

        if (title !== undefined) {
            assignment.title = title;
        }

        if (description !== undefined) {
            assignment.description =
                description;
        }

        if (studentClass !== undefined) {
            assignment.studentClass =
                studentClass;
        }

        if (subject !== undefined) {
            assignment.subject =
                subject;
        }

        if (dueDate !== undefined) {
            assignment.dueDate =
                dueDate;
        }

        if (attachment !== undefined) {
            assignment.attachment =
                attachment;
        }

        if (isActive !== undefined) {
            assignment.isActive =
                isActive;
        }

        await assignment.save();

        await assignment.populate(
            "uploadedBy",
            "username email"
        );

        return res.status(200).json({

            success: true,

            message:
                "Assignment updated successfully.",

            assignment,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};

// ==========================================
// Delete Assignment
// ==========================================
const deleteAssignment = async (req, res) => {
    try {

        const assignment =
            await Assignment.findById(
                req.params.id
            );

        if (!assignment) {

            return res.status(404).json({

                success: false,

                message:
                    "Assignment not found.",

            });

        }

        await assignment.deleteOne();

        return res.status(200).json({

            success: true,

            message:
                "Assignment deleted successfully.",

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};

// ==========================================
// Get Student Assignments
// ==========================================
const getStudentAssignments = async (req, res) => {

    try {

        const Student = require("../models/student.model");


        const student =
            await Student.findOne({
                user: req.user.id,
            });



        if (!student) {

            return res.status(404).json({

                success:false,

                message:
                "Student profile not found.",

            });

        }



        const filter = {

            studentClass:
            student.studentClass,

            isActive:true,

        };

        if (student.subjects && student.subjects.length > 0) {
            filter.subject = {
                $in: student.subjects,
            };
        }



        // For class 11-12

        if(student.stream){

            filter.stream =
            student.stream;

        }



        const assignments =
        await Assignment.find(filter)

        .populate(
            "uploadedBy",
            "username email"
        )

        .sort({

            createdAt:-1,

        });




        return res.status(200).json({

            success:true,

            assignments,

        });



    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message,

        });


    }

};

module.exports = {

    createAssignment,

    getAllAssignments,

    getStudentAssignments,

    getAssignmentById,

    updateAssignment,

    deleteAssignment,

};