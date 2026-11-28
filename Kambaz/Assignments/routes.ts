import AssignmentsDao from "./dao";
export default function AssignmentRoutes(app) {
  const dao = AssignmentsDao();
  const findAssignmentsForCourse = async (req, res) => {
    const assignments = await dao.findAssignmentsForCourse(req.params.courseId);
    res.json(assignments);
  };
  const createAssignmentForCourse = async (req, res) => {
    const created = await dao.createAssignment({
      ...req.body,
      course: req.params.courseId,
    });
    res.json(created);
  };
  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    await dao.updateAssignment(assignmentId, req.body);
    const updated = await dao.findAssignmentById(assignmentId);
    if (!updated) {
      res.status(404).json({ message: `Unable to update assignment ${assignmentId}` });
      return;
    }
    res.json(updated);
  };
  const deleteAssignment = async (req, res) => {
    const status = await dao.deleteAssignment(req.params.assignmentId);
    res.send(status);
  };
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
