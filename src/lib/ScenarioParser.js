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
      current: scenario.current,
      editable: scenario.editable,
      deletable: scenario.deletable,
      projects: projectsInScenario.map((project) => {
        const projectAssignments = scenarioAssignments.filter((a) => a.projectId === project.id);

        let staffedPeople = projectAssignments
          .map((assignment) => {
            let person = people.find((p) => assignment.personId === p.id);

            return {
              ...person,
              assignment: { ...assignment },
              deletable:
                !!person &&
                person.deletable &&
                assignments.filter((a) => a.personId === assignment.personId).length === 1,
            };
          })
          .filter((stf) => !!stf.id);

        fillDepartmentNeed(project, staffedPeople, project.engineeringSeats, ENGINEER_ROLE);
        fillDepartmentNeed(project, staffedPeople, project.designSeats, DESIGN_ROLE);
        fillDepartmentNeed(project, staffedPeople, project.engagementSeats, ENGAGEMENT_ROLE);

        return {
          ...project,
          startDate: getProjectStart(project.startDate, projectAssignments),
          endDate: getProjectEnd(project.endDate, projectAssignments),
          deletable: project.deletable && project.scenarios.length === 1,
          people: defaultPeopleSort(staffedPeople),
        };
      }),
    };
  });
};

// pick the earliert start
const getProjectStart = (startDate, assignments) => {
  const calculatedStart = new Date(Math.min(...assignments.map((p) => p.startDate)));
  if (!isNaN(calculatedStart) && !isNaN(startDate)) {
    return startDate.getTime() < calculatedStart.getTime() ? startDate : calculatedStart;
  } else if (isNaN(calculatedStart)) {
    return startDate;
  } else {
    return calculatedStart;
  }
};

// pick the latest end
const getProjectEnd = (endDate, assignments) => {
  const calculatedEnd = new Date(Math.max(...assignments.map((p) => p.endDate)));
  if (!isNaN(calculatedEnd) && !isNaN(endDate)) {
    return endDate.getTime() > calculatedEnd.getTime() ? endDate : calculatedEnd;
  } else if (isNaN(calculatedEnd)) {
    return endDate;
  } else {
    return calculatedEnd;
  }
};

const fillDepartmentNeed = (project, staffedPeople, projectDepartmentSeats, role) => {
  let staffedDepartmentCount = staffedPeople.filter((p) => isRole(p, role)).length;
  let departmentNeed = projectDepartmentSeats - staffedDepartmentCount;

  if (departmentNeed > 0) {
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
