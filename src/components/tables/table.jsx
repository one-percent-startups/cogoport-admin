import React, { useState } from 'react';
import ArrowLongLeftIcon from '@heroicons/react/20/solid/ArrowLongLeftIcon';
import ArrowLongRightIcon from '@heroicons/react/20/solid/ArrowLongRightIcon';
import MagnifyingGlassIcon from '@heroicons/react/20/solid/MagnifyingGlassIcon';
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from 'react-table';
import { PageButton } from './paginationButtons';
import { SortIcon, SortUpIcon, SortDownIcon } from '../../assets/icons/sorting';
import Input from '../input';
import { useAsyncDebounce } from '../../hooks/use_debounce';

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">{render('Header')}: </span>
      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onFilterChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="flex gap-x-2 items-baseline">
      {/* <span className="text-gray-700">Search: </span> */}
      <div className="relative mt-1 rounded-md shadow-sm">
        <Input
          type="text"
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value);
            onFilterChange(e.target.value);
          }}
          placeholder={`${count} records...`}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
    </label>
  );
}

function Table({ columns, data }) {
  const {
    state,
    pageOptions,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    // gotoPage,
    // nextPage,
    // previousPage,
    preGlobalFilteredRows,
    setGlobalFilter,
    setPageSize,
    setAllFilters,
  } = useTable(
    {
      columns,
      data,
      // initialState: { pageIndex: 1 },
    },
    // useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    // usePagination // new
    // useRowSelect,
    // useRowSelectColumn
  );

  let states = data;
  let outputArray = [];
  let count = 0;
  let start = false;
  for (const element of states) {
    for (let k = 0; k < outputArray.length; k++) {
      if (element.state === outputArray[k]) {
        start = true;
      }
    }
    count++;
    if (count == 1 && start == false) {
      outputArray.push(element.state);
    }
    start = false;
    count = 0;
  }
  const Statefiltered = outputArray.filter(function (el) {
    return el != null;
  });

  // const ClearFilter = () => {
  //   setGlobalFilter([])
  //   setSelectedState(null)
  // }

  // const [selectedState, setSelectedState] = useState(null)
  const [currentPage, setCurrentPage] = useState(0);

  // const onFilteredChangeCustom = () => {}

  // const onCountryFilterSelected = (value) => {
  //   setGlobalFilter(value.value || undefined)
  //   setSelectedState(value)
  //   onFilteredChangeCustom()
  // }

  const pageArray = pageOptions;

  // Render the UI for your table

  return (
    <div className="text-left">
      {/* SEARCH UI */}

      <div className="sm:flex sm:gap-x-2">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div className="mt-2 sm:mt-0" key={column.id}>
                {column.render('Filter')}
              </div>
            ) : null
          )
        )}
      </div>
      {/* TABLE UI */}
      <div className="flex flex-col mt-4">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full ">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                          scope="col"
                          className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          <div className="flex items-center justify-between">
                            {column.render('Header')}
                            {column.id === 'selection' &&
                              column.render('Summary')}
                            {/* Add a sort direction indicator */}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <SortDownIcon className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <SortUpIcon className="w-4 h-4 text-gray-400" />
                                )
                              ) : (
                                <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {rows.map((row, i) => {
                    // new
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4"
                              role="cell"
                            >
                              {cell.column.Cell.name === 'defaultRenderer' ? (
                                <div className="text-sm text-gray-500">
                                  {cell.render('Cell')}
                                </div>
                              ) : (
                                cell.render('Cell')
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Table;
