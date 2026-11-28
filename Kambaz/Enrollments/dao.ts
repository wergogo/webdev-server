import model from "./model";
import "../Courses/model";
import "../Users/model";
export default function EnrollmentsDao() {
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments
      .map((enrollment) => enrollment.course)
      .filter((course) => course);
  }
  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments
      .map((enrollment) => enrollment.user)
      .filter((user) => user);
  }
  function findEnrollmentsForUser(userId) {
    return model.find({ user: userId });
  }
  async function enrollUserInCourse(userId, courseId) {
    const existing = await model.findOne({ user: userId, course: courseId });
    if (existing) return existing;
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }
  function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }
  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }
  return {
    findCoursesForUser,
    findUsersForCourse,
    findEnrollmentsForUser,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}
