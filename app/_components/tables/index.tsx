import {
  TableCaption,
  Table as ShadCnTable,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

function Table({
  caption,
  rows,
  columns,
}: {
  caption: string;
  rows: any[] | undefined;
  columns: {
    className?: string;
    header: string;
    value: string | number | JSX.Element | JSX.Element[];
    cell?: (row: any) => JSX.Element | JSX.Element[];
  }[];
}) {
  return (
    <ShadCnTable>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.header} className={column.className}>
              {column.value}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows?.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column) => {
              if (column.cell) {
                return (
                  <TableCell key={column.header} className={column.className}>
                    {column.cell(row)}
                  </TableCell>
                );
              }
              return (
                <TableCell key={column.header} className={column.className}>
                  {row[column.header]}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </ShadCnTable>
  );
}

export default Table;
