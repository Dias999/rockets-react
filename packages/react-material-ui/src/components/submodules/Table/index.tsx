import React from 'react';

import type {
  HeaderProps,
  RowProps,
  TableQueryStateProps,
} from '../../Table/types';

import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import { toast } from 'react-toastify';

import Filter from '../../../components/Filter';
import { FilterType } from '../../../components/Filter/Filter';
import Table from '../../../components/Table';
import { generateTableTheme } from './constants';

type Action = 'creation' | 'edit' | 'details' | null;

type BasicType = string | number | boolean;

type SimpleFilter = Record<string, BasicType | BasicType[] | null>;

type ActionCallbackPayload = {
  action: Action;
  row: Record<string, unknown>;
};

type TableSchemaItem = HeaderProps & {
  format?: (data: unknown) => string | number;
};

interface TableSubmoduleProps {
  queryResource: string;
  tableSchema: TableSchemaItem[];
  onAction?: ({ action, row }: ActionCallbackPayload) => void;
  onAddNew?: () => void;
  refresh: () => void;
  data: unknown[];
  isPending: boolean;
  total: number;
  pageCount: number;
  simpleFilter: SimpleFilter;
  updateSimpleFilter: (
    simpleFilter: SimpleFilter | null,
    resetPage?: boolean,
  ) => void;
  tableQueryState: TableQueryStateProps;
  setTableQueryState: React.Dispatch<
    React.SetStateAction<TableQueryStateProps>
  >;
  searchParam?: string;
  hideActionsColumn?: boolean;
  hideForm?: boolean;
}

const TableSubmodule = (props: TableSubmoduleProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const theme = useTheme();

  const { del } = useDataProvider();

  const { execute: deleteItem } = useQuery(
    (id: string | number) =>
      del({
        uri: `/${props.queryResource}/${id}`,
      }),
    false,
    {
      onSuccess: () => {
        toast.success('Data successfully deleted.');

        if (props.refresh) {
          props.refresh();
        }
      },
      onError: () => toast.error('Failed to delete data.'),
    },
  );

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);

    if (!props.updateSimpleFilter || !props.searchParam) {
      return;
    }

    if (!term) {
      props.updateSimpleFilter(
        {
          [props.searchParam]: null,
        },
        true,
      );

      return;
    }

    const filter = {
      [props.searchParam]: `||$contL||${term}`,
    };

    props.updateSimpleFilter(filter, true);
  };

  const tableTheme = generateTableTheme(theme);

  const tableHeaders: TableSchemaItem[] = useMemo(() => {
    return [
      ...props.tableSchema,
      {
        id: !props.hideActionsColumn && !props.hideForm ? 'actions' : '',
        label: '',
      },
    ];
  }, [props]);

  const tableRows: RowProps[] = useMemo(() => {
    const data = props.data || [];

    return data.map((row) => {
      const rowData = row as Record<string, unknown>;
      const newData = { ...rowData };

      Object.entries(rowData).forEach(([key, data]) => {
        const schemaItem = tableHeaders.find((item) => item.id === key);

        if (!schemaItem) {
          return;
        }

        if (schemaItem.format) {
          newData[key] = schemaItem.format(data);
        }
      });

      return {
        ...newData,
        id: String(rowData.id),
        actions: {
          component: (
            <Box>
              <IconButton
                onClick={() => {
                  if (props.onAction) {
                    props.onAction({ action: 'edit', row: rowData });
                  }
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteItem(rowData.id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  if (props.onAction) {
                    props.onAction({ action: 'details', row: rowData });
                  }
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          ),
        },
      };
    });
  }, [props, tableHeaders, deleteItem]);

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box sx={{ width: '60%' }}>
          <Filter
            filters={[
              {
                type: FilterType.Text,
                defaultValue: searchTerm,
                placeholder: 'Search',
                onChange: handleSearchChange,
              },
            ]}
          />
        </Box>
        {!props.hideForm && (
          <Button variant="contained" onClick={props.onAddNew}>
            Add new
          </Button>
        )}
      </Box>

      <Table.Root
        rows={tableRows}
        headers={tableHeaders}
        sx={tableTheme.root}
        {...props}
        updateTableQueryState={props.setTableQueryState}
      >
        <TableContainer sx={tableTheme.tableContainer}>
          <Table.Table stickyHeader variant="outlined" sx={tableTheme.table}>
            <TableHead>
              <TableRow sx={tableTheme.tableRow}>
                <Table.HeaderCells />
              </TableRow>
            </TableHead>
            <TableBody>
              {Boolean(searchTerm && !props.data?.length) && (
                <TableRow>
                  <TableCell
                    colSpan={tableHeaders.length}
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    No records found.
                  </TableCell>
                </TableRow>
              )}
              <Table.BodyRows isLoading={props.isPending || false} />
            </TableBody>
          </Table.Table>
        </TableContainer>
        <Table.Pagination variant="outlined" />
      </Table.Root>
    </Box>
  );
};

export default TableSubmodule;
