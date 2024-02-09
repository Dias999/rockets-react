import React, { PropsWithChildren } from 'react';

import type { RJSFSchema, UiSchema, CustomValidator } from '@rjsf/utils';

import type { HeaderProps } from '../../components/Table/types';

import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';

import useTable from '../../components/Table/useTable';
import { TableProps as InnerTableProps } from '../../components/Table/Table';
import Text from '../../components/Text';
import TableSubmodule, {
  StyleDefinition,
} from '../../components/submodules/Table';
import DrawerFormSubmodule from '../../components/submodules/DrawerForm';
import ModalFormSubmodule from '../../components/submodules/ModalForm';

type Action = 'creation' | 'edit' | 'details' | null;

type SelectedRow = Record<string, unknown> | null;

type TableSchemaItem = HeaderProps & {
  format?: (data: unknown) => string | number;
};

interface TableProps {
  tableSchema: TableSchemaItem[];
  tableProps?: InnerTableProps;
  tableTheme?: StyleDefinition;
  searchParam?: string;
  hideActionsColumn?: boolean;
}

interface FormProps {
  formSchema?: RJSFSchema;
  formUiSchema?: UiSchema;
  submitButtonTitle?: string;
  cancelButtonTitle?: string;
  customValidate?: CustomValidator;
}

export interface ModuleProps {
  title?: string;
  resource: string;
  tableProps: TableProps;
  formContainerVariation?: 'drawer' | 'modal';
  detailsFormProps?: PropsWithChildren<FormProps>;
  createFormProps?: PropsWithChildren<FormProps>;
  editFormProps?: PropsWithChildren<FormProps>;
  hideDeleteButton?: boolean;
}

const CrudModule = (props: ModuleProps) => {
  const [drawerViewMode, setDrawerViewMode] = useState<Action>(null);
  const [selectedRow, setSelectedRow] = useState<SelectedRow>(null);

  const tableProps = useTable(props.resource, {
    callbacks: {
      onError: () => toast.error('Failed to fetch data.'),
    },
  });

  const FormComponent = useMemo(() => {
    switch (props.formContainerVariation) {
      case 'drawer':
        return DrawerFormSubmodule;
      case 'modal':
        return ModalFormSubmodule;
      default:
        return DrawerFormSubmodule;
    }
  }, [props.formContainerVariation]);

  const formProps = useMemo(() => {
    switch (drawerViewMode) {
      case 'creation':
        return props.createFormProps;
      case 'edit':
        return props.editFormProps;
      case 'details':
        return props.detailsFormProps;
      default:
        return props.createFormProps;
    }
  }, [
    drawerViewMode,
    props.createFormProps,
    props.detailsFormProps,
    props.editFormProps,
  ]);

  return (
    <Box>
      {props.title ? (
        <Text fontFamily="Inter" fontSize={20} fontWeight={800} mt={4} mb={4}>
          {props.title}
        </Text>
      ) : null}

      <TableSubmodule
        queryResource={props.resource}
        onAction={(payload) => {
          setSelectedRow(payload.row);
          setDrawerViewMode(payload.action);
        }}
        onAddNew={() => {
          setSelectedRow(null);
          setDrawerViewMode('creation');
        }}
        hideAddButton={!props.createFormProps}
        hideEditButton={!props.editFormProps}
        hideDeleteButton={props.hideDeleteButton}
        hideDetailsButton={!props.detailsFormProps}
        {...tableProps}
        {...props.tableProps}
      />

      {formProps && (
        <FormComponent
          title={props.title}
          queryResource={props.resource}
          viewMode={drawerViewMode}
          formData={selectedRow}
          onSubmitSuccess={() => {
            tableProps.refresh();
            setSelectedRow(null);
            setDrawerViewMode(null);
          }}
          onClose={() => {
            setSelectedRow(null);
            setDrawerViewMode(null);
          }}
          {...formProps}
        >
          {formProps.children}
        </FormComponent>
      )}
    </Box>
  );
};

export default CrudModule;
