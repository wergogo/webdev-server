import AssignmentsDao from "./dao";
export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);
  const findAssignmentsForCourse = (req, res) => {
    res.json(dao.findAssignmentsForCourse(req.params.courseId));
  };
  const createAssignmentForCourse = (req, res) => {
    const created = dao.createAssignment({
      ...req.body,
      course: req.params.courseId,
    });
    res.json(created);
  };
  const updateAssignment = (req, res) => {
    const updated = dao.updateAssignment(req.params.assignmentId, req.body);
    if (!updated) {
      res.status(404).json({ message: `Unable to update assignment ${req.params.assignmentId}` });
      return;
    }
    res.json(updated);
  };
  const deleteAssignment = (req, res) => {
    dao.deleteAssignment(req.params.assignmentId);
    res.sendStatus(200);
  };
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
