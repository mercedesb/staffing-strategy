import { defaultPeopleSort } from "lib";

const ScenarioParser = (scenarios, assignments, people, projects) => {
  return scenarios.map((scenario) => {
    const scenarioAssignments = assignments.filter((a) => (!!a.scenarios ? a.scenarios.includes(scenario.id) : true));
    let projectsInScenario = [
      ...new Set(scenarioAssignments.map((a) => projects.find((p) => p.id === a.projectId))),
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
          .filter((stf) => !!stf.id); // TODO: render staffing need here

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

export default ScenarioParser;
