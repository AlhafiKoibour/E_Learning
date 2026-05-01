import "./TasksTable.css";

const tasks = [
  { name: "Lueilwitz LLC", start: "2/2/2023", end: "3/24/2023", state: "IN PROGRESS", assignee: "Courtney Goymer" },
  { name: "Lang, Little and Barton", start: "5/25/2022", end: "11/20/2023", state: "IN PROGRESS", assignee: "Kirby Castillo" },
  { name: "Haag-Albott", start: "7/16/2022", end: "6/21/2023", state: "IN PROGRESS", assignee: "Curr Tetley" },
  { name: "Bogisich Inc.", start: "5/14/2023", end: "2/4/2023", state: "CANCELLED", assignee: "Jilli Lunt" },
  { name: "Hahn-Littel", start: "11/21/2022", end: "11/21/2022", state: "COMPLETED", assignee: "Lillie Lilley" },
  { name: "Gibson and Sons", start: "7/6/2023", end: "6/11/2023", state: "CANCELLED", assignee: "Farlie Rouchy" },
];

export default function TasksTable() {
  return (
    <section className="card tasksCard">
      <div className="card__header tasksCard__header">
        <h3>Tasks</h3>
        <a href="#" className="tasksCard__viewAll">View all</a>
      </div>

      <table className="tasksCard__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start date</th>
            <th>End date</th>
            <th>State</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.name}>
              <td>{task.name}</td>
              <td>{task.start}</td>
              <td>{task.end}</td>
              <td>
                <span className={`badge ${task.state.toLowerCase().replace(" ", "-")}`}>
                  {task.state}
                </span>
              </td>
              <td>{task.assignee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}