import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function findEnrollmentsForUser(userId) {
    return db.enrollments.filter((enrollment) => enrollment.user === userId);
  }
  function findEnrollmentsForCourse(courseId) {
    return db.enrollments.filter((enrollment) => enrollment.course === courseId);
  }
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    const existing = enrollments.find(
      (enrollment) => enrollment.user === userId && enrollment.course === courseId,
    );
    if (existing) return existing;
    const enrollment = { _id: uuidv4(), user: userId, course: courseId };
    enrollments.push(enrollment);
    return enrollment;
  }
  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (enrollment) => !(enrollment.user === userId && enrollment.course === courseId),
    );
  }
  return {
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
  };
}
