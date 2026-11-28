import { v4 as uuidv4 } from "uuid";
import model from "./model";
export default function ModulesDao() {
  function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
  }
  function findModuleById(moduleId) {
    return model.findById(moduleId);
  }
  function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    return model.create(newModule);
  }
  function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
  }
  function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, { $set: moduleUpdates });
  }
  return {
    findModulesForCourse,
    findModuleById,
    createModule,
    deleteModule,
    updateModule,
  };
}
