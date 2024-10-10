import React, { ReactNode } from 'react';
import type { CustomTableCell, HeaderProps, TableQueryStateProps } from '../../Table/types';
import { Theme, SxProps } from '@mui/material';
import { TableRootProps } from '../../Table/TableRoot';
import { TableProps } from '../../Table/Table';
import { Search } from '../../Table/types';
import { UpdateSearch } from '../../Table/useTable';
type Action = 'creation' | 'edit' | 'details' | null;
type BasicType = string | number | boolean;
type SimpleFilter = Record<string, BasicType | BasicType[] | null>;
type ActionCallbackPayload = {
    action: Action;
    row: Record<string, unknown>;
    index?: number;
};
export type PaginationStyle = 'default' | 'numeric';
export type StyleDefinition = {
    root?: SxProps<Theme>;
    table?: SxProps<Theme>;
    tableContainer?: SxProps<Theme>;
    tableHeader?: SxProps<Theme>;
    tableHeaderRow?: SxProps<Theme>;
    tableHeaderCell?: SxProps<Theme>;
    tableBodyRow?: SxProps<Theme>;
    tableBodyCell?: SxProps<Theme>;
    [key: string]: SxProps<Theme>;
};
export type TableSchemaItem = HeaderProps & {
    format?: (data: unknown) => string | number | React.ReactNode;
    renderTableCell?: (data: unknown, rowData: unknown) => CustomTableCell;
};
export interface TableSubmoduleProps {
    tableRootProps?: TableRootProps;
    tableProps?: TableProps;
    tableTheme?: StyleDefinition;
    queryResource: string;
    tableSchema: TableSchemaItem[];
    onAction?: ({ action, row, index }: ActionCallbackPayload) => void;
    onAddNew?: () => void;
    refresh: () => void;
    data: unknown[];
    isPending: boolean;
    total: number;
    pageCount: number;
    simpleFilter: SimpleFilter;
    updateSimpleFilter: (simpleFilter: SimpleFilter | null, resetPage?: boolean) => void;
    tableQueryState: TableQueryStateProps;
    setTableQueryState: React.Dispatch<React.SetStateAction<TableQueryStateProps>>;
    hideActionsColumn?: boolean;
    hideEditButton?: boolean;
    hideDeleteButton?: boolean;
    hideDetailsButton?: boolean;
    hasAllOption?: boolean;
    hideAddButton?: boolean;
    reordable?: boolean;
    onDeleteSuccess?: (data: unknown) => void;
    onDeleteError?: (error: unknown) => void;
    filterCallback?: (filter: unknown) => void;
    externalSearch?: Search;
    search?: Search;
    updateSearch?: UpdateSearch;
    paginationStyle?: PaginationStyle;
    allowModalPreview?: boolean;
    mobileModalTitleSrc?: string;
    filterCacheKey?: string;
    tableCacheKey?: string;
    cacheApiPath?: string;
    hasCheckboxes?: boolean;
    addButtonStartIcon?: ReactNode;
    addButtonEndIcon?: ReactNode;
    addButtonContent?: ReactNode;
    additionalFilterRowContent?: ReactNode;
}
declare const TableSubmodule: (props: TableSubmoduleProps) => JSX.Element;
export default TableSubmodule;