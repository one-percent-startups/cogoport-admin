import Button from '../button';

export const student_list_score = [
  {
    Header: 'Name',
    accessor: 'name',
    Cell: (cell) => {
      return (
        <a
          href={`/student/${cell.row.original.id}`}
          className="hover:text-gray-400"
        >
          {cell.row.original.name}
        </a>
      );
    },
  },
  {
    Header: 'Track',
    accessor: 'stream',
  },
  {
    Header: 'Exercises',
    accessor: 'exercise',
    Cell: (cell) => `${cell.row.original.exercise}%`,
  },
  {
    Header: 'Problem sets / Projects',
    accessor: 'problem_set',
    Cell: (cell) => `${cell.row.original.problem_set}%`,
  },
  // {
  //   Header: 'Projects',
  //   accessor: 'project',
  //   Cell: (cell) => `${cell.row.original.project}%`,
  // },
];

export const student_dashboard = ({ onClickReport }) => [
  {
    Header: 'Title',
    accessor: 'courseContent.title',
  },
  {
    Header: 'Course',
    accessor: 'courseContent.course.name',
  },
  {
    Header: 'Scored',
    accessor: 'scored',
    Cell: (cell) => {
      return `${cell.row.original.pointsEarned}/${cell.row.original.courseContent.points}`;
    },
  },
  {
    Header: 'Action',
    accessor: 'action',
    Cell: (cell) => {
      if (
        ['EXERCISE', 'PROBLEM_SET', 'PROJECT'].includes(
          cell.row.original.courseContent.type
        )
      )
        return (
          <button
            onClick={() => onClickReport(cell.row.original)}
            className="bg-gray-100 text-black w-full p-1 text-sm rounded-lg hover:bg-gray-200"
          >
            Report
          </button>
        );
    },
  },
];
