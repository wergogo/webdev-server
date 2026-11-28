import CoursesDao from "./dao";
import EnrollmentsDao from "../Enrollments/dao";
import UsersDao from "../Users/dao";
export default function CourseRoutes(app) {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();
  const usersDao = UsersDao();
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  };
  const findCourseById = async (req, res) => {
    const course = await dao.findCourseById(req.params.courseId);
    if (!course) {
      res.status(404).json({ message: `Unable to find course ${req.params.courseId}` });
      return;
    }
    res.json(course);
  };
  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await enrollmentsDao.findCoursesForUser(userId);
    res.json(courses);
  };
  const createCourse = async (req, res) => {
    const newCourse = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    }
    res.json(newCourse);
  };
  const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  };
  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    await dao.updateCourse(courseId, courseUpdates);
    const course = await dao.findCourseById(courseId);
    if (!course) {
      res.status(404).json({ message: `Unable to update course ${courseId}` });
      return;
    }
    res.json(course);
  };
  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };
  const createUserForCourse = async (req, res) => {
    const { cid } = req.params;
    const newUser = await usersDao.createUser(req.body);
    await enrollmentsDao.enrollUserInCourse(newUser._id, cid);
    res.json(newUser);
  };
  app.get("/api/courses", findAllCourses);
  app.post("/api/courses", createCourse);
  app.post("/api/users/current/courses", createCourse);
  app.get("/api/courses/:courseId", findCourseById);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.get("/api/courses/:cid/users", findUsersForCourse);
  app.post("/api/courses/:cid/users", createUserForCourse);
}
