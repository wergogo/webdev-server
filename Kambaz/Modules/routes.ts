import ModulesDao from "./dao";
export default function ModuleRoutes(app) {
  const dao = ModulesDao();
  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
  };
  const createModuleForCourse = async (req, res) => {
    const { courseId } = req.params;
    const created = await dao.createModule({
      ...req.body,
      course: courseId,
    });
    res.json(created);
  };
  const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.moduleId);
    res.send(status);
  };
  const updateModule = async (req, res) => {
    const { moduleId } = req.params;
    await dao.updateModule(moduleId, req.body);
    const module = await dao.findModuleById(moduleId);
    if (!module) {
      res.status(404).json({ message: `Unable to update module ${moduleId}` });
      return;
    }
    res.json(module);
  };
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}
