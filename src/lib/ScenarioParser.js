const ScenarioParser = (scenarios, assignments, people, projects, deals) => {
  let projectIds = [...new Set(assignments.map((a) => a.projectId))];
  let parsedProjects = projectIds.map((id) => projects.find((p) => p.id === id)).filter((p) => !!p);
  let parsedDeals = projectIds.map((id) => deals.find((d) => d.id === id)).filter((d) => !!d);
  return scenarios.map((scenario) => {
    let staffedDeals = parsedDeals.filter((p) =>
      assignments.find((a) => a.scenarioId === scenario.id && a.projectId === p.id)
    );
    let staffedProjects = [...parsedProjects, ...staffedDeals];

    return {
      id: scenario.id,
      title: scenario.name,
      projects: staffedProjects.map((project) => {
        const projectAssignments = assignments.filter((a) => {
          let bool = a.projectId === project.id;
          if (!!a.scenarioId) {
            bool = bool && a.scenarioId === scenario.id;
          }
          return bool;
        });

        const projectStart = new Date(Math.min(...projectAssignments.map((p) => p.startDate)));
        const projectEnd = new Date(Math.max(...projectAssignments.map((p) => p.endDate)));

        const staffedPeople = projectAssignments.map((a) => {
          let person = people.find((p) => a.personId === p.id);
          return {
            ...person,
            assignment: { ...a },
          };
        });

        return {
          id: project.id,
          name: project.name,
          startDate: projectStart,
          endDate: projectEnd,
          people: staffedPeople,
        };
      }),
    };
  });
};

export default ScenarioParser;
