import { v4 as uuidv4 } from "uuid";
import model from "./model";
export default function AssignmentsDao() {
  const findAssignmentsForCourse = (courseId) =>
    model.find({ course: courseId });
  const findAssignmentById = (assignmentId) => model.findById(assignmentId);
  const createAssignment = (assignment) => {
    const created = { ...assignment, _id: uuidv4() };
    return model.create(created);
  };
  const updateAssignment = (assignmentId, updates) =>
    model.updateOne({ _id: assignmentId }, { $set: updates });
  const deleteAssignment = (assignmentId) =>
    model.deleteOne({ _id: assignmentId });
  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
