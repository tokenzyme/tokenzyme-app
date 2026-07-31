import { DataTable, DataTableBaseProps } from 'primereact/datatable';
import { Tooltip } from 'primereact/tooltip';
import { JSX, ReactNode } from 'react';

interface TableProps extends Omit<
  DataTableBaseProps<object[]>,
  'currentPageReportTemplate' | 'paginator' | 'paginatorTemplate' | 'totalRecords'
> {
  id: string;
  showPaginator?: boolean;
  children: ReactNode;
}

export function Table({ id, value, rows, showPaginator = false, children, ...props }: TableProps): JSX.Element {
  return (
    <>
      <DataTable
        id={id}
        value={value}
        rows={rows ?? 10}
        totalRecords={value?.length}
        paginator={showPaginator}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
        currentPageReportTemplate="Total: {totalRecords}"
        {...props}
      >
        {children}
      </DataTable>
      <Tooltip target={`#${id} .tooltip`} />
    </>
  );
}
