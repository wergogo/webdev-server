import EnrollmentsDao from "./dao";
export default function EnrollmentRoutes(app) {
  const dao = EnrollmentsDao();
  const resolveUserId = (req, res) => {
    const { userId } = req.params;
    if (userId !== "current") return userId;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return null;
    }
    return currentUser._id;
  };
  const findEnrollmentsForUser = async (req, res) => {
    const userId = resolveUserId(req, res);
    if (!userId) return;
    const enrollments = await dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };
  const enrollUserInCourse = async (req, res) => {
    const userId = resolveUserId(req, res);
    if (!userId) return;
    const status = await dao.enrollUserInCourse(userId, req.params.courseId);
    res.send(status);
  };
  const unenrollUserFromCourse = async (req, res) => {
    const userId = resolveUserId(req, res);
    if (!userId) return;
    const status = await dao.unenrollUserFromCourse(userId, req.params.courseId);
    res.send(status);
  };
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
}
