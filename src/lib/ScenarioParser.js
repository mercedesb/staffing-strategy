import { defaultPeopleSort, isRole, ENGINEER_ROLE, DESIGN_ROLE, ENGAGEMENT_ROLE } from "lib";

const ScenarioParser = (scenarios, assignments, people, projects) => {
  return scenarios.map((scenario) => {
    const scenarioAssignments = assignments.filter((a) => (!!a.scenarios ? a.scenarios.includes(scenario.id) : true));
    let projectsInScenario = [
      ...new Set([
        ...scenarioAssignments.map((a) => projects.find((p) => p.id === a.projectId)),
        ...projects.filter((p) => (!!p.scenarios ? p.scenarios.includes(scenario.id) : false)),
      ]),
    ].filter((p) => !!p);
    return {
      id: scenario.id,
      title: scenario.name,
      projects: projectsInScenario.map((project) => {
        const projectAssignments = scenarioAssignments.filter((a) => a.projectId === project.id);

        const projectStart = new Date(Math.min(...projectAssignments.map((p) => p.startDate)));
        const projectEnd = new Date(Math.max(...projectAssignments.map((p) => p.endDate)));

        let staffedPeople = projectAssignments
          .map((a) => {
            let person = people.find((p) => a.personId === p.id);
            return {
              ...person,
              assignment: { ...a },
            };
          })
          .filter((stf) => !!stf.id);

        fillDepartmentNeed(project, staffedPeople, project.engineeringSeats, ENGINEER_ROLE);
        fillDepartmentNeed(project, staffedPeople, project.designSeats, DESIGN_ROLE);
        fillDepartmentNeed(project, staffedPeople, project.engagementSeats, ENGAGEMENT_ROLE);

        return {
          id: project.id,
          name: project.name,
          startDate: projectStart,
          endDate: projectEnd,
          people: defaultPeopleSort(staffedPeople),
        };
      }),
    };
  });
};

const fillDepartmentNeed = (project, staffedPeople, projectDepartmentSeats, role) => {
  let staffedDepartmentCount = staffedPeople.filter((p) => isRole(p, role)).length;
  let departmentNeed = projectDepartmentSeats || staffedDepartmentCount;

  if (departmentNeed > staffedDepartmentCount) {
    for (let i = 0; i < departmentNeed; i++) {
      staffedPeople.push({
        id: `Staffing Need ${i + 1}-${role}-${project.id}`,
        firstName: `Staffing Need - ${role}`,
        roles: [role],
        assignment: {
          startDate: project.startDate,
          endDate: project.endDate,
        },
      });
    }
  }
};

export default ScenarioParser;
